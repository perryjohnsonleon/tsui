  const $ = id => document.getElementById(id);
  const qtyField = $('qtyField');
  const qtyInput = $('qty');
  const unitLotBtn = $('unitLot');
  const unitShareBtn = $('unitShare');
  let unitMode = 'lot' , tick , isETF ; // 'lot' | 'share' 
  const dirLongBtn = $('dirLong');
  const dirShortBtn = $('dirShort');
  const anchorLabel = $('anchorField').querySelector('label');
  let tradeDirection = 'long'; // 'long' | 'short'
 window.addEventListener('load',function(){
	const url=window.location.search;
	// stockId = url.substring(url.indexOf('=') + 1);
	const stockId = url.substring(9); 
	// isETF = stockId.at(-1) === 'A' ? true : false ;
	if (stockId.slice(0,2) === '00') {isETF = true} else {isETF = false} ;  
	startShow(stockId);
  }); 

 function getTick(price) {
    if (price < 5) {
        return 0.01;
    } else if (price < 15) {
        return 0.05;
    } else if (price < 50) {
        return 0.10;
    } else if (price < 150) {
        return 0.50;
    } else if (price < 1000) {
        return 1;
    } else {
        return 5;
    }
}


  function updateDirectionUI(){
    if (tradeDirection === 'long') {
      anchorLabel.innerHTML = '買進價（進場） <span class="hint">BUY</span>';
      $('tableSubhint').textContent = '做多：以買進價（進場）為基準，依「價格間距」上下展開各賣出價（出場）的損益試算。';
    } else {
      anchorLabel.innerHTML = '賣出價（放空） <span class="hint">SHORT</span>';
      $('tableSubhint').textContent = '做空：以賣出價（放空）為基準，依「價格間距」上下展開各買進價（回補出場）的損益試算。';
    }
  }

  dirLongBtn.addEventListener('click', () => {
    tradeDirection = 'long';
    dirLongBtn.classList.add('active');
    dirShortBtn.classList.remove('active');
    updateDirectionUI();
    calculate();
  });
  dirShortBtn.addEventListener('click', () => {
    tradeDirection = 'short';
    dirShortBtn.classList.add('active');
    dirLongBtn.classList.remove('active');
    updateDirectionUI();
    calculate();
  });

  unitLotBtn.addEventListener('click', () => {
    unitMode = 'lot';
    unitLotBtn.classList.add('active');
    unitShareBtn.classList.remove('active');
    qtyField.querySelector('label').innerHTML = '張數 <span class="hint">LOTS</span>';
    qtyInput.value = 1;
    calculate();
  });
  unitShareBtn.addEventListener('click', () => {
    unitMode = 'share';
    unitShareBtn.classList.add('active');
    unitLotBtn.classList.remove('active');
    qtyField.querySelector('label').innerHTML = '股數 <span class="hint">SHARES</span>';
    qtyInput.value = 1000;
    calculate();
  });

  document.querySelectorAll('.taxPreset').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.taxPreset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      $('taxRate').value = btn.dataset.rate;
      calculate();
    });
  });

  const fmt = n => {
    const sign = n < 0 ? '-' : '';
    return sign + Math.round(Math.abs(n)).toLocaleString('en-US');
  };
  const fmtSigned = n => {
    const sign = n > 0 ? '+' : (n < 0 ? '-' : '');
    return sign + Math.round(Math.abs(n)).toLocaleString('en-US');
  };
  const fmtPrice = n => {
    // trim trailing zeros but keep up to 2 decimals
    return (Math.round(n * 100) / 100).toString();
  };
  const fmtPct = n => (n > 0 ? '+' : (n < 0 ? '-' : '')) + Math.abs(n).toFixed(2) + '%';

  const ROWS_INITIAL = 11; 
  const ROWS_INCREMENT = 5; 
  let rowsAbove = Math.floor(ROWS_INITIAL / 2);
  let rowsBelow = Math.floor(ROWS_INITIAL / 2);

  function computeRow(buyPrice, sellPrice, shares, feeRate, feeDiscount, feeMin, taxRate){
    const buyAmt = buyPrice * shares;
    const sellAmt = sellPrice * shares;
    const buyFee = buyAmt > 0 ? Math.max(buyAmt * feeRate * feeDiscount, feeMin) : 0;
    const sellFee = sellAmt > 0 ? Math.max(sellAmt * feeRate * feeDiscount, feeMin) : 0;
    const taxAmt = sellAmt * taxRate;
    const totalFee = buyFee + sellFee;
    const totalCost = buyAmt + buyFee;
    const totalRevenue = sellAmt - sellFee - taxAmt;
    const netProfit = totalRevenue - totalCost;
    const roi = totalCost > 0 ? (netProfit / totalCost) * 100 : 0;
    return {buyPrice, sellPrice, taxAmt, totalFee, netProfit, roi};
  }

  function calculate(){
    const qty = parseFloat(qtyInput.value) || 0;
    const shares = unitMode === 'lot' ? qty * 1000 : qty;
    const anchorPrice = parseFloat($('buyPrice').value) || 0;
    const step = parseFloat($('priceStep').value) || 0.05;
    const feeRate = (parseFloat($('feeRate').value) || 0) / 100;
    const feeDiscount = (parseFloat($('feeDiscount').value) || 10) / 10;
    const feeMin = parseFloat($('feeMin').value) || 0;
    const taxRate = (parseFloat($('taxRate').value) || 0) / 100;
    const tbody = $('cmpBody');
    tbody.innerHTML = '';

    // Build the varying leg from highest to lowest, anchor price always included as the breakeven row.
    // LONG:  anchor = buy (entry), varying = sell (exit)
    // SHORT: anchor = sell (short-sale entry, taxed here), varying = buy-to-cover (exit)
    for (let i = rowsAbove; i >= -rowsBelow; i--) {
      const varyingPrice = anchorPrice + i * step;
      if (varyingPrice < 0) continue;

      const buyPrice = tradeDirection === 'long' ? anchorPrice : varyingPrice;
      const sellPrice = tradeDirection === 'long' ? varyingPrice : anchorPrice;

      const row = computeRow(buyPrice, sellPrice, shares, feeRate, feeDiscount, feeMin, taxRate);

      const tr = document.createElement('tr');
      const isBreakevenRow = Math.abs(varyingPrice - anchorPrice) < 1e-9;
      if (isBreakevenRow) tr.classList.add('breakeven');

      const pClass = row.netProfit > 0.5 ? 'up' : (row.netProfit < -0.5 ? 'down' : 'flat');

      tr.innerHTML =
        '<td>' + fmtPrice(row.buyPrice) + '</td>' +
        '<td>' + fmtPrice(row.sellPrice) + '</td>' +
        '<td>' + fmt(row.taxAmt) + '</td>' +
        '<td>' + fmt(row.totalFee) + '</td>' +
        '<td class="' + pClass + '">' + fmtSigned(row.netProfit) + '</td>' +
        '<td class="' + pClass + '">' + fmtPct(row.roi) + '</td>';

      tbody.appendChild(tr);
    }
  }
  
	async function startShow(stockId) {
	 await initialRender(stockId);
	 await updateDirectionUI();
	 await calculate();
  }
  
    async function getData(stockId) {	  
	  try {
	  	let fetchUrl_str="" ;
		let fetchUrl_str1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:" , fetchUrl_str2=":STOCK&quote=1" ;
		fetchUrl_str=fetchUrl_str1 + stockId + fetchUrl_str2
		const response = await fetch(fetchUrl_str); 
	    if  (!response.ok) {
		   throw new Error(`HTTP error!!!! status: ${response.status}`);
		  }
	    else {
		  const result = await response.json();
		  return result; 
	    }
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
	  }
	 }

 async function initialRender(stockId) {
	  let itemName,incdecPrice,itemPrice,incdectxtPrice,highPrice,lowPrice,flatPrice,midPrice,tick;
	  const post = await getData(stockId);
	  if (post) {		  
			const wi_o=post.data.o;
			const wi_h=post.data.h;
			const wi_c=post.data.c;
			const wi_t=post.data.t;
			const wi_oo=[...wi_o].reverse();
			const wi_cc=[...wi_c].reverse();
			const wi_tt=[...wi_t].reverse();
			const quote_obj = post.data.quote ;
			for ( var n in quote_obj) {
			   if ( n == "200009" ) itemName=quote_obj[n] ;
			   if ( n == "11" ) incdecPrice=quote_obj[n] ;
			   if ( n == "12" ) highPrice=quote_obj[n] ;
			   if ( n == "13" ) lowPrice=quote_obj[n] ;
			   if ( n == "6" ) {
				    itemPrice=quote_obj[n] ;
			   }   
			}
			$('buyPrice').value=itemPrice ;
			if (isETF == false) { 
				if (itemPrice < 5) {
					tick=0.01;
				} else if (itemPrice < 15) {
					tick=0.05;
				} else if (itemPrice < 50) {
					tick=0.10;
				} else if (itemPrice < 150) {
					tick=0.50;
				} else if (itemPrice < 1000) {
					tick=1;
				} else {
					tick=5;
				}
			}	
			if (isETF == true) { 
				if (itemPrice < 50) {
					tick=0.01;
				} else 
					tick=0.05;
			}				
			$('priceStep').value=tick ;
		}
   }  

  $('moreTop').addEventListener('click', () => {
    rowsAbove += ROWS_INCREMENT;
    calculate();
  });
  $('moreBottom').addEventListener('click', () => {
    rowsBelow += ROWS_INCREMENT;
    calculate();
  });

  document.querySelectorAll('input[type=number]').forEach(inp => {
    inp.addEventListener('input', calculate);
  });

  // $('ticketTime').textContent = 'NO. ' + Date.now().toString().slice(-8);
  updateDirectionUI();
  calculate();
