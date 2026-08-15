	const element1 = document.getElementById("myBar1");
	let show_YearRpt="" , show_SeasonRpt="" , show_MonthRpt="" , tr_line="" , itemYear_stockname="" ; 
    let width = 0 , intervalIds = [] , itemYear_arry1 = [] , itemYear_arry2 = [] , itemYear_arry3 = []  ;			  
    window.addEventListener('load',function(){
	  getWDATA();
	  element1.style.width = '0%';  
	  document.getElementById("s01").addEventListener("change", refreshTime); 			  
    });
                            
          function refreshTime() {
             switch ( $(this).val()) {
					  case "A": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise/index_a.htm' ;
							break;
					  case "B":
							window.location.href = 'https://perryjohnsonleon.github.io/exercise/index_b.htm'	;
							break;
					  case "C": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise/index_c.htm' ;
							break;
					  case "D": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise/index_d.htm' ;
							break;
					  case "E": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise/index_e.htm' ;
							break;
					  case "F": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise/index_f.htm' ;
							break;
					  case "Z": 
							window.location.href = 'https://perryjohnsonleon.github.io/exercise/index_z.htm' ;
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
                     
    function getDATA() {
        var d = new Date() , span_rpt="" ;
       //  $('#date1').html((d.getMonth()+1) + '/' + d.getDate() + '&nbsp;' + d.getHours() + ':'  + d.getMinutes());
         if (width === 100 ) {
        width = 0; 
             } else {  
              width += 7 ;
              if (width > 95) width = width-95 ; 
              element1.style.width = width + '%'; 
            } 
               
          $.getJSON('https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:1102:STOCK&quote=1',function(data){
              // console.log('success');
            $.each(data,function(key1,item1){
               if (key1 === 'data') {
               //  $('ul').append('<li>'+item1+'</li>');
              var itemData = item1 ;              
              $.each(itemData,function(key2,item2){
                if (key2  === 'quote' ) {
                    var itemData2 = item2;
                  // console.log(itemData2); 	
                    $.each(itemData2,function(key3,item3){  
                       if (key3 === '200009') {
                        $("#item-11").html("<span class='span_rpt'><button class='btn-expand' onclick='showElement(1102,false);'>" + item3 + "</button></span>"); 
                       }
                       if (key3 === '6') {
                        $("#item-12").html(item3);}
                       if (key3 === '11') {
                           if (item3> 0) 
                               {
                                  $("#item-12").addClass("risePrice"); 
                                  $("#item-13").addClass("risePrice"); 
                                // $("#item-13").html("???" +???item3); 	
                               } 
                           else {
                              if (item3 === 0){ 
                                 $("#item-12").addClass("flatPrice"); 
                                $("#item-13").addClass("flatPrice"); 		
                              }
                              else {
                                 $("#item-12").addClass("fellPrice"); 
                                $("#item-13").addClass("fellPrice"); 	
                              }
                           }
                           $("#item-13").html(item3); 
                       } 
                       if (key3 === '12') {
                            $("#item-14").html(item3); 
                       }
                       if (key3 === '13') {
                            $("#item-15").html(item3); 
                       } 
                  }) ;                 		
                }
               });
             //  console.log(item1[0]);
                 if ($("#item-14").html() >= $("#item-12").html() - $("#item-13").html())
                 {
                     $("#item-14").addClass("highestPrice");
                 }  
                 else {
                     $("#item-14").addClass("lowestPrice");
                 }
                 if ($("#item-15").html() >= $("#item-12").html() - $("#item-13").html())
                 {
                     $("#item-15").addClass("highestPrice");
                 }  
                 else {
                     $("#item-15").addClass("lowestPrice");
                 }                  
            }
           });
          }); 
          
          $.getJSON('https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:2353:STOCK&quote=1',function(data){
              // console.log('success');
            $.each(data,function(key1,item1){
               if (key1 === 'data') {
               //  $('ul').append('<li>'+item1+'</li>');
              var itemData = item1 ;         
              $.each(itemData,function(key2,item2){
                if (key2  === 'quote' ) {
                    var itemData2 = item2;
                  // console.log(itemData2); 	
                    $.each(itemData2,function(key3,item3){  
                       if (key3 === '200009') {
                        $("#item-21").html("<span class='span_rpt'><button class='btn-expand' onclick='showElement(2353,false);'>" + item3 + "</button></span>"); 
                       }
                       if (key3 === '6') {
                        $("#item-22").html(item3);}
                       if (key3 === '11') {
                           if (item3> 0) 
                               {
                                  $("#item-22").addClass("risePrice"); 
                                  $("#item-23").addClass("risePrice"); 
                               } 
                           else {
                              if (item3 === 0){ 
                                 $("#item-22").addClass("flatPrice"); 
                                 $("#item-23").addClass("flatPrice"); 		
                              }
                              else {
                                 $("#item-22").addClass("fellPrice"); 
                                 $("#item-23").addClass("fellPrice"); 	
                              }
                           }
                           $("#item-23").html(item3); 
                       } 
                       if (key3 === '22') {
                            $("#item-24").html(item3); 
                       }
                       if (key3 === '23') {
                            $("#item-25").html(item3); 
                       } 
                  }) ;                 		
                }
               });
                 if ($("#item-24").html() >= $("#item-22").html() - $("#item-23").html())
                 {
                     $("#item-24").addClass("highestPrice");
                 }  
                 else {
                     $("#item-24").addClass("lowestPrice");
                 }
                 if ($("#item-25").html() >= $("#item-22").html() - $("#item-23").html())
                 {
                     $("#item-25").addClass("highestPrice");
                 }  
                 else {
                     $("#item-25").addClass("lowestPrice");
                 }                  
            }
           });
          });              
        //  Weighed index  section   
           $.getJSON('https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN',function(data){
              // console.log('success');
            $.each(data,function(key11,item11){
               if (key11 === 'data') {
               //  $('ul').append('<li>'+item1+'</li>');                   	
              var itemData11 = item11; 	          
              $.each(itemData11,function(key21,item21){
                if (key21  === 'o' ){
                   $("#wi-o").html(item21 + 'O' ); 
                  }
                if (key21  === 'h' ){
                   $("#wi-h").html(item21 + 'H' ); 
                   }
                if (key21  === 'l' ){
                   $("#wi-l").html(item21 + 'L'); 
                   }
                if (key21  === 'c' ){
                   $("#wi-c").html(item21 + 'C' );                     	                   	 	
                }
                
                if (key21  === 'quote' ) {
                    var itemData21 = item21;
                   // console.log(itemData21); 	
                    $.each(itemData21,function(key31,item31){  
                       if (key31 === '200009') {
                       //		$("#wi-t").addClass("wi-t"); 
                        //   $("#wi-t").html(item31); 
                       }
                       if (key31 === '11') {
                           if (item31> 0) 
                               {
                                  $("#wi-d").addClass("wi-risePrice"); 
                               } 
                           else {
                              if (item31 === 0){ 
                                $("#wi-d").addClass("wi-flatPrice");                             	  	 		
                              }
                              else {

                                $("#wi-d").addClass("wi-fellPrice"); 	
                              }
                           }
                           $("#wi-d").html(item31); 
                       } 
                  }) ;                 		
                }
               });
             //  console.log(item1[0]);
                 if ($("#span24").html() >= $("#span22").html() - $("#span23").html())
                    {
                       $("#span24").addClass("highestPrice");
                    }  
                 else {
                     $("#span24").addClass("lowestPrice");
                    }
                 if ($("#span25").html() >= $("#span22").html() - $("#span23").html())
                    {
                     $("#span25").addClass("highestPrice");
                    }  
                 else {
                     $("#span25").addClass("lowestPrice");
                 }                  
            }
           });
          });    
        //  Ending Weighed index section   
         };  
         
     function getWDATA() {            	
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
         
// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ Begin
   function step11(stockNo,firstVisit) {
        return new Promise((resolve) => {
        setTimeout(() => {
			// Step1 URL Begin
			   $("#hiddenElement1").html("<span>Waitting data ...<span>"); 
				   var urlStr= "https://marketinfo.api.cnyes.com/mi/api/v1/financialIndicator/revenue/TWS:" + stockNo + ":STOCK?year=5&to=1572364800";
                $.getJSON(urlStr,function(data){
                  $.each(data,function(key1,item1){
                     if (key1 === 'data') {
                        var itemData = item1[0]; 							
                        $.each(itemData,function(key2,item2){
                    if (key2  === 'name' ) {
                             itemYear_stockname = item2 ;
                            }								
                    	   if (key2  === 'revenue' ) {
                            itemYear_arry12= item2 ;
                    		    var itemData2 = item2;
                    		    var itemDataTemp ;
                    		  $.each(itemData2,function(key3,item3){

                                 }) ; 
 		                         		              		
                    	}  //  ***************************************
                    	   if (key2  === 'revenueYOY' ) {
							   	          itemYear_arry13= item2;
                    		    var itemData2 = item2;
                    		    var itemDataTemp ;
                    		   // YOY - starting
                    		  $.each(itemData2,function(key3,item3){          
                                    /*            					     
                            $.each(itemDataTemp,function(i,val) {
                                         console.log ( i + val );
                                       });
                                     */
                            }) ; 
                    		    // YOY - Ending              		              		
                    	}  //  ***************************************						
                    	   if (key2  === 'time' ) {
							              itemYear_arry11= item2 ;		
                    	}  //  ***************************************							

                      });               
                  }
                 });
                });	
          // Step1 URL End	
           resolve("Step 1 結果");
        }, 500);
       });
   }

   function step12(stockNo,firstVisit) {
        return new Promise((resolve) => {
        setTimeout(() => {
       // Step2 URL Begin
       var urlStr= "https://marketinfo.api.cnyes.com/mi/api/v1/financialIndicator/eps/TWS:" + stockNo + ":STOCK?resolution=Q&acc=false&year=5&to=1573488000";
            $.getJSON(urlStr,function(data){
              $.each(data,function(key1,item1){
                if (key1 === 'data') {
                    //  $('ul').append('<li>'+item1+'</li>');
                    var itemData = item1[0]; 							
                    $.each(itemData,function(key2,item2){
                      if (key2  === 'name' ) {
                          itemYear_stockname = item2 ;
                        }								
                      if (key2  === 'epsYOY' ) {
                        itemYear_arry22= item2 ;
                        var itemData2 = item2;
                        var itemDataTemp ;
                       // YearRevenue - starting
                        $.each(itemData2,function(key3,item3){

                        }) ; 
                        // YearRevenue - Ending                                                  
                  }  //  ***************************************
                      if (key2  === 'eps' ) {
                          itemYear_arry23= item2;
                        var itemData2 = item2;
                        var itemDataTemp ;
                       // YOY - starting
                      $.each(itemData2,function(key3,item3){

                      }) ; 
                      // YOY - Ending              		              		
                  }  //  ***************************************						
                if (key2  === 'time' ) {
                        itemYear_arry21= item2 ;		
                  }  //  ***************************************							
                  });               
              }
             });
            });		
        // Step2 URL End   
       // ~~~~~~~ insert after
        resolve("Step 2 結果");
        }, 500);
      });
   }

   function step13(stockNo,firstVisit) {
        return new Promise((resolve) => {
        setTimeout(() => {
        tr_line ="",show_YearRpt="" ;
        var item2currency=0 ;
        for (let i = 0; i < itemYear_arry11.length; i++) {
            item2currency = (itemYear_arry12[i]/1000) + "" ;
            item2currency = item2currency.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
            tr_line = tr_line + '<tr><td>' + timestampToTime(itemYear_arry11[i]) + '</td><td>' + item2currency + '</td><td>' +　itemYear_arry13[i]　+'</td></tr>' ;
        } ;						 
		    show_YearRpt='<table width="33%" style="color: rgb(132, 141, 151); font-size: 14px; text-align: right;">' + '<thead><tr><td style="width:33%;color:#9c3579">[' + itemYear_stockname + ']月財報</td><td style="width:25%">營收(千元)</td><td style="width:33%">年增率</td></thead><tbody>' + tr_line  + '</tbody></table>'  ;
        // ~~~~~ insert before
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
        show_SeasonRpt='<table width="30%" style="color: rgb(132, 141, 151); font-size: 14px; text-align: right;">' + '<thead><tr><td style="width:40%;color:#9c3579">[' + itemYear_stockname + ']季財報</td><td style="width:40%">epsYOY(%)</td><td style="width:20%">EPS</td><td style="width:35%">累計EPS</td></thead><tbody>' + tr_line  + '</tbody></table>'  ;
        // ~~~~~ insert after
        resolve("Step 3 結果");
        }, 400);
    });
   }
   
   function step14(stockNo,firstVisit) {
        return new Promise((resolve) => {
        setTimeout(() => {
        if (firstVisit === undefined || firstVisit === null) {
			      $("#hiddenElement1").html("&nbsp;"); 
            $("#hiddenElement2").html("&nbsp;"); 
            $("#collapseBtn").html("&nbsp;");   
        }
        else {
            $("#hiddenElement1").html(show_YearRpt); 
            $("#hiddenElement2").html(show_SeasonRpt);  
            $("#collapseBtn").html("<img src='collapse.png' style='cursor:pointer;' onclick='collapseElement()' />");
        }   
          resolve("Step 4 結果");
        }, 10);
    });
   }
   
   function step15(stockNo) {
        return new Promise((resolve) => {
        setTimeout(() => {
        mask_item1.style.display = "block" ;
        resolve("Step 5 結果");
        },5);
    });
   }


   // 使用 then 來串接 Promise，依序執行
   // ==========================
   step11()
      .then(result11 => {
        return step12();        // 等 step2 完成後才進行下一步
       })
      .then(result12 => {
       return step13();        // 等 step3 完成後才進行下一步
       })
      .then(result13 => {
        return step14();
       })
	  .then(result14 => {
        return step15();		  
      })
    .then(result15 => {
        })
      .catch(error => {
        console.log("出現錯誤: ", error);
      });
	// ===使用 then == Ending========================== */
	  
    async function executeStepsSequentially(stockNo,firstVisit) {
      try {
         let result11 = await step11(stockNo,firstVisit);
       // console.log(result1); // Step 11 結果
         let result12 = await step12(stockNo,firstVisit);
       // console.log(result2); // Step 12 結果
         let result13 = await step13(stockNo,firstVisit);
       // console.log(result3); // Step 13 結果   
         let result14 = await step14(stockNo,firstVisit); 
       // console.log(result14); // Step 14 結果 
         let result15 = await step15(stockNo,firstVisit); 
       // console.log("所有步驟完成");
      } catch (error) {
         console.log("出現錯誤: ", error);
     }
    }
 
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ End
   function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;

	    return Y+M ;

    }

    function showElement(stockNo,firstVisit) {
          executeStepsSequentially(stockNo,firstVisit);      
    }
         
    function collapseElement() {
      mask_item1.style.display="none" ;
      }
