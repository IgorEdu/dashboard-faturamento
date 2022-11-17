;(function () {
  if (typeof Object.defineProperty === 'function') {
    try {
      Object.defineProperty(Array.prototype, 'sortBy', { value: sb })
    } catch (e) {}
  }
  if (!Array.prototype.sortBy) Array.prototype.sortBy = sb

  function sb(f) {
    for (var i = this.length; i; ) {
      var o = this[--i]
      this[i] = [].concat(f.call(o, o, i), o)
    }
    this.sort(function (a, b) {
      for (var i = 0, len = a.length; i < len; ++i) {
        if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1
      }
      return 0
    })
    for (var i = this.length; i; ) {
      this[--i] = this[i][this[i].length - 1]
    }
    return this
  }
})()

Chart.defaults.font.size = 15
Chart.defaults.color = "#fff";
Chart.defaults.backgroundColor = 'rgba(54, 162, 235, 1)' ;
//Chart.defaults.borderColor = "#fff";

let metaGeral = 11300000
let metaEcommerce = 500000


export function createChart(topStates) {
      const rankState = topStates.map(name => name.ESTADO).slice(0, 10)
      const rankPerc = topStates
        .map(
          item =>
            (item.BRUTO * 100) /
            topStates.map(item => item.BRUTO).reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      // const rankLiq = topStates.map(item => item.LIQUIDO)
      const rankBru = topStates.map(item => item.BRUTO)
      const rankStates = { rankState, rankBru, rankPerc }

      const ctx = document.getElementById('myChart')
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rankStates.rankState,
          datasets: [
            {
              //label: 'Top 10 valor por estado',
              data: rankStates.rankPerc,
              borderColor: [
                'rgba(54, 162, 235, 0.5)' 
              ],
              borderWidth: 1
            }
          ]
        },
        plugins: [ChartDataLabels],
        options: {
          maintainAspectRatio: false,
          responsive: true,
          indexAxis: 'y',
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Participação mensal por estado',
              font:{
                size: 20
              },
              padding: {
                top: 10,
                bottom: 30
              }
            },
            legend: {
              display: false
            },
            datalabels: {
              anchor: 'end',
              align: 'left',
              formatter: (value, ctx) => {
                let percentage = value.toFixed(2) + '%'
                return percentage
              },
              //formatter: Math.round,
              font: {
                weight: 'bold'
              }
            }
          }
        }
      })
  return { myChart }
}

export function updateChart(myChart, topStates) {
      const rankState = topStates.map(name => name.ESTADO).slice(0, 10)
      // const rankLiq = topStates.map(item => item.LIQUIDO)
      const rankBru = topStates.map(item => item.BRUTO)
      const rankPerc = topStates
        .map(
          item =>
            (item.BRUTO * 100) /
            topStates
              .map(item => item.BRUTO)
              .reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      const rankStates = { rankState, rankBru, rankPerc }

      myChart.data.datasets[0].data = rankPerc
      myChart.labels = rankState
      myChart.update()
}

export function createChart2(topVendors) {
      // const rankCodVend = top.map(item => item.CODIGO_FORNECEDOR).slice(0, 10)
      const rankNameVend = topVendors
        .map(item => item.RASSOCFOR.slice(0, 12))
        .slice(0, 10)
      // const rankLiq = topVendors.map(item => item.LIQUIDO)
      const rankBru = topVendors.map(item => item.BRUTO)
      const rankPerc = topVendors
        .map(
          item =>
            (item.BRUTO * 100) /
            topVendors.map(item => item.BRUTO).reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      const rankVendors = { rankNameVend, rankBru, rankPerc }

      const ctx = document.getElementById('myChart2')
      const myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rankVendors.rankNameVend,
          datasets: [
            {
              label: 'Top 10 valor por representante',
              data: rankVendors.rankPerc,
              borderColor: [
                'rgba(54, 162, 235, 0.5)'
              ],
              borderWidth: 1
            }
          ]
        },
        plugins: [ChartDataLabels],
        options: {
          maintainAspectRatio: false,
          responsive: true,
          indexAxis: 'y',
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Participação mensal por representante',
              font:{
                size: 20
              },
              padding: {
                top: 10,
                bottom: 30
              }
            },
            legend: {
              display: false
            },
            datalabels: {
              anchor: 'end',
              align: 'left',
              clamp: true,
              formatter: (value, ctx) => {
                let percentage = value.toFixed(2) + '%'
                return percentage
              },
              //formatter: Math.round,
              font: {
                weight: 'bold'
              }
            }
          }
        }
      })
  return { myChart2 }
}

