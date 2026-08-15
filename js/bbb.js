// ── DATA ───────────────────────────────────────────────────────────────────
const stockId_list1=['2330','2454','2308','2317','2303','2356','2357','2353','1102','2324','2344','2408','6770','2337','2347','2371','1504','2891','2887','2884','00982A','00980A','00981A','0050','0056'];
const stockId_list2=['2330','2454','3661','3443','2303','2606','9940','3042','2603','1713','2609','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'] ;
const stockId_list3=['2882','2887','2891','2881','2884','2883','2892','2886','2838','2885','2890','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
 const stockId_list4=['2603','2606','2605','2609','2610','2618','2615','2633','2645','2646','2634','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
 const stockId_list5=['1301','1303','1325','1326','1314','1307','1304','1310','1308','1312','1313','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
 const stockId_list6=['2027','2002','2014','2006','2010','2008','2009','2032','2010','2211','9958','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
 const stockId_list8=['1402','1409','1413','1414','1417','1418','1419','1419','1434','1440','1441','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
 const stockId_list9=['1216','1210','1215','1229','1217','1218','1201','1702','1203','1737','3054','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
 const stockId_list10=['1903','1904','1905','1906','1907','1909','6790','6790','6790','6790','6790','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
 const stockId_list11=['6214','2427','2453','2468','2471','2480','3029','4994','5203','6112','6183','0050','00878','006208','00713','00692','00881','00919','00940','00757','00982A','00983A','00984A','00985A','00992A'];
 const MAIN = { sym: '宏碁', name: '2353', price: 27 };
 const MARKETS = [{ sym: '加權指數',  name: 'NASDAQ 100',     sub: 'US Index',    price: 32722 }, ];
 const mask_item1 = document.getElementById("hiddenMsg1") ;
 const mask_item2 = document.getElementById("hiddenMsg2") ;
 const mask_button = document.getElementById("collapseBtn2") ;
 let stockId_list=[],running=false,sw_no=1,firstVisit = true ;     // original value:  true 
 let refSec = 3000 ; // original value:  0
 let count=0 ,stockId=0 , btn2_expandId= ""  ;
 let width = 0 , intervalIds = [] , itemPrice_matrix=[] , itemPrice_arry = [] , itemYear_arry11 = [] , itemYear_arry12 = [] , itemYear_arry13 = [] , itemYear_arry21 = [] , itemYear_arry22 = [] , itemYear_arry23 = [] ;
 let show_YearRpt="" , show_SeasonRpt="" , show_MonthRpt="" , tr_line="" ; 
 let mymatrix,wi_o,wi_h,wi_c,wi_cc,wi_t,wi_tt,midline_txt1,midline_txt2,title_txt,item_price1,item_price2,mid_price1=0,mid_price2=0,min_price=0,max_price=0,incdecPrice1,incdecPrice2,timeLabel,labels=[],dataPoints1=[],dataPoints2=[],title1="圖例1",title2="圖例2",point_no=0;
 window.addEventListener('load',function(){
		mask_item1.style.display == "none" ;
		mask_item2.style.display == "none" ;
		startShow(1);
		element1.style.width = '0%';  
		document.getElementById("s01").addEventListener("change", refreshTime); 			
 }); 
 
   async function getpricePost(stockId) {
	  try {
	   let itemPrice_matrix="" ;
	   let oldCanvas = document.getElementById("hiddenMsg2");
	   if (oldCanvas && stockId == -1) {
	      oldCanvas.outerHTML = "<div id='hiddenMsg2' style='display:none;'><canvas id='myChart' width='320' height='200'  display='none'></canvas><div id='collapseBtn2' style='display:none;justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='getPost(0)' /></div></div>" ;
	      return 0;
		}
		else {
		  oldCanvas.outerHTML = "<div id='hiddenMsg2' style='display:block;'><canvas id='myChart' width='320' height='200'></canvas><div id='collapseBtn2' style='justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='getpricePost(-1)' /></div></div>" ;
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
		if (stockId == 8888 ) fetchUrl_str="https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN" ;
		if (stockId == 7777 ) fetchUrl_str="https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN" ;		
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
  
    async function getWDATA() {
		await displayPost(7777);
	}  
  
  
       function getWDATA1() {
		// https://invest.cnyes.com/indices/major 世界各國主要指數
		// https://ws.api.cnyes.com/ws/api/v3/universal/quote?type=IDXMAJOR&column=B&page=1&limit=20	
		// data.items ['200009'品名,'11'收盤,'12'最高,'13'最低]	 陣列排序 1.日本 2. 韓國 ˇ3.集中 4.櫃買 5.6.恆生 7.8.9.10上證滬深 11 英 12 法 13 德
		// 14 道瓊15 S&P500 16 NASDAQ 17 費城半導體	 18 黃金 19 美元
		// https://ws.api.cnyes.com/ws/api/v3/universal/quote?type=IDXMAJOR&column=B&page=2&limit=10
		// data.items ['200009'品名,'11'收盤,'12'最高,'13'最低]	 陣列排序 4.道瓊 6.NASDAQ 5. SP500 7. 費城半導體
        $.getJSON('https://ws.api.cnyes.com/ws/api/v3/universal/quote?type=IDXMAJOR&column=B&page=2&limit=10',function(data){
            // console.log('success');
          $.each(data,function(key1,item1){
             if (key1 === 'data') {
             //  $('ul').append('<li>'+item1+'</li>');
            var itemData = item1; 	          
            $.each(itemData,function(key2,item2){
              if (key2  === 'items' ) {
                  var itemData2 = item2;
                  var itemDataTemp ;
                //  Dowjon - starting
                $.each(itemData2[3],function(key3,item3){
                    if (key3 === '6') {
                      itemDataTemp = item3 ;
                       }
                if (key3 === '200009') {
                 //   $("#dowjon").html(item3 + '<BR>' + itemDataTemp );
                     }   
				if (key3 === '11') {
                         $("#dowjon-p").html(item3);                             	
                         if (item3> 0) 
                             {
                                $("#dowjon-p").addClass("risePrice"); 
                                $("#dowjon-p").addClass("risePrice"); 
                             } 
                         else {
                            if (item3 === 0){ 
                               $("#dowjon-p").addClass("flatPrice"); 
                              $("#dowjon-p").addClass("flatPrice"); 		
                            }
                            else {
                               $("#dowjon-p").addClass("fellPrice"); 
                              $("#dowjon-p").addClass("fellPrice"); 	
                            }
                         }
                 } 
                }) ; 
                //  Dowjon - Ending  
                //  Nasdaq - starting
                  $.each(itemData2[5],function(key3,item3){
                    if (key3 === '6') {
                         itemDataTemp = item3 ;
                       }
                    if (key3 === '200009') {
                    //  $("#nasdaq").html(item3 + '<BR>' + itemDataTemp );
                     }   
                    if (key3 === '11') {
                        $("#nasdaq-p").html(item3);                              	
                         if (item3> 0) 
                             {
                                $("#nasdaq-p").addClass("risePrice"); 
                                $("#nasdaq-p").addClass("risePrice"); 
                             } 
                         else {
                            if (item3 === 0){ 
                               $("#nasdaq-p").addClass("flatPrice"); 
                              $("#nasdaq-p").addClass("flatPrice"); 		
                            }
                            else {
                               $("#nasdaq-p").addClass("fellPrice"); 
                              $("#nasdaq-p").addClass("fellPrice"); 	
                            }
                         }
                     } 
                }) ; 
                //  Nasdaq - Ending               		              		
              }
             });               
          }
         });
        }); 
    }; 

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

 async function displayWPost() {
	   const post = await getPost(7777);
	   let elemId_price = "" , elemId_price_flag = 0;
	   const num = stockId+1 ;
	   let elemId_1="item-1" + num , elemId_2="item-2" + num , elemId_3="item-3" + num , elemId_4="item-4" + num , elemId_5="item-5" + num ;
	   if (post) {
			const quote_obj = post.data.quote ;
			for ( var n in quote_obj) {
				if ( n == "200009" ) document.getElementById(elemId_1).innerHTML =  quote_obj[n] ;
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
		if (firstVisit) sw_no=1;
		const oldChart=document.getElementById("realtimeChart");
		const oldcollapseBtn2=document.getElementById("collapseBtn2");
		const oldstopBtn=document.getElementById("stopBtn");
		const oldcollapseBtns=document.getElementById("collapseBtns");
		const oldhiddenMsg2=document.getElementById("hiddenMsg2");
		if (oldhiddenMsg2 && firstVisit) oldhiddenMsg2.style.display = "block" ;		
		if (oldChart && firstVisit) oldChart.outerHTML = "<canvas id='realtimeChart' width='320' height='200' style='display:block;'></canvas>" ;
		if  (oldcollapseBtn2 && firstVisit) {
			oldcollapseBtns.outerHTML = "<div id='collapseBtns' style='display:flex'><div id='collapseBtn2' style='justify-content:center;'><img src='collapse.png' style='cursor:pointer;' onclick='collapseElement2()' /></div>" +
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
				max_price=mid_price1*1.15 ;
				min_price=mid_price1*0.85 ;
				if (item_price1>900 && incdecPrice1>50) {
					max_price=mid_price1*1.18 ;
					min_price=mid_price1*0.82 ;
				}
				if (item_price1<70 && incdecPrice1>2.5) {
					max_price=mid_price1*1.12 ;
					min_price=mid_price1*0.9 ;
				}				
			//  midline_txt1= item_name1+'平盤：'+mid_price1.toString() ; 
				midline_txt1 = '平盤：'+ item_price1.toString() ;
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
				midline_txt2= mid_price2.toString() + '[' + incdecPrice2.toString() + ']'; 
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
					position: 'right',
					display:false
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
						  position: 'start',
						  font: {
							size: 8,
							weight: 200,  // Set 'lighter'
						  }
						  //position: 'start'
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
						  position: 'end',
						  font: {
								size: 8,
								weight: 200, 
						 }
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
					//	midline_txt1= item_name1+'平盤：'+mid_price1.toString() ; 
						midline_txt1 = '平盤：'+ item_price1.toString();						
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
					//	midline_txt2= item_name2+'平盤：'+mid_price2.toString() ; 
						midline_txt2 = item_price2.toString();				
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
	      mask_item2.outerHTML = "<div id='hiddenMsg2' style='display:block;'><div><canvas id='realtimeChart' width='320' height='200' style='display:none;'></canvas></div>" + 
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
	  
  async function startShow(sel_No) {
		if (sel_No == 1) stockId_list=JSON.parse(JSON.stringify(stockId_list1));
		if (sel_No == 2) stockId_list=JSON.parse(JSON.stringify(stockId_list2));
		if (sel_No == 3) stockId_list=JSON.parse(JSON.stringify(stockId_list3));
		if (sel_No == 4) stockId_list=JSON.parse(JSON.stringify(stockId_list4));
		if (sel_No == 5) stockId_list=JSON.parse(JSON.stringify(stockId_list5));
		if (sel_No == 6) stockId_list=JSON.parse(JSON.stringify(stockId_list6));
		if (sel_No == 7) stockId_list=JSON.parse(JSON.stringify(stockId_list7));
		if (sel_No == 8) stockId_list=JSON.parse(JSON.stringify(stockId_list8));
		if (sel_No == 9) stockId_list=JSON.parse(JSON.stringify(stockId_list9));
		if (sel_No == 10) stockId_list=JSON.parse(JSON.stringify(stockId_list10));
		if (sel_No == 11) stockId_list=JSON.parse(JSON.stringify(stockId_list11));
		await displayPost(9999);
		for (let i=0;i<stockId_list.length;i++) {
			await displayPost(i);
		}

	}  
	
// ── STATE ──────────────────────────────────────────────────────────────────
 const state = {
  main: { ...MAIN, open: MAIN.price, high: MAIN.price, low: MAIN.price, change: 0 },
  markets: MARKETS.map(m => ({ ...m, change: 0, spark: [] })),
  history: [27.0,26.95,26.9,26.9,26.9,26.9,26.95,26.9,26.9,26.9,26.9,26.95,26.9,26.95,26.95,26.95,26.9,26.9,26.9,26.9,26.95,26.9,26.9,26.9,26.9,26.9,26.9,26.95,26.9,26.9,26.95,26.9,26.95,26.95,26.9,26.9,26.95,26.95,26.95,26.95,26.95,26.95,26.95,26.9,26.95,26.95,26.95,26.95,26.95,26.95,26.95,26.95,26.95,26.9,26.95,26.95,26.9,26.9,26.95,26.9,26.9,26.9,26.9,26.85,26.9,26.9,26.9,26.85,26.9,26.9,26.85,26.9,26.85,26.85,26.8,26.85,26.85,26.8,26.85,26.85,26.85,26.85,26.85,26.9,26.9,26.9,26.9,26.9,26.85,26.9,26.9,26.95,26.95,26.95,26.9,26.9,26.95,26.95,26.9,26.9,26.95,26.9,26.95,26.95,26.9,26.95,26.95,26.95,26.9,26.9,26.9,26.9,26.9,26.9,26.9,26.9,26.9,26.9,26.9,26.85,26.9,26.9,26.9,26.9,26.85,26.9,26.9,26.9,26.95,26.9,26.95,26.9,26.95,27.0,27.0,26.95,26.95,27.0,27.0,26.95,26.95,27.0,27.0,26.95,26.95,26.95,26.9,26.9,26.95,26.95,26.95,26.9,26.95,26.95,26.9,26.9,26.95,26.95,26.95,26.95,26.95,26.95,26.95,26.95,26.9,26.95,26.95,27.0,27.0,27.05,27.05,27.05,27.1,27.05,27.05,27.1,27.1,27.05,27.1,27.1,27.05,27.05,27.1,27.1,27.1,27.1,27.1,27.1,27.15,27.1,27.05,27.1,27.1,27.15,27.2,27.2,27.2,27.15,27.15,27.1,27.15,27.15,27.2,27.15,27.15,27.15,27.15,27.15,27.15,27.1,27.1,27.1,27.1,27.1,27.1,27.1,27.05,27.1,27.05,27.0,27.0,27.0,26.95,26.95,27.0,27.0,27.05,27.05,26.9,26.9,26.95,26.9,26.95,26.95,26.95,27.0,27.0,27.05,27.1,27.05,27.1,27.05,27.1,27.15,27.15,27.15,27.1,27.15,27.15,27.2,27.25,27.15,27.1,27.1,27.1,27.1,27.1,27.2,27.1,27.1,27.05,27.1,27.05,27.0,27.0],
 };

// seed sparks
 state.markets.forEach(m => {
  m.spark = Array.from({ length: 20 }, () => m.price * (1 + (Math.random() - 0.5) * 0.02));
 });

// ── CHART ──────────────────────────────────────────────────────────────────
 const canvas = document.getElementById('mainChart');
 const ctx = canvas.getContext('2d');
 let animFrame;

 function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = 200 * dpr;
  canvas.style.height = '200px';
  ctx.scale(dpr, dpr);
  drawChart();
 }

 function drawChart() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  ctx.clearRect(0, 0, w, h);

  const data = state.history;
  if (data.length < 2) return;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pad = { top: 10, bottom: 24, left: 8, right: 8 };

  const xStep = (w - pad.left - pad.right) / (data.length - 1);
  const yScale = (h - pad.top - pad.bottom) / range;
  const pt = (i) => ({
    x: pad.left + i * xStep,
    y: pad.top + (max - data[i]) * yScale
  });

  const isGain = data[data.length - 1] >= data[0];
  const lineColor = isGain ? '#ff1744' : '#00e676';
  const fillColor = isGain ? 'rgba(255,23,68,' : 'rgba(0,230,118,';

  // Area fill
  const grad = ctx.createLinearGradient(0, pad.top, 0, h - pad.bottom);
  grad.addColorStop(0, fillColor + '0.18)');
  grad.addColorStop(1, fillColor + '0)');

  ctx.beginPath();
  ctx.moveTo(pt(0).x, h - pad.bottom);
  ctx.lineTo(pt(0).x, pt(0).y);
  for (let i = 1; i < data.length; i++) {
    const p0 = pt(i - 1), p1 = pt(i);
    const cx = ˙(p0.x + p1.x) / 2;
    ctx.bezierCurveTo(cx, p0.y, cx, p1.y, p1.x, p1.y);
  }
  ctx.lineTo(pt(data.length - 1).x, h - pad.bottom);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.fill();

  // Line
  ctx.beginPath();
  ctx.moveTo(pt(0).x, pt(0).y);
  for (let i = 1; i < data.length; i++) {
    const p0 = pt(i - 1), p1 = pt(i);
    const cx = (p0.x + p1.x) / 2;
    ctx.bezierCurveTo(cx, p0.y, cx, p1.y, p1.x, p1.y);
  }
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;					// 改曲線粗細 *********
  ctx.lineJoin    = 'round';
  ctx.lineCap     = 'round';
  ctx.shadowColor = lineColor;
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;

  // Last dot
  const last = pt(data.length - 1);
  ctx.beginPath();
  ctx.arc(last.x, last.y, 4, 0, Math.PI * 2);
  ctx.fillStyle = lineColor;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(last.x, last.y, 7, 0, Math.PI * 2);
  ctx.fillStyle = fillColor + '0.3)';
  ctx.fill();

  // Open price midline
  const openPrice = state.main.open;
  const clampedOpen = Math.min(Math.max(openPrice, min), max);
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
  ctx.fillText('開盤  $' + openPrice.toFixed(2), pad.left + 4, openY - 4);

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

// ── SPARKS ─────────────────────────────────────────────────────────────────
function drawSpark(svgEl, data, isGain) {
  const W = 60, H = 24;
  const min = Math.min(...data), max = Math.max(...data), rng = max - min || 1;
  const xStep = W / (data.length - 1);
  const pts = data.map((v, i) => `${i * xStep},${H - ((v - min) / rng) * (H - 2) - 1}`).join(' ');
  const color = isGain ? '#ff1744' : '#00e676';
  svgEl.innerHTML = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// ── RENDER ─────────────────────────────────────────────────────────────────
function renderMain() {
  const m = state.main;
  const isGain = m.change >= 0;

  const priceEl = document.getElementById('mainPrice');
  priceEl.textContent = '$' + m.price.toFixed(2);
  priceEl.classList.remove('price-tick');
  void priceEl.offsetWidth;
  priceEl.classList.add('price-tick');

  const changeBlock = document.getElementById('priceChange');
  changeBlock.className = 'price-change ' + (isGain ? 'gain' : 'loss');
  document.getElementById('changeVal').textContent = (isGain ? '+' : '') + m.change.toFixed(2);
  document.getElementById('changePct').textContent =
    '(' + (isGain ? '+' : '') + ((m.change / m.open) * 100).toFixed(2) + '%)';

  document.getElementById('statOpen').textContent = '$' + m.open.toFixed(2);
  document.getElementById('statHigh').textContent = '$' + m.high.toFixed(2);
  document.getElementById('statLow').textContent = '$' + m.low.toFixed(2);

  drawChart();
}

 async function graphcardRender() {
	  let itemName1,incdecPrice1,itemPrice1,incdectxtPrice1,itemName2,incdecPrice2,itemPrice2,incdectxtPrice2,itemName3,incdecPrice3,itemPrice3,incdectxtPrice3;
      let itemName4,incdecPrice4,itemPrice4,incdectxtPrice4,itemName5,incdecPrice5,itemPrice5,incdectxtPrice5;
	  let highPrice1,lowPrice1,highPrice2,lowPrice2,highPrice3,lowPrice3,highPrice4,lowPrice4,highPrice5,lowPrice5;
	  const post1 = await getData(2353);	  
	  if (post1) {	
			const wi_o=post1.data.o;
			const wi_h=post1.data.h;
			const wi_c=post1.data.c;
			const wi_t=post1.data.t;			
			const wi_cc=[...wi_c].reverse();
			const wi_tt=[...wi_t].reverse();
			const quote_obj = post1.data.quote ;
			for ( var n in quote_obj) {
			   if ( n == "200009" ) itemName1=quote_obj[n] ;
			   if ( n == "11" ) incdecPrice1=quote_obj[n] ;
			   if ( n == "12" ) highPrice1=quote_obj[n] ;
			   if ( n == "13" ) lowPrice1=quote_obj[n] ;
			   if ( n == "6" ) itemPrice1=quote_obj[n] ;
			}
		   if ( incdecPrice1>0 ) 
				incdectxtPrice1="+" + incdecPrice1.toString()
		   else incdectxtPrice1= incdecPrice1 ;
		   if ( incdecPrice1> 0) {
					document.getElementById('statClose1').classList.add('risePrice');
					document.getElementById('statChang1').classList.add('risePrice');
				} 
		   else {
				if ( incdecPrice1 === 0){ 
					document.getElementById('statClose1').classList.add('flatPrice');
					document.getElementById('statChang1').classList.add('flatPrice');
					}
				else {
					document.getElementById('statClose1').classList.add('fellPrice');
					document.getElementById('statChang1').classList.add('fellPrice');	
					}
		   }		   
		   document.getElementById('statName1').textContent = itemName1 ;
		   document.getElementById('statClose1').textContent = '$' + itemPrice1 ;
		   document.getElementById('statChang1').textContent = incdectxtPrice1 ;
		   document.getElementById('statHigh1').textContent = highPrice1 ;		   
		   document.getElementById('statLow1').textContent = lowPrice1 ;		   
		}
 }

function renderMarkets() {
  const list = document.getElementById('marketList');
  list.innerHTML = '';
  state.markets.forEach((m, idx) => {
    const isGain = m.change >= 0;
    const row = document.createElement('div');
    row.className = 'market-row';
    row.id = 'mrow-' + idx;

    const sparkEl = document.createElement('span');
    sparkEl.className = 'mini-spark';
    drawSpark(sparkEl, m.spark, isGain);

    row.innerHTML = `
      <div class="market-name-col">
        <div class="name">${m.sym}</div>
      </div>
      <div class="market-price-col" id="mprice-${idx}">$${m.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      <div class="market-change-col ${isGain ? 'gain-text' : 'loss-text'}" id="mchange-${idx}">
        ${isGain ? '+' : ''}${m.change.toFixed(2)}<br>
        <span style="font-size:0.62rem;opacity:0.7">${isGain ? '+' : ''}${((m.change / (m.price - m.change)) * 100).toFixed(2)}%</span>
      </div>
    `;

    const nameCol = row.querySelector('.market-name-col .name');
    const sparkWrap = document.createElement('span');
    sparkWrap.style.cssText = 'display:flex;align-items:center;gap:4px';
    sparkWrap.appendChild(sparkEl);
    const nameText = document.createElement('span');
    nameText.textContent = m.sym;
    sparkWrap.appendChild(nameText);
    row.querySelector('.market-name-col').firstElementChild.replaceWith(sparkWrap);

    list.appendChild(row);
  });
}

// ── UPDATE ─────────────────────────────────────────────────────────────────
function tick() {
  // Main stock update
  const volatility = 0.0012;
  const drift = (Math.random() - 0.499) * volatility;
  state.main.price = parseFloat((state.main.price * (1 + drift)).toFixed(2));
  state.main.change = parseFloat((state.main.price - state.main.open).toFixed(2));
  if (state.main.price > state.main.high) state.main.high = state.main.price;
  if (state.main.price < state.main.low) state.main.low = state.main.price;
  state.history.push(state.main.price);
  if (state.history.length > 120) state.history.shift();
  renderMain();

  // Market rows update
  state.markets.forEach((m, idx) => {
    const d = (Math.random() - 0.499) * 0.0015;
    m.price = parseFloat((m.price * (1 + d)).toFixed(2));
    m.change = parseFloat((m.change + m.price * d).toFixed(2));
    m.spark.push(m.price);
    if (m.spark.length > 20) m.spark.shift();

    const isGain = m.change >= 0;
    const priceEl = document.getElementById('mprice-' + idx);
    const changeEl = document.getElementById('mchange-' + idx);
    const rowEl = document.getElementById('mrow-' + idx);

    if (priceEl) {
      priceEl.textContent = '$' + m.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      priceEl.className = 'market-price-col';
    }
    if (changeEl) {
      changeEl.className = 'market-change-col ' + (isGain ? 'gain-text' : 'loss-text');
      changeEl.innerHTML = `${isGain ? '+' : ''}${m.change.toFixed(2)}<br>
        <span style="font-size:0.62rem;opacity:0.7">${isGain ? '+' : ''}${Math.abs((m.change / (m.price - m.change || 1)) * 100).toFixed(2)}%</span>`;
    }
    if (rowEl) {
      rowEl.classList.remove('flash-gain', 'flash-loss');
      void rowEl.offsetWidth;
      rowEl.classList.add(isGain ? 'flash-gain' : 'flash-loss');

      // Redraw spark
      const sparkEl = rowEl.querySelector('.mini-spark');
      if (sparkEl) drawSpark(sparkEl, m.spark, isGain);
    }
  });
}

// ── RANGE BUTTONS ──────────────────────────────────────────────────────────
document.querySelectorAll('.range-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ── INIT ───────────────────────────────────────────────────────────────────
// Seed open slightly below current price
state.main.open = parseFloat((MAIN.price * (1 - Math.random() * 0.01)).toFixed(2));
state.main.high = parseFloat((MAIN.price * (1 + Math.random() * 0.008)).toFixed(2));
state.main.low = parseFloat((MAIN.price * (1 - Math.random() * 0.008)).toFixed(2));
state.main.change = parseFloat((state.main.price - state.main.open).toFixed(2));

// Seed market changes
state.markets.forEach(m => {
  m.change = parseFloat(((Math.random() - 0.48) * m.price * 0.015).toFixed(2));
});

window.addEventListener('resize', resizeCanvas);
graphcardRender();
resizeCanvas();
renderMain();
renderMarkets();
setInterval(tick, 3000);