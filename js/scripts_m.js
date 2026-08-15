	const element1 = document.getElementById("myBar1");
	const stockId_list=['2330','1102','1101','2356','2454','1402','2324','8150','2317','2002','2027','2303','2308','2887','2353','2347','2449','5410','3706','1301','2371','1504','0050','0056'];
	const mask_item1 = document.getElementById("hiddenMsg1") ;
	const mask_item2 = document.getElementById("hiddenMsg2") ;
	const mask_button = document.getElementById("collapseBtn2") ;
	let running=false,sw_no=2,firstVisit = true ;     // original value:  true 
    let refSec = 3000 ; // original value:  0
	let count=0 ,stockId=0 , btn2_expandId= ""  ;
	let width = 0 , intervalIds = [] , itemPrice_matrix=[] , itemPrice_arry = [] , itemYear_arry11 = [] , itemYear_arry12 = [] , itemYear_arry13 = [] , itemYear_arry21 = [] , itemYear_arry22 = [] , itemYear_arry23 = [] ;
	let show_YearRpt="" , show_SeasonRpt="" , show_MonthRpt="" , tr_line="" ; 
    let mymatrix,wi_o,wi_h,wi_c,wi_cc,wi_t,wi_tt,midline_txt1,midline_txt2,title_txt,item_price1,item_price2,mid_price1=0,mid_price2=0,min_price=0,max_price=0,incdecPrice1,incdecPrice2,timeLabel,labels=[],dataPoints1=[],dataPoints2=[],title1="圖例1",title2="圖例2",point_no=0;
	window.addEventListener('load',function(){
		mask_item1.style.display == "none" ;
		mask_item2.style.display == "none" ;
		startShow();
		element1.style.width = '0%';  
		document.getElementById("s01").addEventListener("change", refreshTime); 			
	}); 
	
   function refreshTime() {
             switch ( $(this).val()) {
					  case "A": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial/index_a.htm' ;
							break;
					  case "B":
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial/index_b.htm'	;
							break;
					  case "C": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial/index_c.htm' ;
							break;
					  case "D": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial/index_d.htm' ;
							break;
					  case "E": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial/index_e.htm' ;
							break;
					  case "F": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial/index_f.htm' ;
							break;
					  case "W": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise2/index_w.htm' ;
							break;
					  case "X": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise2/index_x.htm' ;
							break;
					  case "K": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_k.htm' ;
							break;
					  case "Q": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_q.htm' ;
							break;
					  case "U": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_u.htm' ;
							break;
					  case "V": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_v.htm' ;
							break;
					  case "Y": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial/index_xx.htm' ;
							break;
					  case "Z": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial/index_z.htm' ;
							break;
					  case "P": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial/graph.htm' ;
							break;
					  case "-1": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise' ;
							break;
                  case "0": 
                     width = 100;
                     refSec = 99999 ;
                     element1.style.width = '0%'; 
                     break;
                  case "1": 
                     refSec = 3000 ;
                     break;
                  case "2":
                     refSec = 5000 ;
                     break;
                  case "3": 
                     refSec = 10000 ;
                     break;
                  case "5": 
                     refSec = 30000 ;
                     break;
                  case "6": 
                  refSec = 60000 ;
                     break;
                  case "7": 
                     refSec = 600000 ;
                     break; 
                  case "10": 
                     refSec = 1800000 ;
                     break;                                     
                  default:
                     refSec = 60000 ;
                     return;
                    } 

		}	
 
  async function getpricePost(stockId) {
	  try {
	   let itemPrice_matrix="" ;
	   let oldCanvas = document.getElementById("hiddenMsg2");
	   if (oldCanvas && stockId == -1) {
	      oldCanvas.outerHTML = "<div id='hiddenMsg2' style='display:none;'><canvas id='myChart' width='750' height='400'  display='none'></canvas><div id='collapseBtn2' style='display:none;justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='getPost(0)' /></div></div>" ;
	      return 0;
		}
		else {
		  oldCanvas.outerHTML = "<div id='hiddenMsg2'><canvas id='myChart' width='750' height='400'></canvas><div id='collapseBtn2' style='justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='getpricePost(-1)' /></div></div>" ;
		}
		let fetchUrl_str1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:" , fetchUrl_str2=":STOCK&quote=1"   ;
		let fetchUrl_str=fetchUrl_str1 + stockId_list[stockId] + fetchUrl_str2 ;
		const response = await fetch(fetchUrl_str);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}

		const post = await response.json(); // Convert response to JS object
		return post;
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
	  }
	}
		
 
 async function getPost(stockId) {
	  try {
		let fetchUrl_str="" ;
		let fetchUrl_str1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:" , fetchUrl_str2=":STOCK&quote=1"   ;
		if (stockId == 9999 ) 
			fetchUrl_str="https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN"
		else
			fetchUrl_str=fetchUrl_str1 + stockId_list[stockId] + fetchUrl_str2 ;	
		const response = await fetch(fetchUrl_str);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
		const post = await response.json(); // Convert response to JS object
		return post;
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
     }
  }

   async function getPostYOY(stockId,firstVisit) {
	  try { 
		fetchUrl_str="https://marketinfo.api.cnyes.com/mi/api/v1/financialIndicator/revenue/TWS:" + stockId_list[stockId] + ":STOCK?year=5&to=1572364800" ;
		const response = await fetch(fetchUrl_str);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
		const post = await response.json(); // Convert response to JS object
		return post;
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
     }
  }

   async function getPostEPS(stockId,firstVisit) {
	  try { 
		fetchUrl_str="https://marketinfo.api.cnyes.com/mi/api/v1/financialIndicator/eps/TWS:" + stockId_list[stockId] + ":STOCK?resolution=Q&acc=false&year=5&to=1573488000" ;
		const response = await fetch(fetchUrl_str);
		if (!response.ok) {
		  throw new Error(`HTTP error! status: ${response.status}`);
		}
		const post = await response.json(); // Convert response to JS object
		return post;
	  } catch (error) {
		console.error('Fetch error:', error);
		return null;
     }
  }



 async function displayPost(stockId) {
	  const post = await getPost(stockId);
	  let elemId_price = "" , elemId_price_flag = 0;
	  if (stockId == 9999) {
			if (post) {
				const quote_obj = post.data.quote ;	
				for ( var n in quote_obj) {
					if ( n == "11" ) {
						if (quote_obj[n]> 0) 
                            {
							document.getElementById("wi-d").classList.add("wi-risePrice");
                            } 
                        else {
                          if (quote_obj[n] === 0){ 
                           	document.getElementById("wi-d").classList.add("wi-flatPrice");                           	  	 		
                          }
                          else {
							document.getElementById("wi-d").classList.add("wi-fellPrice");
                          }
                        }
						document.getElementById("wi-d").innerHTML = quote_obj[n]  ;		
					} 		
				}
				document.getElementById("wi-c").innerHTML= post.data.c + '(C)';
				document.getElementById("wi-h").innerHTML= post.data.h + '(H)';
				document.getElementById("wi-l").innerHTML= post.data.l + '(L)';						
			}	
	  }
	  else {
			const num = stockId+1 ;
			let elemId_1="item-1" + num , elemId_2="item-2" + num , elemId_3="item-3" + num , elemId_4="item-4" + num , elemId_5="item-5" + num ;
			btn2_expandId = "btn2-expandId" + num ; 
			if (post) {
				const quote_obj = post.data.quote ;
				for ( var n in quote_obj) {
				if ( n == "200009" ) document.getElementById(elemId_1).innerHTML =  "<button class='btn-expand' onclick='showElement(" + stockId + ",false);'>" + quote_obj[n] + "</button>" ;
				if ( n == "6" ) elemId_price= quote_obj[n] ;
				if ( n == "11" ) {
						if ( quote_obj[n]> 0) {
								elemId_price_flag= 1 ;
								document.getElementById(elemId_3).classList.add('risePrice');
							} 
						else {
							if ( quote_obj[n] === 0){ 
								elemId_price_flag= 0 ;
								document.getElementById(elemId_3).classList.add('flatPrice');
								}
							else {
								elemId_price_flag= -1 ;
								document.getElementById(elemId_3).classList.add('fellPrice');	
								}
						}
					document.getElementById(elemId_3).innerHTML =  "<span class='span_rpt'>" + quote_obj[n] + "</span>" ;
				
				}	   
				if ( n == "12" ) document.getElementById(elemId_4).innerHTML =  "<span class='span_rpt'>" + quote_obj[n] + "</span>" ;
				if ( n == "13" ) document.getElementById(elemId_5).innerHTML =  "<span class='span_rpt'>" + quote_obj[n] + "</span>" ;
				}
				document.getElementById(elemId_2).innerHTML =  "<button id='" + btn2_expandId +"' onclick='realtimePrice(" + stockId + ",true);'>" + elemId_price + "</button>" ;
				if (elemId_price_flag === 1)  document.getElementById(btn2_expandId).classList.add('btn-risePrice');
				if (elemId_price_flag === 0)  document.getElementById(btn2_expandId).classList.add('btn-flatPrice');	
				if (elemId_price_flag === -1)  document.getElementById(btn2_expandId).classList.add('btn-fellPrice');		
			}
	  }
  } 

   async function displayPostYE1(stockId,firstVisit) {
	  const post1 = await getPostYOY(stockId,firstVisit);
	  const post2 = await getPostEPS(stockId,firstVisit);
		if (post1) {
			let postData1 = post1.data ;
			let postDataMatrix1 = postData1[0] ;
			itemYear_stockname = postDataMatrix1.name ;
			itemYear_arry11 = postDataMatrix1.time ;
			itemYear_arry12 = postDataMatrix1.revenue ;
			itemYear_arry13 = postDataMatrix1.revenueYOY ;
			tr_line ="",show_YearRpt="" ;
       		let  item2currency=0 ;
			for (let i = 0; i < itemYear_arry11.length; i++) {
				item2currency = (itemYear_arry12[i]/1000) + "" ;
				item2currency = item2currency.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
				tr_line = tr_line + '<tr><td>' + timestampToTime(itemYear_arry11[i]) + '</td><td>' + item2currency + '</td><td>' +　itemYear_arry13[i]　+'</td></tr>' ;
			} ;						 
		    show_YearRpt='<table width="33%" style="color: rgb(132, 141, 151); font-size: 14px; text-align: right;" border="1">' + '<thead><tr><td style="width:33%;color:#9c3579">[' + itemYear_stockname + ']月財報</td><td style="width:25%">營收(千元)</td><td style="width:33%">年增率</td></thead><tbody>' + tr_line  + '</tbody></table>'  ;				
		}

		if (post2) {
			let postData2 = post2.data ;
			let postDataMatrix2 = postData2[0] ;
			itemYear_stockname = postDataMatrix2.name ;
			itemYear_arry21 = postDataMatrix2.time ; ;
			itemYear_arry22 = postDataMatrix2.epsYOY ;
			itemYear_arry23 = postDataMatrix2.eps ;
			tr_line =""
			var item2currency=0;
			var espEarning_digit=0; 
			var espDate_arry = [...itemYear_arry21].reverse();
			var espEarning_arry = [...itemYear_arry23].reverse(); 
			var accuEarning_arry = espEarning_arry ;
			var text,subStr,quarterDateStr,quarterDate_arry ;
			for (var i = 0; i < espDate_arry.length; i++) {
			espDate_arry[i]=timestampToTime(espDate_arry[i]) ;
			subStr =espDate_arry[i].substring(espDate_arry[i].indexOf("-")+1) ;
			switch (subStr) {
				case "01": 
					accuEarning_arry[i]= espEarning_arry[i] ;
					espEarning_digit=accuEarning_arry[i] ;
					accuEarning_arry[i]=parseFloat(espEarning_digit.toFixed(2)) ;
					break ;
				case "04": 
					espEarning_digit=accuEarning_arry[i] ;
					accuEarning_arry[i]=parseFloat(espEarning_digit.toFixed(2)) ;
					accuEarning_arry[i] += espEarning_arry[i-1] ;
					espEarning_digit= accuEarning_arry[i] ;
					accuEarning_arry[i]= parseFloat(espEarning_digit.toFixed(2)) ; 
					break;
				case "07": 
					espEarning_digit=accuEarning_arry[i] ;
					accuEarning_arry[i]=parseFloat(espEarning_digit.toFixed(2)) ;
					accuEarning_arry[i] += espEarning_arry[i-1] ;
					espEarning_digit= accuEarning_arry[i] ;
					accuEarning_arry[i]= parseFloat(espEarning_digit.toFixed(2)) ;
					break; 
				case "10": 
					espEarning_digit=accuEarning_arry[i] ;
					accuEarning_arry[i]=parseFloat(espEarning_digit.toFixed(2)) ;
					accuEarning_arry[i] += espEarning_arry[i-1] ;
					espEarning_digit= accuEarning_arry[i] ;
					accuEarning_arry[i]= parseFloat(espEarning_digit.toFixed(2)) ;
					break;      

			}     
			} ; 
			accuEarning_arry.reverse() ;
			for (var i = 0; i < itemYear_arry21.length; i++) {
				item2currency = itemYear_arry22[i]  ;
				quarterDateStr=timestampToTime(itemYear_arry21[i]) ;
				quarterDate_arry= quarterDateStr.split("-") ;
				switch (quarterDate_arry[1]) {
					case "01": 
						quarterDate_arry[1]="Q1"
						break;
					case "04": 
						quarterDate_arry[1]="Q2"
						break;
					case "07": 
						quarterDate_arry[1]="Q3"
						break;
					case "10": 
						quarterDate_arry[1]="Q4"
						break;
				}
				tr_line = tr_line + '<tr><td><b>' +  quarterDate_arry[0] + quarterDate_arry[1] + '</b></td><td>' + item2currency + '</td><td>' +　itemYear_arry23[i]　+'</td><td>' +　accuEarning_arry[i]　+'</td></tr>' ;
			} ;
			show_SeasonRpt='<table width="30%" style="color: rgb(132, 141, 151); font-size: 14px; text-align: right;" border="1">' + '<thead><tr><td style="width:40%;color:#9c3579">[' + itemYear_stockname + ']季財報</td><td style="width:40%">epsYOY(%)</td><td style="width:20%">EPS</td><td style="width:35%">累計EPS</td></thead><tbody>' + tr_line  + '</tbody></table>'  ;
		}	
        if (firstVisit === undefined || firstVisit === null) {
			document.getElementById("hiddenElement1").innerHTML="&nbsp;" ;
			document.getElementById("hiddenElement2").innerHTML="&nbsp;" ;
			document.getElementById("collapseBtn").innerHTML="&nbsp;" ;			
        }
        else {
			document.getElementById("hiddenElement1").innerHTML=show_YearRpt ;
			document.getElementById("hiddenElement2").innerHTML=show_SeasonRpt ;
			document.getElementById("collapseBtn").outerHTML="<div id='collapseBtn'><img src='collapse.png' style='cursor:pointer;' onclick='collapseElement()' /></div>" ;
        } 
  } 

  async function displayPostYE2(stockId,firstVisit) {
		mask_item1.style.display = "block" ;
		document.documentElement.scrollTop=0;
  }
  // 初始數據
  // let labels = [] , dataPoints1 = [] , dataPoints2 = [] ;
  async function getData1(stockId) {
	  	let fetchUrl_str="" ;
		let fetchUrl_str1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:" , fetchUrl_str2=":STOCK&quote=1"   ;
		if (stockId == 9999 ) 
			fetchUrl_str="https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN"
		else
			fetchUrl_str=fetchUrl_str1 + stockId_list[stockId] + fetchUrl_str2 ;
		const response = await fetch(fetchUrl_str); 
	    if  (!response.ok) {
		   throw new Error(`HTTP error!!!! status: ${response.status}`);
		  }
	    else {
		  const result = await response.json();
		  return result; // ← 正確把值傳出去 
	    }
	 }
  async function getData2() {
		  const response = await fetch("https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN"); 
		  if  (!response.ok) {
			  throw new Error(`HTTP error!!!! status: ${response.status}`);
			}
		  else {
			  const result = await response.json();
			  return result; // ← 正確把值傳出去 
		  }
	 }

  async function displayPostChart() {	
		document.documentElement.scrollTop=0;
  } 
 
 async function realtimePrice(stockId,firstVisit) {	
 		let mymatrix,wi_o,wi_h,wi_c,wi_cc,wi_gg,wi_t,wi_tt,midline_txt1,midline_txt2,title_txt,item_name1,item_name2,item_price1,item_price2,mid_price1=0,mid_price2=0,min_price=0,max_price=0,incdecPrice1,incdecPrice2,timeLabel,labels=[],dataPoints1=[],dataPoints2=[],title1="圖例1",title2="圖例2",point_no=0;
		let rightVisible = true;
		if (firstVisit) sw_no=2;
		const oldChart=document.getElementById("realtimeChart");
		const oldcollapseBtn2=document.getElementById("collapseBtn2");
		const oldstopBtn=document.getElementById("stopBtn");
		const oldcollapseBtns=document.getElementById("collapseBtns");
		const oldhiddenMsg2=document.getElementById("hiddenMsg2");	
		if (oldhiddenMsg2 && firstVisit) oldhiddenMsg2.style.display = "flex" ;		
		if (oldChart && firstVisit) oldChart.outerHTML = "<canvas id='realtimeChart' width='750' height='400' style='display:block;'></canvas>" ;
		if  (oldcollapseBtn2 && firstVisit) {
			oldcollapseBtns.outerHTML = "<div id='collapseBtns' style='display:block'><div id='collapseBtn2' style='justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='collapseElement2()' /></div>" +
			"<div id='oneBtn' style='justify-content:center;'><img src='onebtn.png' style='cursor:pointer;' /></div>" +
			"<div id='twinBtn' style='justify-content:center;'><img src='twinbtn.png' style='cursor:pointer;' /></div>" +
			"<div id='stopBtn' style='justify-content:center;'><img src='stopbtn.png' style='cursor:pointer;' /></div>" +
			"<div id='goBtn' style='justify-content:center;'><img src='gobtn.png' style='cursor:pointer;' /></div></div>"; 
		}	
		while(intervalIds.length){
			  clearInterval(intervalIds.pop());
		 }
		 const post1 = await getData1(stockId);
		 const post2 = await getData2();
		 await displayPostChart();   		  
		 if (post1) {
				wi_o=post1.data.o;
				wi_h=post1.data.h;
				wi_c=post1.data.c;
				wi_t=post1.data.t;
				wi_cc=[...wi_c].reverse() ;
				wi_tt=[...wi_t].reverse() ;				
			    const now = new Date();
			    timeLabel = now.toLocaleTimeString('zh-TW', { hour12: false, timeStyle: 'medium' });
				const quote_obj = post1.data.quote ;
				for ( var n in quote_obj) {
				   if ( n == "200009" )  item_name1=quote_obj[n] ;
				   if ( n == "11" ) incdecPrice1=quote_obj[n] ;
				   if ( n == "6" ) item_price1=quote_obj[n] ;
				}
				mid_price1=item_price1-incdecPrice1;
				mid_price1=mid_price1.toFixed(2);
				max_price=mid_price1*1.05 ;
				min_price=mid_price1*0.95 ;
				if (item_price1>900 && incdecPrice1>50) {
					max_price=mid_price1*1.15 ;
					min_price=mid_price1*0.85 ;
				}
				if (item_price1<70 && incdecPrice1>2.5) {
					max_price=mid_price1*1.12 ;
					min_price=mid_price1*0.9 ;
				}				
				midline_txt1= item_name1+'平盤：'+mid_price1.toString() ; 
				midline_txt1 = midline_txt1 + "【" + item_price1.toString() + "】";
			}
		  if (sw_no==2 && post2) {
				wi_o=post2.data.o;
				wi_h=post2.data.h;
				wi_c=post2.data.c;
				item_price2=wi_c[0];
				const quote_obj = post2.data.quote ;
				for (var n in quote_obj) {
				   if ( n == "200009" )  item_name2=quote_obj[n] ;
				   if ( n == "11" ) incdecPrice2= quote_obj[n] ;
				}
				mid_price2=wi_c-incdecPrice2;
				mid_price2=mid_price2.toFixed(2);
				midline_txt2= '大盤：' + mid_price2.toString() + '[' + incdecPrice2.toString() + ']'; 
				wi_gg = Array(wi_tt.length).fill(item_price2);
				dataPoints2=[...wi_gg] ;
			}
			for (let i=0;i<wi_tt.length ;i++) {
				let date = new Date(wi_tt[i] * 1000);
				let time = date.toLocaleTimeString('zh-CN', {hour12: false,});
				wi_tt[i]=time;
				const hour = parseInt(time.split(":")[0], 10);
				const min = parseInt(time.split(":")[1], 10) ;
				if (min % 10 === 0) 
					wi_tt[i]=hour.toString() + min.toString(); 
				else wi_tt[i]="" ; 
			}
			labels=[...wi_tt];
			dataPoints1=[...wi_cc];
	      const ctx = document.getElementById('realtimeChart').getContext('2d');
		  config = {
			  type: 'line',
			  data: {
				labels: labels,
				datasets: [
				  {
					label:item_name1,	// Legend_y1 show
					data: dataPoints1,
					borderColor: 'red',   // 螢光綠線
					yAxisID:'y1',
					borderWidth: 2,
					cubicInterpolationMode: 'monotone',
					tension: 0.3,
					fill: false,
					pointRadius: 0,           // 隱藏點
					pointHoverRadius: 0
				  },
				  {
					label:item_name2,   // Legend_y2 show
					data: dataPoints2,
					borderColor: 'blue',   // 螢光綠線
					yAxisID:'y2',
					borderWidth: 2,
					cubicInterpolationMode: 'monotone',
					tension: 0.3,
					fill: false,
					pointRadius: 0,           // 隱藏點
					pointHoverRadius: 0
				  }
				]
			  },
			  options: {
				responsive: true,
				maintainAspectRatio: false,
				animation: {
				onComplete() {
					setTimeout(() => chart.update(), 0);
				}},             // 關閉動畫，加速更新
				scales: {
				  y1: {
						min:min_price,  
						max:max_price,
						grid: { color: '#333' },
						ticks: { color: '#aaa' },
						position: 'left'
				  },
				  y2: {
					type:'linear',
					position: 'right'
				  }
				},
				plugins: {
				  annotation: {
					annotations: {
					  leftMidline: {
						type: 'line',
						yScaleID: 'y1',
						yMin:mid_price1,
						yMax:mid_price1,
						borderColor: '#ff4444',
						borderWidth: 1.5,
						borderDash: [6, 6],
						label: {
						  display: true,
						  content: midline_txt1,				// '中線 y=38'
						  color: '#c431a7',						// '#00ff88'
						  backgroundColor: '#000' ,
						  font: {
							size: 12,
							weight: 100,  // Set 'lighter'
						  }
						//  position: 'start'
						}
					  },
					  rightMidline: {
						type: 'line',
						yScaleID: 'y2',
						yMin:mid_price2,
						yMax:mid_price2,
						borderColor: '#00b3ff',
						borderWidth: 1.5,
						borderDash: [6, 6],
						label: {
						  display: true,
						  content: midline_txt2 ,			// '中線 y=38'
						  fontWeight:100,
						  color: '#00b3ff',
						  backgroundColor: '#000',
						  position: 'end'
						}
					  }
					}
				  }
				}
			  }
			} ;
			let chart= new Chart(ctx,config);
			document.getElementById('oneBtn').addEventListener('click', async() => {
				rightVisible=false;
				chart.options.scales.y2.display=false;
				chart.options.plugins.annotation.annotations.rightMidline.display=false;
				for (let i=0;i<dataPoints2.length-1;i++) dataPoints2.pop() ;
				if (sw_no==1) return  
				else sw_no=1;
			});
			document.getElementById('twinBtn').addEventListener('click', async() => {
					if (sw_no==2) {return} else sw_no=2 ;
					if (dataPoints2.length != 0) {
						for (let i=0;i<dataPoints2.length-1;i++) {
							dataPoints2.pop()
						}
					}
					rightVisible=true;
					chart.options.scales.y2.display=true;
					chart.options.plugins.annotation.annotations.rightMidline.display=true;
			  });
			document.getElementById('stopBtn').addEventListener('click',()=>(running=true));	  
			document.getElementById('goBtn').addEventListener('click',()=>(running=false));
			chart.update();	
		  id=setInterval(async() => {
				const marketClosetime = "13:30:00"; 
				const [h, m, s] = marketClosetime.split(':').map(Number);
				const timeToSeconds= h * 3600 + m * 60 + s ;
				const now = new Date();
				const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();	
				if (nowSeconds > timeToSeconds || running) 
					return
				 else 	
				  running=true;
				  const post1 = await getData1(stockId);
				  if (rightVisible==true) {
					  const post2 = await getData2();
				  }
				  if (post1) {
						wi_o=post1.data.o;
						wi_h=post1.data.h;
						wi_c=post1.data.c;
						const now = new Date();
						let time = now.toLocaleTimeString('zh-TW', { hour12: false, timeStyle: 'medium' });
						const hour = parseInt(time.split(":")[0], 10);
						const min = parseInt(time.split(":")[1], 10) ;
						if ( min % 10===0) 
							timeLabel=hour.toString() + min.toString() 
						else timeLabel=""; 
						const quote_obj = post1.data.quote ;
						for ( var n in quote_obj) {
						   if ( n == "200009" )  item_name1=quote_obj[n] ;
						   if ( n == "11" ) incdecPrice1=quote_obj[n] ;
						   if ( n == "6" ) item_price1=quote_obj[n] ;
						}
						mid_price1=item_price1-incdecPrice1;
						mid_price1=mid_price1.toFixed(2) ;
						midline_txt1= item_name1+'平盤：'+mid_price1.toString() ; 
						midline_txt1 = midline_txt1 + "【" + item_price1.toString() + "】";						
					}
				  if (rightVisible==true && post2)  {
						wi_o=post2.data.o;
						wi_h=post2.data.h;
						wi_c=post2.data.c;
						item_price2=wi_c[0];
						const quote_obj = post2.data.quote ;
						for ( var n in quote_obj) {
						   if ( n == "200009" )  item_name2=quote_obj[n] ;
						   if ( n == "11" ) incdecPrice2= quote_obj[n] ;
						}
						mid_price2=item_price2-incdecPrice2;
						midline_txt2= item_name2+'平盤：'+mid_price2.toString() ; 
						midline_txt2 = midline_txt2 + "【" + item_price2.toString() + "】";				
					}
				 labels.push(timeLabel);
				 dataPoints1.push(item_price1);
				 if (rightVisible==true) 
					 dataPoints2.push(item_price2) 						
				 else {
					 for (let i=0;i<dataPoints2.length;i++) {
						dataPoints2.pop()
					 }	 
				 } ;		
				 chart.update;
				 count++ ;
				 running=false ;
			},3000);
		 intervalIds.push(id); 
   }   

   function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;
	    return Y+M ;
    }

	async function showElement(stockNo,firstVisit) {
		await displayPostYE1(stockNo,firstVisit);
		await displayPostYE2(stockNo,firstVisit);  
    }


	function collapseElement() {
      mask_item1.style.display="none" ;
      }	  
	  
	function collapseElement2() {
		while(intervalIds.length){
		  clearInterval(intervalIds.pop());
		}
		firstVisit = false;
	    let mask_item2 = document.getElementById("hiddenMsg2");
	    if (mask_item2) {
	      mask_item2.outerHTML = "<div id='hiddenMsg2' style='display:flex;'><div><canvas id='realtimeChart' width='750' height='400' style='display:none;'></canvas></div>" + 
			"<div id='collapseBtns' style='display:flex'><div id='collapseBtn2' style='display:none;justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='collapseElement2()' /></div>" + 
			"<div id='oneBtn' style='display:none;justify-content:center;'><img src='onebtn.png' style='cursor:pointer;' /></div>" +
			"<div id='twinBtn' style='display:none;justify-content:center;'><img src='twinbtn.png' style='cursor:pointer;' /></div>" +			
			"<div id='stopBtn' style='display:none;justify-content:center;'><img src='stopbtn.png' style='cursor:pointer;' /></div>" +
			"<div id='goBtn' style='display:none;justify-content:center;'><img src='gobtn.png' style='cursor:pointer;' /></div></div>" ; 	
		}
    }
	
	function collapseElement3() {
	    const mask_item2 = document.getElementById("hiddenMsg2");
		while(intervalIds.length){
		  clearInterval(intervalIds.pop());
		}
		firstVisit = false;
    }
	  
  async function startShow() {
		await displayPost(9999);
		await displayPost(0);
		await displayPost(1);
		await displayPost(2);
		await displayPost(3);
		await displayPost(4);
		await displayPost(5);
		await displayPost(6);
		await displayPost(7);
		await displayPost(8);
		await displayPost(9);
		await displayPost(10);
		await displayPost(11);
		await displayPost(12);
		await displayPost(13);
		await displayPost(14);
		await displayPost(15);
		await displayPost(16);
		await displayPost(17);
		await displayPost(18);
		await displayPost(19);
		await displayPost(20);
		await displayPost(21);
		await displayPost(22);
		await displayPost(23);
	}  
