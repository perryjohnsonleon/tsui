	const element1 = document.getElementById("myBar1");
	let show_YearRpt="" , show_SeasonRpt="" , show_MonthRpt="" , tr_line="" , itemYear_stockname="" ; 
    let width = 0 , intervalIds = [] , itemYear_arry1 = [] , itemYear_arry2 = [] , itemYear_arry3 = []  ;			  
    window.addEventListener('load',function(){
	  getDATA();
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
              span_rpt="<span class='span_rpt'>(<button onclick='showElement(1102);'>M</button>)</span>" ; 	          
              $.each(itemData,function(key2,item2){
                if (key2  === 'quote' ) {
                    var itemData2 = item2;
                  // console.log(itemData2); 	
                    $.each(itemData2,function(key3,item3){  
                       if (key3 === '200009') {
                        $("#item-11").html(item3 + span_rpt); 
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