export function updateChart2(myChart2, topVendors) {
      // const rankCodVend = top
        // .map(item => item.CODIGO_FORNECEDOR)
        // .slice(0, 10)
      const rankNameVend = topVendors
        .map(item => item.RASSOCFOR.slice(0, 12))
        .slice(0, 10)
      // const rankLiq = topVendors.map(item => item.LIQUIDO)
      const rankBru = topVendors.map(item => item.BRUTO)
      const rankPerc = topVendors
        .map(
          item =>
            (item.BRUTO * 100) /
            topVendors
              .map(item => item.BRUTO)
              .reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      const rankVendors = { rankNameVend, rankBru, rankPerc }

      myChart2.data.datasets[0].data = rankPerc
      myChart2.labels = rankNameVend
      myChart2.update()
}

export function createChart3(topClients) {
  // console.log(topClients.map(name => name.RASSOC.substring(0,12)).slice(0,10))
      const rankName = topClients.map(name => name.RASSOC.substring(0,12)).slice(0,10)
      // const rankLiq = topClients.map(item => item.LIQUIDO)
      const rankBru = topClients.map(item => item.BRUTO)
      const rankPerc = topClients
        .map(
          item =>
            (item.BRUTO * 100) /
            topClients.map(item => item.BRUTO).reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      const rank = { rankName, rankBru, rankPerc }

      const ctx = document.getElementById('myChart3')
      const myChart3 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rank.rankName,
          datasets: [
            {
              label: 'Top 10 liquidez por cliente',
              data: rank.rankPerc,
              borderColor: [
                'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
            }
          ]
        },
        plugins: [ChartDataLabels],
        options: {
          maintainAspectRatio: false,
          responsive: true,
          indexAxis: 'y',
          scales: {
            x: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Participação mensal por cliente',
              font:{
                size: 20
              },
              padding: {
                top: 10,
                bottom: 30
              }
            },
            legend: {
              display: false
            },
            datalabels: {
              anchor: 'end',
              align: 'left',
              formatter: (value, ctx) => {
                let percentage = value.toFixed(2) + '%'
                return percentage
              },
              //formatter: Math.round,
              font: {
                weight: 'bold'
              }
            }
          }
        }
      })
  return{ myChart3 }
}

