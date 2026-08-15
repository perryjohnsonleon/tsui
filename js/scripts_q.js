	const element1 = document.getElementById("myBar1");
	const stockId_list=["2330","2454","3661","3443","2303","2606","9940","3042","2603","1713","2609","3711","2885","2882","2891","2887","2884","00982A","00981A","00980A"] ;
	const mask_item1 = document.getElementById("hiddenMsg1") ;
	let stockId=0 , btn2_expandId= "" ;
	let width = 0 , intervalIds = [] , itemPrice_matrix=[] , itemPrice_arry = [] , itemYear_arry11 = [] , itemYear_arry12 = [] , itemYear_arry13 = [] , itemYear_arry21 = [] , itemYear_arry22 = [] , itemYear_arry23 = [] ;
	let show_YearRpt="" , show_SeasonRpt="" , show_MonthRpt="" , tr_line="" ; 
	window.addEventListener('load',function(){
		mask_item1.style.display == "none" ;
		startShow();
		element1.style.width = '0%';  
		document.getElementById("s01").addEventListener("change", refreshTime); 			
	}); 
	
   function refreshTime() {
             switch ( $(this).val()) {
					  case "A": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_a.htm' ;
							break;
					  case "B":
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_b.htm'	;
							break;
					  case "C": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_c.htm' ;
							break;
					  case "D": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_d.htm' ;
							break;
					  case "E": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_e.htm' ;
							break;
					  case "F": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_f.htm' ;
							break;
					  case "W": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise2/index_w.htm' ;
							break;
					  case "X": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise2/index_x.htm' ;
							break;
					  case "Z": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_z.htm' ;
							break;
					  case "K": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_k.htm' ;
							break;
					  case "Q": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/index_q.htm' ;
							break;
					  case "P": 
							window.location.href = 'https://perryjohnsonleon.github.io/tutorial2/graph.htm' ;
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
				   while(intervalIds.length){
                          clearInterval(intervalIds.pop());
					}
				   if  (refSec != 99999 ) {
				       id = setInterval(getDATA,refSec);
				       intervalIds.push(id); 
					 }
					 else 
					 {
						  while(intervalIds.length){
							  clearInterval(intervalIds.pop());
							}						
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
				if ( n == "200009" ) {
					if (num<18) 
						document.getElementById(elemId_1).innerHTML =  "<button class='btn-expand' onclick='showElement(" + stockId + ",false);'>" + quote_obj[n] + "</button>" 
					else
						document.getElementById(elemId_1).innerHTML =  "<button class='btn-expand' onclick='showElement(" + stockId + ",false);'>" + stockId_list[num-1] + "</button>" ;
				}	
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
				document.getElementById(elemId_2).innerHTML =  "<button id='" + btn2_expandId +"' onclick='realtimePrice(" + stockId + ",false);'>" + elemId_price + "</button>" ;
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
			console.log(1213456);
        } 
  } 

  async function displayPostYE2(stockId,firstVisit) {
		mask_item1.style.display = "block" ;
		document.documentElement.scrollTop=0;
  }

 async function realtimePrice(stockId) {
   const post = await getpricePost(stockId);
   if ( post !=0 ) {
	  let itemPrice_name = "" , itemPrice_weight= 0 , itemPrice_height = 0 ;
	  let xValues_str="0";
	  if (post) {
		const itemPrice_arry = post.data.c;
		const quote_obj = post.data.quote ;
		for ( var n in quote_obj) {
		   if ( n == "200009" ) itemPrice_name= quote_obj[n] ;
		   if ( n == "6" ) itemPrice_weight= quote_obj[n] ;
		   if ( n == "11" ) itemPrice_height= quote_obj[n] ;
		}
		itemPrice_matrix =[...itemPrice_arry].reverse() ;	
		const xValues_matrix= Array.from({ length: itemPrice_matrix.length }, (_, index) => index + 1);
		const xValues = xValues_matrix;
		let original = itemPrice_matrix ;
		let yValues = original.map(n => n );
		let points = yValues.map((y, i) => ({ x: xValues[i], y }));
		let itemPrice_title = itemPrice_name + "(" + itemPrice_weight + ")" + "[" + itemPrice_height + "]" ; 
		let itemPrice_mid= itemPrice_weight - itemPrice_height ;
		var graph=new Chart(document.getElementById('myChart'), {
		  type: 'line',
		  data: {
			datasets: [{
			  label: itemPrice_title ,
			  data: points,
			  borderColor:'#1171FF',
			  borderWidth:1,
			  pointRadius:1,
			  cubicInterpolationMode: 'monotone',
			  tension: 0.4,
			  backgroundColor: 'rgba(17,113,255,0.6)',
			}]
		  },
		  options: { 
		  // *****
			responsive: true,
			plugins: {
			  legend: {
				display: true,
				labels: { font: { size: 14 } }
			  },
			  annotation: {
				annotations: {
				  midline: {
					type: 'line',
					yMin: itemPrice_mid,   // 中線 y 值
					yMax: itemPrice_mid,
					borderColor: 'red',
					borderWidth: 1,
					borderDash: [4, 4],
					label: {
					  display: true,
					  content: '',
					  color: 'red',
					  position: 'end',
					  backgroundColor: 'white'
					}
				  }
				}
			  }
			}		  
		  
		  // *****
		,scales: {
			  x: {
				type: 'linear', // 指定為數值型 x 軸
				title: { display: true, text: '時間' },
			  },
			  y: {
				beginAtZero: false,
				title: { display: true, text: '股價' },
			  }
			}
		  }
		});
	   }  
    }
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
	  console.log(12345);
      }