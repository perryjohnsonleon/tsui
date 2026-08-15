<canvas id="myChart"></canvas>

<!-- 載入 Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<!-- 載入 annotation plugin -->
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-annotation@3.0.1"></script>

<script>
const ctx = document.getElementById('myChart').getContext('2d');

// 漸層背景
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(54, 162, 235, 0.5)');
gradient.addColorStop(1, 'rgba(54, 162, 235, 0)');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['一月', '二月', '三月', '四月', '五月'],
    datasets: [
      {
        label: '2024 銷售',
        data: [10, 20, 15, 30, 25],
        borderColor: 'blue',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        backgroundColor: gradient,
        pointRadius: 6,
        pointHoverRadius: 10,
        pointBackgroundColor: 'white',
        pointBorderColor: 'blue',
        pointBorderWidth: 2
      },
      {
        label: '2025 銷售',
        data: [5, 15, 10, 20, 18],
        borderColor: 'green',
        borderWidth: 2,
        borderDash: [8, 4],
        tension: 0.3,
        fill: false,
        pointRadius: 7,
        pointStyle: 'triangle',
        pointBackgroundColor: 'green',
        pointBorderColor: 'white',
        pointBorderWidth: 2
      }
    ]
  },
  options: {
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
            yMin: 20,   // 中線 y 值
            yMax: 20,
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [6, 6],
            label: {
              display: true,
              content: '中線 y=20',
              color: 'red',
              position: 'end',
              backgroundColor: 'white'
            }
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: true }
    }
  }
});
</script>