export function updateChart3(myChart3, topClients) {
      const rankName = topClients
        .map(name => name.RASSOC.slice(0, 12))
        .slice(0, 10)
      // const rankLiq = topClients.map(item => item.LIQUIDO)
      const rankBru = topClients.map(item => item.BRUTO)
      const rankPerc = topClients
        .map(
          item =>
            (item.BRUTO * 100) /
            topClients
              .map(item => item.BRUTO)
              .reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      const rank = { rankName, rankBru, rankPerc }

      myChart3.data.datasets[0].data = rankPerc
      myChart3.labels = rankName
      myChart3.update()
}

export function createChart4(topProducts) {
      const rankCod = topProducts.map(item => item.PRODUTO).slice(0, 10)
      // const rankDesc = topProducts.map(item => item.DESCRI)
      // const rankLiq = topProducts.map(item => item.LIQUIDO)
      const rankBru = topProducts.map(item => item.BRUTO)
      const rankPerc = topProducts
        .map(
          item =>
            (item.BRUTO * 100) /
            topProducts.map(item => item.BRUTO).reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      
      const rankProducts = { rankCod, rankBru, rankPerc }

      const ctx = document.getElementById('myChart4')
      const myChart4 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rankProducts.rankCod,
          datasets: [
            {
              label: 'Top 10 valor bruto por produtos',
              data: rankProducts.rankPerc,
              borderColor: [
                'rgba(54, 162, 235, 1)' 
              ],
              borderWidth: 1
            }
          ]
        },
        plugins: [ChartDataLabels],
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            title: {
              display: true,
              text: 'Participação mensal por produto',
              font:{
                size: 20
              },
              padding: {
                top: 10,
                bottom: 30
              }
            },
            legend: {
              display: false
            },
            datalabels: {
              formatter: (value, ctx) => {
                let percentage = value.toFixed(2) + '%'
                return percentage
              },
              anchor: 'end',
              align: 'top',
              //formatter: Math.round,
              font: {
                weight: 'bold'
              }
            }
          }
        }
      })
  return { myChart4 }
}

export function updateChart4(myChart4, topProducts) {

      const rankCod = topProducts.map(item => item.PECA).slice(0, 10)
      // const rankDesc = topProducts.map(item => item.DESCRI)
      // const rankLiq = topProducts.map(item => item.LIQUIDO)
      const rankBru = topProducts.map(item => item.BRUTO)
      const rankPerc = topProducts
        .map(
          item =>
            (item.BRUTO * 100) /
            topProducts
              .map(item => item.BRUTO)
              .reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      const rankProducts = { rankCod, rankBru, rankPerc }

      myChart4.data.datasets[0].data = rankPerc
      myChart4.labels = rankCod
      myChart4.update()
}

export function createProgressChart(sumAll) {
      const ctx = document.getElementById('progressChart')
      const progressChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: 'Top 10 valor bruto por produtos',
              data: [
                (sumAll * 100) / metaGeral,
                100 - (sumAll * 100) / metaGeral
              ],
              backgroundColor: ['rgba(54, 162, 235, 0.6)', 'lightgrey'],
              borderColor: ['rgba(54, 162, 235, 0)'],
              borderWidth: 2,
              cutout: '65%'
            }
          ]
        },
        plugins: [
          ChartDataLabels,
          //incluindo legenda dentro do gráfico
          {
            afterDatasetDraw(chart, args, options) {
              const {
                ctx,
                config,
                data,
                chartArea: { top, bottom, left, right, width, height }
              } = chart
              ctx.save()
              const dataTotal = data.datasets[0].data[0]
              const cx = width / 2
              const cy = chart._metasets[0].data[0].y
              ctx.font = '5.5vh Helvetica'
              /*ctx.fillStyle = '#444'*/
              ctx.fillStyle = 'white'
              ctx.fillText(dataTotal.toFixed(2) + '%', cx + 15, cy)
              ctx.textAlign = 'center'
            }
          }
        ],
        options: {
          maintainAspectRatio: false,
          responsive: true,
          layout: {
            padding: 15
          },
          plugins: {
            title: {
              display: true,
              color: 'white',
              font: {
                size: 20
              },
              text: ['Progresso mensal', 'Geral'],
              padding: {
                top: 10,
                bottom: 30
              }
            },
            datalabels: {
              display: false
            }
          }
        }
      })
  return{ progressChart }
}

