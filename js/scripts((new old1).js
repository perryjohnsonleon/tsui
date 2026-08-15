let stockId_list=['2330','1402','1102','2002','2027','1101'] ; // 台積電(2330), 東元(1504) 鴻海(2317) , 亞泥(1102) , 聯發科(2454), 大成鋼(2027) , 京元電(2449)  聯強(2347) , 台泥(1101) , 大同(2371) , 中鋼(2002)
const fetchUrl_str1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:" , fetchUrl_str2=":STOCK&quote=1" , 
  str_1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:" , str_3=":STOCK&quote=1" ;
const element1 = document.getElementById("myBar1");
		  const mask_item1 = document.getElementById("hiddenMsg1") , mask_item2 = document.getElementById("myChart") ;
      let itemYear_stockname="" , Stock_title="" , itemPrice_name = "" ,itemPrice_matrix="" ;
		  let width = 0 , intervalIds = [] , itemPrice_arry = [] , itemYear_arry11 = [] , itemYear_arry12 = [] , itemYear_arry13 = [] , itemYear_arry21 = [] , itemYear_arry22 = [] , itemYear_arry23 = [] ;
		  let str_2=stockId_list[5], ajaxURL= str_1 + str_2 + str_3 , s01_val="0" ; 				  
      window.addEventListener('load',function(){
	    // document.getElementById('hiddenElement').classList.add('displayElementYN');
      	let show_YearRpt="" , show_SeasonRpt="" , show_MonthRpt="" , tr_line="" ; 
		    mask_item1.style.display == "none" ;
      //  mask_item2.style.display == "none" ;
      getDATA();
      element1.style.width = '0%';  
      document.getElementById("s01").addEventListener("change", refreshTime); 
      document.getElementById("s02").addEventListener("change", optionSel); 			  
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
			
      function optionSel() {
			 s01_val=document.getElementById("s01").value ;
			 switch ( s01_val ) {
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
                      case "4": 
                      	   refSec = 20000 ;
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
                      case "8": 
                          refSec = 900000 ;
                           break;
                      case "9": 
                    	   refSec = 1200000 ;
                           break;
                      case "10": 
                   	      refSec = 1800000 ;
                          break;                                     
                      default:
                         return;
                    } 
					
                   str_2= $(this).val() ;
				   getDATA();
                 //  str_2=document.getElementById("s02").value ;
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
           	   var d = new Date() , span_rpt="" , fetchUrl_str="" ;
               $('#date1').html((d.getMonth()+1) + '/' + d.getDate() + '&nbsp;' + d.getHours() + ':'  + d.getMinutes());
               if (width === 100 ) {
				          width = 0; 
                   } else {
                    width += 7 ;
                   if (width > 95) width = width-95 ; 
                      element1.style.width = width + '%'; 
                   } 
                fetchUrl_str=fetchUrl_str1 + stockId_list[0] + fetchUrl_str2 ;	
                $.getJSON(fetchUrl_str,function(data){
                  $.each(data,function(key1,item1){
                     if (key1 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');
                    var itemData = item1 ;          
                    $.each(itemData,function(key2,item2){
                    	if (key2  === 'quote' ) {
                    		  var itemData2 = item2;	
                    		  $.each(itemData2,function(key3,item3){  
                             if (key3 === '200009') {
                 	           $("#span11").html("<button class='btn-expand' onclick='showElement(" + stockId_list[0] + ",false);'>" + item3 + "</button>"); 
                             }
                             if (key3 === '6') {
                           $("#span12").html("<button class='btn2-expand' onclick='displayPost(" + stockId_list[0] + ",false);'>" + item3 + "</button>"); 
                 	        //  $("#span12").html(item3);
                           }
                             if (key3 === '11') {
                             	  if (item3> 0) 
                             	      {
                             	       	$("#span12").addClass("risePrice"); 
                             	       	$("#span13").addClass("risePrice"); 
                             	       // $("#span13").html("???" +???item3); 	
                             	      } 
                             	  else {
                             	  	 if (item3 === 0){ 
                             	  	 	 $("#span12").addClass("flatPrice"); 
                             	       $("#span13").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#span12").addClass("fellPrice"); 
                             	       $("#span13").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             	  $("#span13").html(item3); 
                             } 
                             if (key3 === '12') {
                 	               $("#span14").html(item3); 
                             }
                             if (key3 === '13') {
                 	               $("#span15").html(item3); 
                             } 
                        }) ;                 		
                    	}
                     });
                       if ($("#span14").html() >= $("#span12").html() - $("#span13").html())
                       {
                       	  $("#span14").addClass("highestPrice");
                       }  
                       else {
                       	  $("#span14").addClass("lowestPrice");
                       }
                       if ($("#span15").html() >= $("#span12").html() - $("#span13").html())
                       {
                       	  $("#span15").addClass("highestPrice");
                       }  
                       else {
                       	  $("#span15").addClass("lowestPrice");
                       }                  
                  }
                 });
                });     
                     
              //  2nd stock section	
                fetchUrl_str=fetchUrl_str1 + stockId_list[1] + fetchUrl_str2 ;		  
                 $.getJSON(fetchUrl_str,function(data){
                  $.each(data,function(key11,item11){
                     if (key11 === 'data') {
                     var itemData = item11 ;
					 var itemData11 = item11; 	          
                    $.each(itemData11,function(key21,item21){
                    	if (key21  === 'quote' ) {
                    		  var itemData21 = item21;	
                    		  $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
								$("#span21").html("<button class='btn-expand' onclick='showElement(" + stockId_list[1] + ",false);'>" + item31 + "</button>"); 
                             }
                             if (key31 === '6') {
                 	              $("#span22").html("<button class='btn2-expand' onclick='displayPost(" + stockId_list[1] + ",false);'>" + item31 + "</button>"); 
                             }
                             if (key31 === '11') {
                             	  if (item31> 0) 
                             	      {
                             	       	$("#span22").addClass("risePrice"); 
                             	       	$("#span23").addClass("risePrice"); 
                             	      } 
                             	  else {
                             	  	 if (item31 === 0){ 
                             	  	 	  $("#span22").addClass("flatPrice"); 
                             	        $("#span23").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#span22").addClass("fellPrice"); 
                             	       $("#span23").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             	  $("#span23").html(item31); 
                             } 
                             if (key31 === '12') {
                 	               $("#span24").html(item31); 
                             }
                             if (key31 === '13') {
                 	               $("#span25").html(item31); 
                             } 
                        }) ;                 		
                    	}
                     });
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
            //  Ending 2nd stock section 
            //  3rd stock section 
                fetchUrl_str=fetchUrl_str1 + stockId_list[2] + fetchUrl_str2 ;	  
                 $.getJSON(fetchUrl_str,function(data){
                  $.each(data,function(key11,item11){
                     if (key11 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');                   	
                    var itemData11 = item11; 
                    $.each(itemData11,function(key21,item21){
                    	if (key21  === 'quote' ) {
                    		  var itemData21 = item21;
                    		 // console.log(itemData21); 	
                    		  $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
								$("#span31").html("<button class='btn-expand' onclick='showElement(" + stockId_list[2] + ",false);'>" + item31 + "</button>");                              }
                             if (key31 === '6') {
                 	              $("#span32").html("<button class='btn2-expand' onclick='displayPost(" + stockId_list[2] + ",false);'>" + item31 + "</button>"); 
                             }
                             if (key31 === '11') {
                             	  if (item31> 0) 
                             	      {
                             	       	$("#span32").addClass("risePrice"); 
                             	       	$("#span33").addClass("risePrice"); 
                             	       // $("#span13").html("???" +???item3); 	
                             	      } 
                             	  else {
                             	  	 if (item31 === 0){ 
                             	  	 	  $("#span32").addClass("flatPrice"); 
                             	        $("#span33").addClass("flatPrice"); 		
                             	  	 }
                             	  	 else {
                             	  	 	 $("#span32").addClass("fellPrice"); 
                             	       $("#span33").addClass("fellPrice"); 	
                             	  	 }
                             	  }
                             	  $("#span33").html(item31); 
                             } 
                             if (key31 === '12') {
                 	               $("#span34").html(item31); 
                             }
                             if (key31 === '13') {
                 	               $("#span35").html(item31); 
                             } 
                        }) ;                 		
                    	}
                     });
                       if ($("#span34").html() >= $("#span32").html() - $("#span33").html())
                          {
                       	    $("#span34").addClass("highestPrice");
                          }  
                       else {
                       	  $("#span34").addClass("lowestPrice");
                          }
                       if ($("#span35").html() >= $("#span32").html() - $("#span33").html())
                          {
                       	  $("#span35").addClass("highestPrice");
                          }  
                       else {
                       	  $("#span35").addClass("lowestPrice");
                       }                  
                  }
                 });
                });    
              //  Ending 3rd stock section 
            //  4th stock section 
            fetchUrl_str=fetchUrl_str1 + stockId_list[3] + fetchUrl_str2 ;	  
            $.getJSON(fetchUrl_str,function(data){
             $.each(data,function(key11,item11){
                if (key11 === 'data') {
                //  $('ul').append('<li>'+item1+'</li>');                   	
               var itemData11 = item11; 
               $.each(itemData11,function(key21,item21){
                 if (key21  === 'quote' ) {
                     var itemData21 = item21;
                    // console.log(itemData21); 	
                     $.each(itemData21,function(key31,item31){  
                        if (key31 === '200009') {
						   $("#span41").html("<button class='btn-expand' onclick='showElement(" + stockId_list[3] + ",false);'>" + item31 + "</button>");                         }
                        if (key31 === '6') {
                            $("#span42").html("<button class='btn2-expand' onclick='displayPost(" + stockId_list[3] + ",false);'>" + item31 + "</button>"); 
                        }
                        if (key31 === '11') {
                            if (item31> 0) 
                                {
                                   $("#span42").addClass("risePrice"); 
                                   $("#span43").addClass("risePrice"); 
                                 // $("#span13").html("???" +???item3); 	
                                } 
                            else {
                               if (item31 === 0){ 
                                  $("#span42").addClass("flatPrice"); 
                                  $("#span43").addClass("flatPrice"); 		
                               }
                               else {
                                  $("#span42").addClass("fellPrice"); 
                                  $("#span43").addClass("fellPrice"); 	
                               }
                            }
                            $("#span43").html(item31); 
                        } 
                        if (key31 === '12') {
                             $("#span44").html(item31); 
                        }
                        if (key31 === '13') {
                             $("#span45").html(item31); 
                        } 
                   }) ;                 		
                 }
                });
                  if ($("#span44").html() >= $("#span42").html() - $("#span43").html())
                     {
                        $("#span44").addClass("highestPrice");
                     }  
                  else {
                      $("#span44").addClass("lowestPrice");
                     }
                  if ($("#span45").html() >= $("#span42").html() - $("#span43").html())
                     {
                      $("#span45").addClass("highestPrice");
                     }  
                  else {
                      $("#span45").addClass("lowestPrice");
                  }                  
             }
            });
           });    
          //  Ending 4th stock section 
          //  5th stock section 
            fetchUrl_str=fetchUrl_str1 + stockId_list[4] + fetchUrl_str2 ;	  
            $.getJSON(fetchUrl_str,function(data){
             $.each(data,function(key11,item11){
                if (key11 === 'data') {
                //  $('ul').append('<li>'+item1+'</li>');                   	
               var itemData11 = item11; 
               $.each(itemData11,function(key21,item21){
                 if (key21  === 'quote' ) {
                     var itemData21 = item21;
                    // console.log(itemData21); 	
                     $.each(itemData21,function(key31,item31){  
                        if (key31 === '200009') {
							$("#span51").html("<button class='btn-expand' onclick='showElement(" + stockId_list[4] + ",false);'>" + item31 + "</button>");                         }
                        if (key31 === '6') {
                            $("#span52").html("<button class='btn2-expand' onclick='displayPost(" + stockId_list[4] + ",false);'>" + item31 + "</button>"); 
                        }
                        if (key31 === '11') {
                            if (item31> 0) 
                                {
                                   $("#span52").addClass("risePrice"); 
                                   $("#span53").addClass("risePrice"); 
                                 // $("#span13").html("???" +???item3); 	
                                } 
                            else {
                               if (item31 === 0){ 
                                  $("#span52").addClass("flatPrice"); 
                                  $("#span53").addClass("flatPrice"); 		
                               }
                               else {
                                  $("#span52").addClass("fellPrice"); 
                                  $("#span53").addClass("fellPrice"); 	
                               }
                            }
                            $("#span53").html(item31); 
                        } 
                        if (key31 === '12') {
                             $("#span54").html(item31); 
                        }
                        if (key31 === '13') {
                             $("#span55").html(item31); 
                        } 
                   }) ;                 		
                 }
                });
                  if ($("#span54").html() >= $("#span52").html() - $("#span53").html())
                     {
                        $("#span54").addClass("highestPrice");
                     }  
                  else {
                      $("#span54").addClass("lowestPrice");
                     }
                  if ($("#span55").html() >= $("#span52").html() - $("#span53").html())
                     {
                      $("#span55").addClass("highestPrice");
                     }  
                  else {
                      $("#span55").addClass("lowestPrice");
                  }                  
             }
            });
           });    
         //  Ending 5th stock section                                                    
          //  Option selected index  section
            if (str_2 !="0") {
              ajaxURL=str_1 + str_2 + str_3 ;	 
         $.getJSON(ajaxURL,function(data){
          $.each(data,function(key11,item11){
             if (key11 === 'data') {
               //  $('ul').append('<li>'+item1+'</li>');                   	
            var itemData11 = item11; 
            $.each(itemData11,function(key21,item21){
                if (key21  === 'quote' ) {
                      var itemData21 = item21;
                      $.each(itemData21,function(key31,item31){  
                     if (key31 === '200009') {
						   $("#op11").html("<button class='btn-expand' onclick='showElement(" + str_2 + ",false);'>" + item31 + "</button>");                      }
                     if (key31 === '6') {
                           $("#op12").html("<button class='btn2-expand' onclick='displayPost(" + str_2 + ",false);'>" + item31 + "</button>"); 
                     }
                     if (key31 === '11') {
                           if (item31> 0) 
                               {
                                    $("#op12").addClass("risePrice"); 
                                    $("#op13").addClass("risePrice"); 
                               } 
                           else {
                                if (item31 === 0){ 
                                    $("#op12").addClass("flatPrice"); 
                                 $("#op13").addClass("flatPrice"); 		
                                }
                                else {
                                 $("#op12").addClass("fellPrice"); 
                                $("#op13").addClass("fellPrice"); 	
                                }
                           }
                           $("#op13").html(item31); 
                     } 
                     if (key31 === '12') {
                            $("#op14").html(item31); 
                     }
                     if (key31 === '13') {
                            $("#op15").html(item31); 
                     } 
                }) ;                 		
                }
             });
               if ($("#op14").html() >= $("#op12").html() - $("#op13").html())
                  {
                       $("#op14").addClass("highestPrice");
                  }  
               else {
                     $("#op14").addClass("lowestPrice");
                  }
               if ($("#op15").html() >= $("#op12").html() - $("#op13").html())
                  {
                     $("op15").addClass("highestPrice");
                  }  
               else {
                     $("#op15").addClass("lowestPrice");
               }                  
          }
         });
        });  					
        }			
      //  Ending Option selected index section 
      //  Weighed index  section   
        $.getJSON('https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN',function(data){
        $.each(data,function(key11,item11){
            if (key11 === 'data') {
            //  $('ul').append('<li>'+item1+'</li>');                   	
          var itemData11 = item11; 	          
          $.each(itemData11,function(key21,item21){
            if (key21  === 'c' ){
                $("#wi-c").html(item21);                     	                   	 	
            }    
			if (key21  === 'h' ){
			   $("#wi-h").html(item21 + 'H' ); 
				}
			if (key21  === 'l' ){
			   $("#wi-l").html(item21 + 'L'); 
				}		
            if (key21  === 'quote' ) {
                var itemData21 = item21;
                // console.log(itemData21); 	
                $.each(itemData21,function(key31,item31){  
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

   // ******* Chart Steps Starting **********
   function step21(stockNo,firstVisit) {
        return new Promise((resolve) => {
        setTimeout(() => {
  //  revised 8/19 begining
	   $("#hiddenElement1").html("<span>Waitting data ...<span>");
	console.log(11111);   
	   var fetchUrl_str= "https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:1102:STOCK&quote=1";
             //    fetchUrl_str=fetchUrl_str1 + stockId_list[1] + fetchUrl_str2 ;		  
                 $.getJSON(fetchUrl_str,function(data){
                  $.each(data,function(key11,item11){
                     if (key11 === 'data') {
						 	console.log(22222);   
					 var itemData11 = item11; 	          
                    $.each(itemData11,function(key21,item21){
						if (key21  === 'c' ) {
							const itemPrice_arry = item21 ;
							itemPrice_matrix =[...itemPrice_arry].reverse() ;
							console.log(33333,itemPrice_matrix);   							
						}
                    	if (key21  === 'quote' ) {
                    		var itemData21 = item21;	
                    	   $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
								 itemPrice_name= item31 ;
								 console.log(44444,itemPrice_name); 
							 }
							}) ;                 		
                    	}
                      });                 
                  }
                 });
                });    
  //  revised 8/19 nding
        }, 500);
       }); 
   }

   function step22(stockNo,firstVisit) {
	return new Promise((resolve) => {
	setTimeout(() => {
	// begin drawing
	console.log(88888,xValues_matrix);
	console.log(99999,itemPrice_name);	
	const xValues_matrix= Array.from({ length: itemPrice_matrix.length }, (_, index) => index + 1);
	const xValues = xValues_matrix;
    let original = itemPrice_matrix ;
	let yValues = original.map(n => n );
    let points = yValues.map((y, i) => ({ x: xValues[i], y }));
    var graph=new Chart(document.getElementById('myChart'), {
      type: 'line',
      data: {
        datasets: [{
          label: itemPrice_name,
          data: points,
          borderColor: 'blue',
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          backgroundColor: 'rgba(0,0,255,0.2)',
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear', // 指定為數值型 x 軸
            title: { display: true, text: 'X 軸（數值）' },
          },
          y: {
            beginAtZero: false,
            title: { display: true, text: 'Y 軸（數值）' },
          }
        }
      }
    });
	   // End drawing
        }, 400);
    });
   }
   
   function step23(stockNo,firstVisit) {
        return new Promise((resolve) => {
        setTimeout(() => {
        myChart.style.display = "block" ;    
        resolve("Step 4 結果");
        }, 10);
    });
   }


   // ********* Chart Steps Ending *********
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
   // ==========================
   step21()
      .then(result21 => {
		console.log(5555) ;  
        return step22();        // 等 step2 完成後才進行下一步
       })
      .then(result22 => {
       return step23();        // 等 step3 完成後才進行下一步
       })
      .then(result23 => {
        })
      .catch(error => {
        console.log("出現錯誤: ", error);
      });
	// ===使用 then == Ending========================== */
	  
    async function executePriceStepsSequentially(stockNo,firstVisit) {
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

    async function executeChartStepsSequentially(stockNo,firstVisit) {
      try {
         let result11 = await step21(stockNo,firstVisit);
       // console.log(result1); // Step 11 結果
         let result12 = await step22(stockNo,firstVisit);
       // console.log(result2); // Step 12 結果
         let result13 = await step23(stockNo,firstVisit);
       // console.log(result3); // Step 13 結果   
      } catch (error) {
         console.log("出現錯誤: ", error);
     }
    }

 async function getPost(stockNo) {
  try {
	fetchUrl_str=fetchUrl_str1 + stockNo + fetchUrl_str2 ;
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
	
async function displayPost(stockNo,firstVisit) {
  const post = await getPost(stockNo);
  let itemPrice_name = "" ;
  let xValues_str="0";
  if (post) {
    const itemPrice_arry = post.data.c;
	const quote_obj = post.data.quote ;
	for ( var n in quote_obj) {
	   if ( n == "200009" ) itemPrice_name= quote_obj[n] ;
	}
	itemPrice_matrix =[...itemPrice_arry].reverse() ;	
	const xValues_matrix= Array.from({ length: itemPrice_matrix.length }, (_, index) => index + 1);
	const xValues = xValues_matrix;
    let original = itemPrice_matrix ;
	let yValues = original.map(n => n );
    let points = yValues.map((y, i) => ({ x: xValues[i], y }));
    var graph=new Chart(document.getElementById('myChart'), {
      type: 'line',
      data: {
        datasets: [{
          label: itemPrice_name,
          data: points,
          borderColor: 'blue',
          cubicInterpolationMode: 'monotone',
          tension: 0.4,
          backgroundColor: 'rgba(0,0,255,0.2)',
        }]
      },
      options: {
        scales: {
          x: {
            type: 'linear', // 指定為數值型 x 軸
            title: { display: true, text: 'X 軸（數值）' },
          },
          y: {
            beginAtZero: false,
            title: { display: true, text: 'Y 軸（數值）' },
          }
        }
      }
    });
   }
     mask_item2.style.display = "block" ;  
  }   
 
  // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ End
   function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;

	    return Y+M ;

    }

    function showElement(stockNo,firstVisit) {
          executePriceStepsSequentially(stockNo,firstVisit);      
    }

    function showChart(stockNo,firstVisit) {
		  executeChartStepsSequentially(stockNo,firstVisit)
      //  executeChartStepsSequentially(stockNo,firstVisit);   
    } 

    function showRealprice1(stockNo,firstVisit) {
         const xValues = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247];
          const original = [41.5,41.7,41.6,41.65,41.65,41.65,41.65,41.75,41.75,41.7,41.75,41.75,41.7,41.75,41.7,41.7,41.7,41.7,41.7,41.7,41.75,41.7,41.75,41.65,41.75,41.75,41.7,41.75,41.7,41.7,41.6,41.6,41.75,41.7,41.7,41.7,41.75,41.75,41.75,41.75,41.75,41.75,41.75,41.75,41.75,41.75,41.75,41.75,41.75,41.85,41.75,41.8,41.85,41.8,41.85,41.85,41.85,41.8,41.7,41.7,41.7,41.65,41.65,41.65,41.65,41.6,41.65,41.65,41.65,41.65,41.5,41.6,41.6,41.6,41.55,41.5,41.55,41.6,41.55,41.55,41.55,41.55,41.55,41.6,41.65,41.6,41.6,41.6,41.6,41.6,41.6,41.55,41.6,41.6,41.65,41.65,41.6,41.6,41.65,41.55,41.65,41.65,41.6,41.65,41.6,41.65,41.6,41.6,41.65,41.7,41.65,41.65,41.7,41.7,41.65,41.65,41.65,41.6,41.6,41.55,41.65,41.6,41.65,41.6,41.6,41.6,41.65,41.55,41.6,41.6,41.65,41.6,41.55,41.55,41.5,41.5,41.45,41.4,41.4,41.4,41.4,41.45,41.45,41.45,41.45,41.45,41.4,41.45,41.45,41.45,41.45,41.4,41.4,41.35,41.4,41.4,41.4,41.4,41.4,41.35,41.35,41.3,41.3,41.3,41.4,41.4,41.4,41.4,41.4,41.35,41.35,41.35,41.3,41.35,41.4,41.4,41.4,41.3,41.35,41.35,41.4,41.4,41.35,41.4,41.35,41.3,41.3,41.3,41.25,41.25,41.25,41.2,41.2,41.25,41.2,41.2,41.25,41.2,41.25,41.25,41.2,41.2,41.2,41.25,41.15,41.15,41.1,41.1,41.15,41.15,41.1,41.15,41.15,41.15,41.15,41.15,41.15,41.15,41.15,41.2,41.2,41.2,41.15,41.1,41.1,41.05,41.05,41.05,41.1,41.1,41.1,41.1,41.05,41.1,41.05,41.05,41.1,41.1,41.15,41.1,41.15,41.1,41.15,41.15,41.1,41.05,41.0,40.95,41.0] ;
          const yValues = original.map(n => n );
          // 轉成 { x, y } 物件陣列
          const points = yValues.map((y, i) => ({ x: xValues[i], y }));

          new Chart(document.getElementById('myChart'), {
            type: 'line',
            data: {
              datasets: [{
                label: Stock_title ,
                data: points,
                borderColor: 'blue',
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
                backgroundColor: 'rgba(0,0,255,0.2)',
              }]
            },
            options: {
              scales: {
                x: {
                  type: 'linear', // 指定為數值型 x 軸
                  title: { display: true, text:'股價' },
                },
                y: {
                  beginAtZero: false,
                  title: { display: true, text:'時間' },
                }
              }
            }
          });
     mask_item2.style.display = "block" ;    
       //   executeStepsSequentially(stockNo,firstVisit);      
    }
         
    function collapseElement() {
      mask_item1.style.display="none" ;
      }