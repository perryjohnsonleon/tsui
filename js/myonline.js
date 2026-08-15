	const stockId_list=['2330','1102','1101','2356','2454','1402','2324','8150','2317','2002','2027','2303','2308','2887','2353','2347','2449','5410','3706','1301','2371','1504','0050','0056'] ;		
	const ctx = document.getElementById('realtimeChart').getContext('2d');
	// 初始數據
	let labels = [] , dataPoints = [] , intervalIds = [] ;
	async function getData() {
		  const response = await fetch("https://ws.api.cnyes.com/ws/api/v1/charting/history?resolution=1&symbol=TWS:1102:STOCK&quote=1");
		  if  (!response.ok) {
			  throw new Error(`HTTP error!!!! status: ${response.status}`);
			}
		  else {
			  const result = await response.json();
			  return result; 
		  }
	 }

	function collapseElement() {
		while(intervalIds.length){
		  clearInterval(intervalIds.pop());
		}
    }
	
	async function main() {
		  let mymatrix, wi_c , wi_cc , wi_t , wi_tt, midline_txt , item_price , mid_price=0 , min_price=0 , max_price=0 , labels , dataPoints , title="" , point_no=0 ;
		  const post = await getData();  
		  if (post) {
				wi_c=post.data.c ;
				wi_d=post.data.d ;
				wi_t=post.data.t ;
				wi_cc=[...wi_c].reverse() ;
				wi_tt=[...wi_t].reverse() ;
				dataPoints=[...wi_cc] ;
				for (i=0;i< wi_tt.length ;i++) {
					let date = new Date(wi_tt[i] * 1000);
					let time = date.toLocaleTimeString('zh-CN', {hour12: false,});
					wi_tt[i]=time;
				}
				labels=[...wi_tt];
				const quote_obj = post.data.quote ;
				for ( var n in quote_obj) {
				   if ( n == "6" ) item_price = quote_obj[n] ;
				   if ( n == "11" ) incdecPrice= quote_obj[n] ;
				}
				mid_price=item_price-incdecPrice;
				midline_txt= '中線 y=' + mid_price.toString() + '【' + wi_tt[wi_tt.length-1] + '】' ;  
			}
			const chart = new Chart(ctx, {
				  type: 'line',
				  data: {
					labels: labels,
					datasets: [
					  {
						label: title,
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
							yMin: mid_price,
							yMax: mid_price,
							borderColor: '#ff4444',
							borderWidth: 1.5,
							borderDash: [6, 6],
							label: {
							  display: true,
							  content: midline_txt,			// '中線 y=38'
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
			chart.update();	
		  // 接續執行任務
		  let running=false , count=0;
		  id=setInterval(async() => {
				// let mymatrix, wi_c , wi_t , wi_tt, midline_txt , mid_price=0 ,labels , dataPoints , title="" , point_no=0 ;
				if (running) return;
				running=true;
				const post =await getData() ;
				if (post) {
					wi_c=post.data.c ;
					wi_d=post.data.d ;
					wi_t=post.data.t ;
					wi_cc=[...wi_c].reverse() ;
					wi_tt=[...wi_t].reverse() ;
					dataPoints=[...wi_cc] ;
					for (i=0;i< wi_tt.length ;i++) {
						let date = new Date(wi_tt[i] * 1000);
						let time = date.toLocaleTimeString('zh-CN', {hour12: false,});
						wi_tt[i]=time;
					}
					labels=[...wi_tt];
					const quote_obj = post.data.quote ;
					for ( var n in quote_obj) {
					   if ( n == "6" ) mid_price = quote_obj[n] ;
					   if ( n == "11" ) incdecPrice= quote_obj[n] ;
					}
					mid_price=item_price-incdecPrice;					
					// midline_txt= '中線 y=' + mid_price.toString() + '【' + wi_tt[wi_tt.length-1] + '】' ;  
				}
				chart.update();				
				count++ ;
				console.log("計次迴圈:",count);
				running=false ;
			},3000);
		 intervalIds.push(id); 
		  // doNextTask(data);
	}
	main();