	const element1 = document.getElementById("myBar1");
	const stockId_list=['2330','2887','2353','2356','1504','2371','2324','8150','2317','2002','2027','1402','1301','1102','1101','2347']
	let stockId=0 ;
	window.addEventListener('load',function(){
		startShow(); 	  
	}); 
 async function getPost(stockId) {
	  try {
		let fetchUrl_str1="https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:" , fetchUrl_str2=":STOCK&quote=1"   ;
		let fetchUrl_str=fetchUrl_str1 + stockId_list[stockId] + fetchUrl_str2 ;
		// console.log(fetchUrl_str);
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
	  const num = stockId+1 ;
	  let elemId_1="item-1" + num , elemId_2="item-2" + num , elemId_3="item-3" + num , elemId_4="item-4" + num , elemId_5="item-5" + num ;
	  console.log(elemId_2)	;  
	  if (post) {
		const quote_obj = post.data.quote ;
		for ( var n in quote_obj) {
		   if ( n == "200009" ) document.getElementById(elemId_1).innerHTML =  "<span class='span_rpt'>" + quote_obj[n] + "</span>" ;
		   if ( n == "6" ) document.getElementById(elemId_2).innerHTML =  "<span class='span_rpt'>" + quote_obj[n] + "</span>" ;
		   if ( n == "11" ) {
				  if ( quote_obj[n]> 0) {
						document.getElementById(elemId_2).classList.add('risePrice');
						document.getElementById(elemId_3).classList.add('risePrice');
					  } 
				 else {
					 if ( quote_obj[n] === 0){ 
						document.getElementById(elemId_2).classList.add('flatPrice');
						document.getElementById(elemId_3).classList.add('flatPrice');
						 }
					 else {
						document.getElementById(elemId_2).classList.add('fellPrice');
						document.getElementById(elemId_3).classList.add('fellPrice');	
						 }
				  }
			   document.getElementById(elemId_3).innerHTML =  "<span class='span_rpt'>" + quote_obj[n] + "</span>" ;
		  
		  }	   
		   if ( n == "12" ) document.getElementById(elemId_4).innerHTML =  "<span class='span_rpt'>" + quote_obj[n] + "</span>" ;
		   if ( n == "13" ) document.getElementById(elemId_5).innerHTML =  "<span class='span_rpt'>" + quote_obj[n] + "</span>" ;
		}
	  }
  }  

  async function startShow() {
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
	}  