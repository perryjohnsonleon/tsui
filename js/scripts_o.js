	const ctx = document.getElementById('realtimeChart').getContext('2d');
	// 初始數據
	let wi_c=0 , wi_h=0 ,wi_l=0 , wi_d=0 ,itemPrice_mid=0, itemPrice_weight=0 , itemPrice_height=0 ,incdecPrice=0 , repId=0 , running=false , label_title="" ; 
	const labels = [];
	const dataPoints = [];
	window.addEventListener('load',function(){
		startShow()	;
	}); 

 async function drawChart() {
	 try {
			let fetchUrl_str="https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN" ;
			const response = await fetch(fetchUrl_str);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			else {
				const post = await response.json(); // Convert response to JS object
				if (post) {
					const quote_obj = post.data.quote ;	
					for ( var n in quote_obj) {
						if ( n == "11" ) wi_d = quote_obj[n]  ;		
					}
					wi_c= post.data.c ;
					wi_h= post.data.h ;				
					wi_l= post.data.l ;
					itemPrice_mid=wi_c-wi_d ;
					itemPrice_mid=itemPrice_mid.toFixed(2);
					midline_txt='平盤:' + itemPrice_mid.toString()  ;
				}
				// *******
				  const chart = new Chart(ctx, {
				  type: 'line',
				  data: {
					labels: labels,
					datasets: [
					  {
						label:'大盤走勢',
						data: dataPoints,
						borderColor: '#00ff88',   // 螢光綠線
						borderWidth: 2,
						tension: 0.3,
						fill: false,
						pointRadius: 0,           // 隱藏點
						pointHoverRadius: 0
					  }
					]
				  },
				  options: {
					responsive: true,
					animation: false,             // 關閉動畫，加速更新
					plugins: {
					  legend: { display: false },
					  tooltip: {
						mode: 'index',
						intersect: false,
						backgroundColor: '#111',
						titleColor: '#00ff88',
						bodyColor: '#fff'
					  },
					  annotation: {
						annotations: {
						  midline: {
							type: 'line',
							yMin: itemPrice_mid,
							yMax: itemPrice_mid,
							borderColor: '#ff4444',
							borderWidth: 1.5,
							borderDash: [6, 6],
							label: {
							  display: true,
							  content: midline_txt ,
							  color: '#ff4444',
							  backgroundColor: '#000',
							  position: 'end'
							}
						  }
						}
					  }
					},
					scales: {
					  x: {
						grid: { display: false },
						ticks: { color: '#aaa' }
					  },
					  y: {
						grid: { color: '#333' },
						ticks: { color: '#aaa' }
					  }
					}
				  }
				});		
				return chart;				
				// ********
			}			
	  } catch (error) {
			console.error('Fetch error:', error);
	  }


  } 
	 
  async function getWholeweight(chart) {
	  const now = new Date();
	  const timeLabel = now.toLocaleTimeString('zh-TW', { hour12: false, timeStyle: 'medium' });
	  labels.push(timeLabel);
		try {
				let fetchUrl_str="https://ws.api.cnyes.com/ws/api/v1/charting/history?symbol=TWS:TSE01:INDEX&resolution=D&quote=1&from=NaN&to=NaN" ;
				const response = await fetch(fetchUrl_str);
				if (!response.ok) {
					throw new Error(`HTTP error!!!! status: ${response.status}`);
				}
				else {
					const post = await response.json(); // Convert response to JS object
					if (post) {
						wi_c=post.data.c ;
						wi_d=post.data.d ;
						const quote_obj = post.data.quote ;
						for ( var n in quote_obj) {
						   if ( n == "220027" ) incdecPrice= quote_obj[n] ;
						}
					}	
				}				
		  } catch (error) {
				console.error('Fetch error!!!!:', error);
			return null;
		  }
		dataPoints.push(wi_c);
		console.log(777,incdecPrice);
	    if (labels.length > 45) {
		   labels.shift();
		   dataPoints.shift();
		}
		// label_title = '大盤走勢:' + wi_c.toString() + '(' + wi_d.toString + ')';
		chart.update();
	}

/*   
 function startShow() {
		await getWholeweight() ;
	}  
*/

   function timestampToTime(timestamp) {
        var date = new Date(timestamp * 1000);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) ;

	    return Y+M ;

    }

	function collapseElement() {
		running= true ;
	//    clearInterval(repId);
   //   mask_item1.style.display="none" ;
      }  
	  
    async function startShow() {
		const chart = await drawChart();	
		setInterval(async () => {
		 if (running) return;
		 running=true;
		 await getWholeweight(chart);
		 running=false;		 
		},2200) ;	
	}