export function updateProgressChart(progressChart, sumAll) {
  // console.log(sumAll)
      progressChart.data.datasets[0].data[0] = (sumAll * 100) / metaGeral
      // progressChart.plugins[0] = 
      // ChartDataLabels,
      // //incluindo legenda dentro do gráfico
      // {
      //   afterDatasetDraw(chart, args, options) {
      //     const {
      //       ctx,
      //       config,
      //       data,
      //       chartArea: { top, bottom, left, right, width, height }
      //     } = chart
      //     ctx.save()
      //     const dataTotal = data.datasets[0].data[0]
      //     const cx = width / 2
      //     const cy = chart._metasets[0].data[0].y
      //     ctx.font = '1.88em Helvetica'
      //     /*ctx.fillStyle = '#444'*/
      //     ctx.fillStyle = 'white'
      //     ctx.fillText(dataTotal.toFixed(2) + '%', cx + 15, cy)
      //     ctx.textAlign = 'center'
      //   }
      // }
      progressChart.update()
}

export function createProgressChart2(sumEcommerce) {
      const ctx = document.getElementById('progressChart2')
      const progressChart2 = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: 'Top 10 valor bruto por produtos',
              data: [
                (sumEcommerce * 100) / metaEcommerce,
                100 - (sumEcommerce * 100) / metaEcommerce
              ],
              backgroundColor: ['rgba(54, 162, 235, 0.6)', 'lightgrey'],
              borderColor: ['rgba(54, 162, 235, 0)'],
              borderWidth: 2,
              cutout: '65%'
            }
          ]
        },
        plugins: [
          ChartDataLabels,
          //incluindo legenda dentro do gráfico
          {
            afterDatasetDraw(chart, args, options) {
              const {
                ctx,
                config,
                data,
                chartArea: { top, bottom, left, right, width, height }
              } = chart
              ctx.save()
              const dataTotal = data.datasets[0].data[0]
              const cx = width / 2
              const cy = chart._metasets[0].data[0].y
              ctx.font = '5.5vh Helvetica'
              /*ctx.fillStyle = '#444'*/
              ctx.fillStyle = 'white'
              ctx.fillText(dataTotal.toFixed(2) + '%', cx + 15, cy)
              ctx.textAlign = 'center'
            }
          }
        ],
        options: {
          maintainAspectRatio: false,
          responsive: true,
          layout: {
            padding: 15
          },
          plugins: {
            title: {
              display: true,
              text: ['Progresso mensal', 'e-commerce'],
              color: 'white',
              font:{
                size: 20
              },
              padding: {
                top: 10,
                bottom: 30
              }
            },
            datalabels: {
              display: false
            }
          }
        }
      })
  return{ progressChart2 }
}

export function updateProgressChart2(progressChart2, sumEcommerce) {
      progressChart2.data.datasets[0].data[0] =
        (sumEcommerce * 100) / metaEcommerce
        
      progressChart2.update()
}

/*
async function createTimeSeries() {
  const url_year = ipApi+'/annual-progress'
  fetch(url_year)
    .then(res => {
      const general_year = res.json()
      return general_year
    })
    .then(general => {
      const typeOrder = general.filter(item => item.TIPO_CFOP === 'Venda')

      var result = []
      typeOrder
        .sortBy(function (o) {
          return new Date(o.DT_FATURADO)
        })
        .filter(function (i) {
          var hasElement = false
          var j
          for (j = 0; j < result.length; j++) {
            i.DT_FATURADO = i.DT_FATURADO.substring(0, 10)
            if (result[j].DT_FATURADO === i.DT_FATURADO) {
              hasElement = true
              break
            }
          }
          if (hasElement) {
            result[j].BRUTO += i.BRUTO
          } else {
            result.push(i)
          }
        })

      const ctx = document.getElementById('timeSeries1').getContext('2d')
      const timeSeries = new Chart(ctx, {
        type: 'line',
        data: {
          labels: result.map(item => item.DT_FATURADO),
          datasets: [
            {
              label: 'Faturamento anual',
              data: result.map(item => item.BRUTO),
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor: 'rgb(75, 192, 192)',
              tension: 0,
              pointRadius: 0
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: 'Faturamento anual',
              padding: {
                top: 10,
                bottom: 30
              }
            },
            legend: {
              display: false
            }
          },
          scales: {
            x: {
              type: 'timeseries'
            }
          }
        }
      })
    })
}
*/