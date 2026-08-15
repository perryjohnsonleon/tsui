const stockId_list=['2330','2382','2356','2317','3231','2324'] ; // 台積電(2330), 廣達2382) 英業達(2356) , 聯發科(2454), 緯創(3231) , 仁寶(2324)  鴻海(2317) 
const fetchUrl_str1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:" , fetchUrl_str2=":STOCK&quote=1"
const element1 = document.getElementById("myBar1");
		  const mask_item1 = document.getElementById("hiddenElement1");
		  const mask_item2 = document.getElementById("hiddenElement2");
		  const mask_item3 = document.getElementById("hiddenElement3");
		  let show_YearRpt="" , show_SeasonRpt="" , show_MonthRpt="" , tr_line="" , itemYear_stockname="" ; 
        let width = 0 , intervalIds = [] , itemYear_arry1 = [] , itemYear_arry2 = [] , itemYear_arry3 = []  ;
		  let str_1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:", 
			  str_2=stockId_list[5], 
			  str_3=":STOCK&quote=1" ,
			  ajaxURL= str_1 + str_2 + str_3 ,
			  s01_val="0" ; 				  
          window.addEventListener('load',function(){
	    // document.getElementById('hiddenElement').classList.add('displayElementYN');
		  if (mask_item1.style.display == "none" )
			  hiddenMsg1.style.display = "none" ; 
		  if (!mask_item1.style.displayElementYN ) { 
				mask_item1.style.display = 'none';
			   }
            else 
			{ 
		    }
      getDATA();
      getWDATA();
      element1.style.width = '0%';  
      document.getElementById("s01").addEventListener("change", refreshTime); 
      document.getElementById("s02").addEventListener("change", optionSel); 			  
      });
		                              
          function refreshTime() {
             switch ( $(this).val()) {
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
             //  console.log(refSec,"aaa");
               str_2=document.getElementById("s02").value ;
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
					          span_rpt="<span class='span_rpt'>(<button onclick='showElement1(1102);'>M</button>)</span><span class='span_rpt'>(<button onclick='showElement2(" + stockId_list[0] + ";'>S</button>)</span>" ; 	          
                    $.each(itemData,function(key2,item2){
                    	if (key2  === 'quote' ) {
                    		  var itemData2 = item2;	
                    		  $.each(itemData2,function(key3,item3){  
                             if (key3 === '200009') {
                 	           $("#span11").html(item3 + span_rpt); 
                             }
                             if (key3 === '6') {
                 	           $("#span12").html(item3);}
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
                    span_rpt="<span class='span_rpt'>(<button onclick='showElement1(2324);'>M</button>)</span><span class='span_rpt'>(<button onclick='showElement2(" + stockId_list[1] + ");'>S</button>)</span>" ; 	               	
                    var itemData11 = item11; 	          
                    $.each(itemData11,function(key21,item21){
                    	if (key21  === 'quote' ) {
                    		  var itemData21 = item21;	
                    		  $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
                 	              $("#span21").html(item31 + span_rpt); 
                             }
                             if (key31 === '6') {
                 	              $("#span22").html(item31); 
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
                    // console.log('success');
                  $.each(data,function(key11,item11){
                     if (key11 === 'data') {
                   	//  $('ul').append('<li>'+item1+'</li>');                   	
                    var itemData11 = item11; 
					          span_rpt="<span class='span_rpt'>(<button onclick='showElement1(1102);'>M</button>)</span><span class='span_rpt'>(<button onclick='showElement2(" +  stockId_list[2] + ");'>S</button>)</span>" ; 	 					
                    $.each(itemData11,function(key21,item21){
                    	if (key21  === 'quote' ) {
                    		  var itemData21 = item21;
                    		 // console.log(itemData21); 	
                    		  $.each(itemData21,function(key31,item31){  
                             if (key31 === '200009') {
                 	              $("#span31").html(item31 + span_rpt); 	
                             }
                             if (key31 === '6') {
                 	              $("#span32").html(item31); 
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
               // console.log('success');
             $.each(data,function(key11,item11){
                if (key11 === 'data') {
                //  $('ul').append('<li>'+item1+'</li>');                   	
               var itemData11 = item11; 
               span_rpt="<span class='span_rpt'>(<button onclick='showElement1(1102);'>M</button>)</span><span class='span_rpt'>(<button onclick='showElement2(" +  stockId_list[3] + ");'>S</button>)</span>" ; 	 					
               $.each(itemData11,function(key21,item21){
                 if (key21  === 'quote' ) {
                     var itemData21 = item21;
                    // console.log(itemData21); 	
                     $.each(itemData21,function(key31,item31){  
                        if (key31 === '200009') {
                            $("#span41").html(item31 + span_rpt); 	
                        }
                        if (key31 === '6') {
                            $("#span42").html(item31); 
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
               // console.log('success');
             $.each(data,function(key11,item11){
                if (key11 === 'data') {
                //  $('ul').append('<li>'+item1+'</li>');                   	
               var itemData11 = item11; 
               span_rpt="<span class='span_rpt'>(<button onclick='showElement1(1102);'>M</button>)</span><span class='span_rpt'>(<button onclick='showElement2(" +  stockId_list[4] + ");'>S</button>)</span>" ; 	 					
               $.each(itemData11,function(key21,item21){
                 if (key21  === 'quote' ) {
                     var itemData21 = item21;
                    // console.log(itemData21); 	
                     $.each(itemData21,function(key31,item31){  
                        if (key31 === '200009') {
                            $("#span51").html(item31 + span_rpt); 	
                        }
                        if (key31 === '6') {
                            $("#span52").html(item31); 
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
            // console.log('success');
          $.each(data,function(key11,item11){
             if (key11 === 'data') {
               //  $('ul').append('<li>'+item1+'</li>');                   	
            var itemData11 = item11; 
            // span_rpt="<span class='span_rpt'>(<button onclick='showElement1(3481);'>M</button>)</span><span class='span_rpt'>(<a href='showElement2(3481);'>S</a>)</span>" ; 	  										
            span_rpt="<span class='span_rpt'>(<button onclick='showElement1(" + str_2 + " );'>M</button>)</span><span class='span_rpt'>(<button onclick='showElement2(" + str_2 + " );'>S</button>)</span>" ; 	 
            $.each(itemData11,function(key21,item21){
                if (key21  === 'quote' ) {
                      var itemData21 = item21;
                      $.each(itemData21,function(key31,item31){  
                     if (key31 === '200009') {
                           $("#op11").html(item31 + span_rpt); 
                     }
                     if (key31 === '6') {
                           $("#op12").html(item31); 
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
          // console.log('success');
        $.each(data,function(key11,item11){
            if (key11 === 'data') {
            //  $('ul').append('<li>'+item1+'</li>');                   	
          var itemData11 = item11; 	          
          $.each(itemData11,function(key21,item21){
            if (key21  === 'c' ){
                $("#wi-c").html(item21);                     	                   	 	
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
   function step11(stockNo) {
        return new Promise((resolve) => {
        setTimeout(() => {
			// Step1 URL Begin
			   $("#hiddenMsg1").html("<span>Wait data ...<span>"); 
			   if (mask_item1.style.display == "none" )
				   hiddenMsg1.style.display = "block" ;
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
                            itemYear_arry2= item2 ;
                    		    var itemData2 = item2;
                    		    var itemDataTemp ;
                    		  $.each(itemData2,function(key3,item3){

                                 }) ; 
 		                         		              		
                    	}  //  ***************************************
                    	   if (key2  === 'revenueYOY' ) {
							   	          itemYear_arry3= item2;
                    		    var itemData2 = item2;
                    		    var itemDataTemp ;
                    		   // YOY - starting
                    		  $.each(itemData2,function(key3,item3){
								            // console.log(item3) ;             
                                    /*            					     
                            $.each(itemDataTemp,function(i,val) {
                                         console.log ( i + val );
                                       });
                                     */
                            }) ; 
                    		    // YOY - Ending              		              		
                    	}  //  ***************************************						
                    	   if (key2  === 'time' ) {
							              itemYear_arry1= item2 ;		
                    	}  //  ***************************************							

                      });               
                  }
                 });
                });		
           resolve("Step 1 結果");
        }, 700);
       });
   }

   function step12() {
        return new Promise((resolve) => {
        setTimeout(() => {		 
			 tr_line ="",show_YearRpt="" ;
			 var item2currency=0 ;
             for (let i = 0; i < itemYear_arry1.length; i++) {
				 item2currency = (itemYear_arry2[i]/1000) + "" ;
				 item2currency = item2currency.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
				 tr_line = tr_line + '<tr><td>' + timestampToTime(itemYear_arry1[i]) + '</td><td>' + item2currency + '</td><td>' +　itemYear_arry3[i]　+'</td></tr>' ;
			 } ;
           resolve("Step 2 結果");
        }, 500);
      });
   }

   function step13() {
        return new Promise((resolve) => {
        setTimeout(() => {						 
		    show_YearRpt='<table width="33%" style="color: rgb(132, 141, 151); font-size: 14px; text-align: right;">' + '<thead><tr><td style="width:33%">[' + itemYear_stockname + ']月財報</td><td style="width:25%">營收(千元)</td><td style="width:33%">年增率</td></thead><tbody>' + tr_line  + '</tbody></table>'  ;
         resolve("Step 3 結果");
        }, 250);
    });
   }
   
   function step14() {
        return new Promise((resolve) => {
        setTimeout(() => {
            $("#hiddenElement1").html(show_YearRpt); 
            if (mask_item1.style.display == "none" )
            {
            hiddenMsg1.style.display = "none" ; 
                    mask_item1.style.display = "block"  // Change display to block to make it visible
                  }
            else
                  mask_item1.style.display = "none" ;

            resolve("Step 4 結果");
        }, 10);
    });
   }

   function step21(stockNo) {
    return new Promise((resolve) => {
    setTimeout(() => {
  // Step1 URL Begin
     $("#hiddenMsg1").html("<span>Wait data ...<span>"); 
     if (mask_item1.style.display == "none" )
       hiddenMsg1.style.display = "block" ;
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
                        itemYear_arry2= item2 ;
                        var itemData2 = item2;
                        var itemDataTemp ;
                       // YearRevenue - starting
                        $.each(itemData2,function(key3,item3){

                        }) ; 
                        // YearRevenue - Ending                                                  
                  }  //  ***************************************
                      if (key2  === 'eps' ) {
                          itemYear_arry3= item2;
                      //  console.log (itemYear_arry3) ; // ●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●●
                        var itemData2 = item2;
                        var itemDataTemp ;
                       // YOY - starting
                      $.each(itemData2,function(key3,item3){

                      }) ; 
                      // YOY - Ending              		              		
                  }  //  ***************************************						
                if (key2  === 'time' ) {
                        itemYear_arry1= item2 ;		
                  }  //  ***************************************							
                  });               
              }
             });
            });		
  // Step1 URL End
       resolve("Step_1 結果");
    }, 700);
   });
}

function step22() {
    return new Promise((resolve) => {
    setTimeout(() => {		 
    tr_line ="",show_SeasonRpt="" ;
    var item2currency=0;
    var espEarning_digit=0; 
  //  var espYOY_arry = [...itemYear_arry2].reverse();
    var espDate_arry = [...itemYear_arry1].reverse();
    var espEarning_arry = [...itemYear_arry3].reverse(); 
    var accuEarning_arry = espEarning_arry ;
    var text,subStr,quarterDateStr,quarterDate_arry ;
    for (var i = 0; i < espDate_arry.length; i++) {
      espDate_arry[i]=timestampToTime(espDate_arry[i]) ;
      subStr =espDate_arry[i].substring(espDate_arry[i].indexOf("-")+1) ;
      // espEarning_digit=espEarning_arry[i];
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
    for (var i = 0; i < itemYear_arry1.length; i++) {
        item2currency = itemYear_arry2[i]  ;
        quarterDateStr=timestampToTime(itemYear_arry1[i]) ;
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
        tr_line = tr_line + '<tr><td><b>' +  quarterDate_arry[0] + quarterDate_arry[1] + '</b></td><td>' + item2currency + '</td><td>' +　itemYear_arry3[i]　+'</td><td>' +　accuEarning_arry[i]　+'</td></tr>' ;
   } ;
       console.log("Step_2 完成");
       resolve("Step_2 結果");
    }, 500);
  });
}

function step23() {
    return new Promise((resolve) => {
    setTimeout(() => {						 
    show_SeasonRpt='<table width="30%" style="color: rgb(132, 141, 151); font-size: 14px; text-align: right;">' + '<thead><tr><td style="width:40%;color:yellow">[' + itemYear_stockname + ']季財報</td><td style="width:40%">epsYOY(%)</td><td style="width:20%">EPS</td><td style="width:35%">累計EPS</td></thead><tbody>' + tr_line  + '</tbody></table>'  ;
    console.log("Step_3 完成");
     resolve("Step_3 結果");
    }, 250);
});
}

function step24() {
    return new Promise((resolve) => {
    setTimeout(() => {
        $("#hiddenElement1").html(show_SeasonRpt); 
  if (mask_item1.style.display == "none" )
     {
     hiddenMsg1.style.display = "none" ; 
             mask_item1.style.display = "block"  // Change display to block to make it visible
           }
  else
           mask_item1.style.display = "none" ;
     resolve("Step_4 結果");
    }, 10);
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
      })
      .catch(error => {
        console.log("出現錯誤: ", error);
      });
	// ===使用 then == Ending========================== */
	  
      async function executeStepsSequentially1(stockNo) {
      try {
         let result11 = await step11(stockNo);
       // console.log(result1); // Step 11 結果

         let result12 = await step12();
       // console.log(result2); // Step 12 結果

         let result13 = await step13();
       // console.log(result3); // Step 13 結果
       
         let result14 = await step14() ; 

       // console.log(result14); // Step 14 結果 

       // console.log("所有步驟完成");
      } catch (error) {
         console.log("出現錯誤: ", error);
     }
    }
    // executeStepsSequentially();


    async function executeStepsSequentially2(stockNo) {
      try {
         let result21 = await step21(stockNo);

         let result22 = await step22();


         let result23 = await step23();
       
         let result24 = await step24() ; 

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


	  function showElement1(stockNo) {
		 if  (mask_item1.style.display == "none" ) 
			  executeStepsSequentially1(stockNo); 
         else
      		  mask_item1.style.display = "none" ;
	    }		 


    function showElement2(stockNo) {
        if  (mask_item1.style.display == "none" ) 
           executeStepsSequentially2(stockNo); 
            else
               mask_item1.style.display = "none" ;
   
         }		  