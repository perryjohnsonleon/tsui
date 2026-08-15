 "use strict";
  /* ============ State ============ */
 const stockId_list=['8888','2353','2356','2357','2324','2330','2454','2308','2317','2303','2344','2408','6770','2337','3532','1102','00403A','00980A','00981A','00982A','00991A','00992A','0050'];	
// ── STATE ──────────────────────────────────────────────────────────────────
 const MAIN = { sym: '大盤指數', name: '2353', price: 27 };
 const MARKETS = [{ sym: '大盤指數',  name: 'NASDAQ 100', sub: 'US Index', price: 32722 }];
 const state = {
  main: { ...MAIN, open: MAIN.price, high: MAIN.price, low: MAIN.price, change: 0 , flat:0},
  markets: MARKETS.map(m => ({ ...m, change: 0, spark: [] })),
  history: [],
  };
  const stock = {
    symbol:"NXC",
    price: 184.32,
    open: 184.32,
    high: 184.32,
    low: 184.32,
    history: []
  };  
  const HISTORY_LEN = 90;
  for(let i=0;i<HISTORY_LEN;i++) stock.history.push(stock.price);

  const indices = [
    {name:"S&P 500", value:5487.21, base:5487.21},
    {name:"NASDAQ",  value:17862.44, base:17862.44},
    {name:"DOW JONES", value:39112.05, base:39112.05},
    {name:"VIX", value:14.22, base:14.22}
  ];

  const alertState = {
    direction: "rise",
    target: Math.round((stock.price*1.05)*100)/100,
    armed: false,      // has the user applied a target
    triggered: false   // fired already for this armed target
  };

 let chimeOn = true;
 let audioCtx = null;
 let running=false,sw_no=1,firstVisit = true ;     // original value:  true 
 let refSec = 3000 ; // original value:  0
 let stockId,STOCKID,id,count=0,btn2_expandId="";
 let width = 0 , intervalIds = [] , itemPrice_matrix=[] , itemPrice_arry = [] , itemYear_arry11 = [] , itemYear_arry12 = [] , itemYear_arry13 = [] , itemYear_arry21 = [] , itemYear_arry22 = [] , itemYear_arry23 = [] ;
 let show_YearRpt="" , show_SeasonRpt="" , show_MonthRpt="" , tr_line="" ; 
 let mymatrix,wi_o,wi_h,wi_c,wi_cc,wi_t,wi_tt,midline_txt,title_txt,item_price,mid_price=0,min_price=0,max_price=0,incdecPrice,point_no=0;

  /* ============ DOM refs ============ */
  const symName = document.getElementById('sym');  
  const priceValueEl = document.getElementById('priceValue');
  const priceChangeEl = document.getElementById('priceChange');
  const dayHighEl = document.getElementById('dayHigh');
  const dayLowEl = document.getElementById('dayLow');
  const dayOpenEl = document.getElementById('dayOpen');
  const canvas = document.getElementById('priceChart');
  const ctx = canvas.getContext('2d');

  const alertToggleBtn = document.getElementById('alertToggleBtn');
  const alertPanel = document.getElementById('alertPanel');
  const alertDirection = document.getElementById('alertDirection');
  const alertTarget = document.getElementById('alertTarget');
  const alertApply = document.getElementById('alertApply');
  const alertStatus = document.getElementById('alertStatus');
  const chimeBtn = document.getElementById('chimeBtn');

  const gaugeFill = document.getElementById('gaugeFill');
  const gaugeMarker = document.getElementById('gaugeMarker');
  const gaugeTargetLabel = document.getElementById('gaugeTargetLabel');
  const gaugeStart = document.getElementById('gaugeStart');
  const gaugeEnd = document.getElementById('gaugeEnd');

  const indexGrid = document.getElementById('indexGrid');

 window.addEventListener('load',function(){
	const url=window.location.search;
	// stockId = url.substring(url.indexOf('=') + 1);
	stockId = url.substring(9);
	startShow(stockId);
  }); 
    
  async function getData(stockId) {
	  if (firstVisit) {
		  firstVisit=false;
		  STOCKID=stockId
	  }	  
	  try {
	  	let fetchUrl_str="" ;
		let fetchUrl_str1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:" , fetchUrl_str2=":STOCK&quote=1" ;
		if (stockId == 9999) {
		    fetchUrl_str="https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN"
		} else if (stockId == 0) {
			fetchUrl_str="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:TSE01:INDEX&quote=1"
		} else {
			fetchUrl_str=fetchUrl_str1 + stockId + fetchUrl_str2
		}
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
	 
  async function graphcardRender(stockId) {
	  let itemName,incdecPrice,itemPrice,incdectxtPrice,highPrice,lowPrice,flatPrice,midPrice;
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
			const m = state.main;
			// const isGain = m.change >= 0;
			for ( var n in quote_obj) {
			   if ( n == "200009" ) itemName=quote_obj[n] ;
			   if ( n == "11" ) incdecPrice=quote_obj[n] ;
			   if ( n == "12" ) highPrice=quote_obj[n] ;
			   if ( n == "13" ) lowPrice=quote_obj[n] ;
			   if ( n == "6" ) itemPrice=quote_obj[n] ;
			}
		    if ( incdecPrice>0 ) 
				incdectxtPrice="+" + incdecPrice.toString()
		    else incdectxtPrice= incdecPrice ;
		    midPrice=itemPrice-incdecPrice;
		    m.sys=itemName;
		    m.price=itemPrice ;
		    m.open=wi_oo[0] ;
		    state.history=[...wi_c].reverse();
		    m.high=highPrice ;
		    m.low=lowPrice ;
		    m.change=incdecPrice ;
		    m.flat=midPrice;
		    symName.textContent = m.sys ;
			const change = m.change ;
			const changePct = (Math.abs(m.change) / m.open) * 100;
			const direction = m.price > m.flat ? 'up' : (m.price < m.flat ? 'down' : null);
			const overallDir = change >= 0 ? 'up' : 'down'; // up = gain = red, down = loss = green

			priceValueEl.textContent = m.price;
			priceValueEl.classList.remove('up','down');
			priceValueEl.classList.add(overallDir);

			priceChangeEl.textContent = `${change>=0?'+':''}${fmt(change)} (${changePct>=0?'+':''}${changePct.toFixed(2)}%)`;
			priceChangeEl.classList.remove('up','down');
			priceChangeEl.classList.add(overallDir);

			if(direction){
			  priceValueEl.classList.remove('price-flash');
			  void priceValueEl.offsetWidth; // restart animation
			  priceValueEl.classList.add('price-flash');
			}

			dayHighEl.textContent = m.high;
			dayLowEl.textContent = m.low;
			dayOpenEl.textContent = m.open;		   
		}
   }
   
  /* ============ Chime (Web Audio API) ============ */
  function getAudioCtx(){
    if(!audioCtx){
      const AC = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AC();
    }
    if(audioCtx.state === 'suspended') audioCtx.resume();
    return audioCtx;
  }

  // Two different oscillator "voices" so a rise-alert and a fall-alert
  // are audibly distinct even without looking at the screen.
  function playChime(direction){
    if(!chimeOn) return;
    const ac = getAudioCtx();
    const now = ac.currentTime;

    const isRise = direction === 'rise';
    const oscType = isRise ? 'sine' : 'triangle';
    const notes = isRise ? [880, 1174.66] : [659.25, 493.88]; // ascend for rise, descend for fall

    notes.forEach((freq, i)=>{
      const osc = ac.createOscillator();
      const gain = ac.createGain();
      osc.type = oscType;
      osc.frequency.value = freq;

      const start = now + i*0.16;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.exponentialRampToValueAtTime(0.28, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.5);

      osc.connect(gain).connect(ac.destination);
      osc.start(start);
      osc.stop(start + 0.55);
    });
  }

  /* ============ Alert panel wiring (explicit control, no gear icon) ============ */
  alertToggleBtn.addEventListener('click', ()=>{
    const open = alertPanel.hasAttribute('hidden');
    if(open){
	  const TARGETVAL = state.main.price ;
	  alertTarget.value = Math.round((TARGETVAL*1.05)*100)/100;
      alertPanel.removeAttribute('hidden');
      alertToggleBtn.setAttribute('aria-expanded','true');
    } else {
      alertPanel.setAttribute('hidden','');
      alertToggleBtn.setAttribute('aria-expanded','false');
    }
  });

  alertDirection.value = alertState.direction;
  function syncDirectionColor(){
    alertDirection.classList.toggle('dir-rise', alertDirection.value === 'rise');
    alertDirection.classList.toggle('dir-fall', alertDirection.value === 'fall');
  }
  syncDirectionColor();
  alertDirection.addEventListener('change', syncDirectionColor);

  alertApply.addEventListener('click', ()=>{
    const dir = alertDirection.value;
    const val = parseFloat(alertTarget.value);
    if(isNaN(val) || val <= 0){
      alertStatus.textContent = "Enter a valid price";
      alertStatus.classList.remove('hit');
      return;
    }
    alertState.direction = dir;
    alertState.target = val;
    alertState.armed = true;
    alertState.triggered = false;
    alertStatus.textContent = `Armed: ${dir === 'rise' ? 'rise' : 'fall'} to $${val.toFixed(2)}`;
    alertStatus.classList.remove('hit');
    updateGauge();
  });

  chimeBtn.addEventListener('click', ()=>{
    chimeOn = !chimeOn;
    chimeBtn.textContent = chimeOn ? 'Chime: On' : 'Chime: Off';
    chimeBtn.classList.toggle('active-on', chimeOn);
    chimeBtn.classList.toggle('active-off', !chimeOn);
    if(chimeOn) getAudioCtx(); // unlock audio on explicit user gesture
  });

  /* ============ Price simulation ============ */
  function tick(){
    const prevPrice = stock.price;
    const drift = (Math.random() - 0.5) * (stock.price * 0.006);
    let next = stock.price + drift;
    next = Math.max(1, next);
    stock.price = Math.round(next * 100) / 100;

    stock.high = Math.max(stock.high, stock.price);
    stock.low = Math.min(stock.low, stock.price);

    stock.history.push(stock.price);
    if(stock.history.length > HISTORY_LEN) stock.history.shift();

    indices.forEach(idx=>{
      const d = (Math.random()-0.5) * (idx.base * 0.0015);
      idx.value = Math.round((idx.value + d) * 100) / 100;
    });

    render(prevPrice);
  }

  /* ============ Rendering ============ */
  function fmt(n){ return n.toFixed(2); }

  function render(prevPrice){
    const change = stock.price - stock.open;
    const changePct = (change / stock.open) * 100;
    const direction = stock.price > prevPrice ? 'up' : (stock.price < prevPrice ? 'down' : null);
    const overallDir = change >= 0 ? 'up' : 'down'; // up = gain = red, down = loss = green

    priceValueEl.textContent = fmt(stock.price);
    priceValueEl.classList.remove('up','down');
    priceValueEl.classList.add(overallDir);

    priceChangeEl.textContent = `${change>=0?'+':''}${fmt(change)} (${changePct>=0?'+':''}${changePct.toFixed(2)}%)`;
    priceChangeEl.classList.remove('up','down');
    priceChangeEl.classList.add(overallDir);

    if(direction){
      priceValueEl.classList.remove('price-flash');
      void priceValueEl.offsetWidth; // restart animation
      priceValueEl.classList.add('price-flash');
    }

    dayHighEl.textContent = fmt(stock.high);
    dayLowEl.textContent = fmt(stock.low);
    dayOpenEl.textContent = fmt(stock.open);

    renderIndices();
    drawChart();
    updateGauge();
    checkAlert();
  }

  function renderIndices(){
    indexGrid.innerHTML = '';
    indices.forEach(idx=>{
      const d = idx.value - idx.base;
      const pct = (d/idx.base)*100;
      const dir = d >= 0 ? 'up' : 'down';
      const card = document.createElement('div');
      card.className = 'index-card';
      card.innerHTML = `
        <span class="index-name">${idx.name}</span>
        <span class="index-value">${idx.value.toFixed(2)}</span>
        <span class="index-delta ${dir}">${d>=0?'+':''}${d.toFixed(2)} (${pct>=0?'+':''}${pct.toFixed(2)}%)</span>
      `;
      indexGrid.appendChild(card);
    });
  }
  
 async function resizeCanvas(stockId) {
	  const dpr = window.devicePixelRatio || 1;
	  const rect = canvas.parentElement.getBoundingClientRect();
	  canvas.width = rect.width * dpr;
	  canvas.height = 200 * dpr;
	  canvas.style.height = '200px';
	  ctx.scale(dpr, dpr);
	  await drawChart();
  }

  function drawChart(){
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    if(canvas.width !== rect.width*dpr || canvas.height !== rect.height*dpr){
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    }
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const w = rect.width, h = rect.height;
    ctx.clearRect(0,0,w,h);

    const data = state.history;
	const min = Math.min(...data) , max = Math.max(...data);
	const range = max - min || 1;
	// const pad = { top: 10, bottom: 24, left: 8, right: 8 };
    const pad = (max-min) * 0.15 || 1;
    const lo = min - pad, hi = max + pad;
	const overallUp = data[data.length-1] >= data[0];
    const lineColor = overallUp ? '#e5484d' : '#30a46c';
    const glowColor = overallUp ? 'rgba(229,72,77,0.22)' : 'rgba(48,167,108,0.22)';	
	const xStep = (w - pad.left - pad.right) / (data.length - 1);
	const yScale = (h - pad.top - pad.bottom) / range;
	const pt = (i) => ({
		x: pad.left + i * xStep,
		y: pad.top + (max - data[i]) * yScale
	 });
	const isGain = data[data.length - 1] >= data[0];
    // gridlines
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for(let i=1;i<4;i++){
      const y = (h/4)*i;
      ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke();
    }

    function xAt(i){ return (i/(data.length-1)) * w; }
    function yAt(v){ return h - ((v-lo)/(hi-lo)) * h; }

    // fill under line
    ctx.beginPath();
    ctx.moveTo(xAt(0), h);
    data.forEach((v,i)=> ctx.lineTo(xAt(i), yAt(v)));
    ctx.lineTo(xAt(data.length-1), h);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0,0,0,h);
    grad.addColorStop(0, glowColor);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fill();

    // line
    ctx.beginPath();
    data.forEach((v,i)=>{
      const x = xAt(i), y = yAt(v);
      if(i===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
    });
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.stroke();

    // last point dot
    const lastX = xAt(data.length-1), lastY = yAt(data[data.length-1]);
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4, 0, Math.PI*2);
    ctx.fillStyle = lineColor;
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lastX, lastY, 8, 0, Math.PI*2);
    ctx.fillStyle = glowColor;
    ctx.fill();
	// Open price midline
	const openPrice = state.main.open;
	const flatPrice = state.main.flat;
	const clampedOpen = Math.min(Math.max(flatPrice, min), max);
	const openY = pad.top + (max - clampedOpen) * yScale;
	ctx.beginPath();
	ctx.setLineDash([4, 6]);
	ctx.moveTo(pad.left, openY);
	ctx.lineTo(w - pad.right, openY);
	ctx.strokeStyle = 'rgba(180,190,220,0.35)';
	ctx.lineWidth = 1 ;
	ctx.shadowBlur = 0;
	ctx.stroke();
	ctx.setLineDash([]);
	ctx.font = '9px DM Mono';
	ctx.fillStyle = 'rgba(180,190,220,0.45)';
	ctx.textAlign = 'left';
	ctx.fillText('平盤  $' + flatPrice.toFixed(2), pad.left + 4, openY - 4);
	// Price labels y-axis
	ctx.font = '10px DM Mono';
	ctx.fillStyle = 'rgba(74,80,104,0.9)';
	ctx.textAlign = 'right';
	[0.25, 0.5, 0.75].forEach(t => {
		const val = min + range * t;
		const y = pad.top + (max - val) * yScale;
		ctx.fillText('$' + val.toFixed(2), w - 2, y + 4);
	});
  }

  function updateGauge(){
    if(!alertState.armed){
      gaugeTargetLabel.textContent = 'no target set';
      gaugeFill.style.width = '0%';
      gaugeFill.classList.remove('hit');
      gaugeMarker.style.left = '0%';
      gaugeStart.textContent = '–';
      gaugeEnd.textContent = '–';
      return;
    }
    const dir = alertState.direction;
    const target = alertState.target;
    const start = stock.open;
    let pct;
    if(dir === 'rise'){
      pct = (stock.price - start) / (target - start) * 100;
      gaugeStart.textContent = `$${fmt(start)}`;
      gaugeEnd.textContent = `$${fmt(target)}`;
    } else {
      pct = (start - stock.price) / (start - target) * 100;
      gaugeStart.textContent = `$${fmt(start)}`;
      gaugeEnd.textContent = `$${fmt(target)}`;
    }
    const clamped = Math.max(0, Math.min(100, pct));
    gaugeFill.style.width = clamped + '%';
    gaugeMarker.style.left = clamped + '%';
    gaugeTargetLabel.textContent = `${dir === 'rise' ? 'rise' : 'fall'} to $${fmt(target)} — ${Math.round(clamped)}%`;
    gaugeFill.classList.toggle('hit', clamped >= 100);
  }

  function checkAlert(){
    if(!alertState.armed || alertState.triggered) return;
    const hit = alertState.direction === 'rise'
      ? stock.price >= alertState.target
      : stock.price <= alertState.target;
    if(hit){
      alertState.triggered = true;
      alertStatus.textContent = `Target reached at $${fmt(stock.price)}`;
      alertStatus.classList.add('hit');
      playChime(alertState.direction);
    }
  }

  /* ============ Boot ============ */
   async function startShow(stockId) {;
	await graphcardRender(stockId);
	await resizeCanvas(stockId);
	// await renderMain(stockId);
	// await renderMarkets(stockId);
    id=setInterval(async() => {
		const marketClosetime = "22:30:00" , marketOpentime = "09:00:00" ; 
		const [h2, m2, s2] = marketClosetime.split(':').map(Number);
		const timeToSeconds2= h2 * 3600 + m2 * 60 + s2 ;
		const [h1, m1, s1] = marketOpentime.split(':').map(Number);
		const timeToSeconds1= h1 * 3600 + m1 * 60 + s1 ;			
		const now = new Date();
		const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();	
		if ((nowSeconds > timeToSeconds1) && (nowSeconds < timeToSeconds2)) {
			if  (running) return;
			await graphcardRender(STOCKID);
			await resizeCanvas(STOCKID);
			// await renderMain(STOCKID);
			// await renderMarkets(STOCKID);
			//await tick(STOCKID);	
			await renderIndices();
			await drawChart();
			await updateGauge();
			await checkAlert();			
		}
		else  { 		 
			return;
		 }	

		 running=false ;
	},
   20000);
   intervalIds.push(id); 
 }  
 // window.addEventListener('resize', drawChart);
  // render(stock.price);
  // setInterval(tick, 1500);