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

let metaGeral = 80000
let metaEcommerce = 400000
let timeOut = 60000 * 30

async function createChart() {
  const url = 'http://127.0.0.1:5000/api/top-states'
  fetch(url)
    .then(res => {
      const top = res.json()
      return top
    })
    .then(top => {
      const rankState = top.map(name => name.ESTADO).slice(0, 10)
      const rankPerc = top
        .map(
          item =>
            (item.LIQUIDO * 100) /
            top.map(item => item.LIQUIDO).reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      const rankLiq = top.map(item => item.LIQUIDO)
      const rankBru = top.map(item => item.BRUTO)
      const rankStates = { rankState, rankLiq, rankBru, rankPerc }

      const ctx = document.getElementById('myChart')
      const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rankStates.rankState,
          datasets: [
            {
              //label: 'Top 10 valor por estado',
              data: rankStates.rankPerc,
              backgroundColor: [
                //'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)' /*,
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'*/
              ],
              borderColor: [
                //'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)' /*,
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'*/
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
              text: 'Participação mensal por estado',
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
              align: 'top',
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
      document.getElementById('time-update').innerHTML =
        'Última atualização: ' + Date()
      setInterval(async function updateChart() {
        fetch(url)
          .then(res => {
            const top = res.json()
            return top
          })
          .then(top => {
            const rankState = top.map(name => name.ESTADO).slice(0, 10)
            const rankLiq = top.map(item => item.LIQUIDO)
            const rankBru = top.map(item => item.BRUTO)
            const rankPerc = top
              .map(
                item =>
                  (item.LIQUIDO * 100) /
                  top
                    .map(item => item.LIQUIDO)
                    .reduce((prev, curr) => prev + curr, 0)
              )
              .slice(0, 10)
            const rankStates = { rankState, rankLiq, rankBru, rankPerc }

            myChart.data.datasets[0].data = rankLiq
            myChart.update()
            console.log('atualizado')
            document.getElementById('time-update').innerHTML =
              'Última atualização: ' + Date()
          })
      }, timeOut)
    })
}

async function createChart2() {
  const url = 'http://127.0.0.1:5000/api/top-vendors'
  fetch(url)
    .then(res => {
      const topVendors = res.json()
      return topVendors
    })
    .then(top => {
      const rankCodVend = top.map(item => item.CODIGO_FORNECEDOR).slice(0, 10)
      const rankNameVend = top
        .map(item => item.RASSOC.slice(0, 12))
        .slice(0, 10)
      const rankLiq = top.map(item => item.LIQUIDO)
      const rankBru = top.map(item => item.BRUTO)
      const rankPerc = top
        .map(
          item =>
            (item.LIQUIDO * 100) /
            top.map(item => item.LIQUIDO).reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      const rankVendors = {
        rankCodVend,
        rankNameVend,
        rankLiq,
        rankBru,
        rankPerc
      }

      const ctx = document.getElementById('myChart2')
      const myChart2 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rankVendors.rankNameVend,
          datasets: [
            {
              label: 'Top 10 valor por representante',
              data: rankVendors.rankPerc,
              backgroundColor: [
                //'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)' /*,
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'*/
              ],
              borderColor: [
                //'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)' /*,
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'*/
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
              text: 'Participação mensal por representante',
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
              align: 'top',
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
      setInterval(async function updateChart2() {
        fetch(url)
          .then(res => {
            const top = res.json()
            return top
          })
          .then(top => {
            const rankCodVend = top
              .map(item => item.CODIGO_FORNECEDOR)
              .slice(0, 10)
            const rankNameVend = top
              .map(item => item.RASSOC.slice(0, 12))
              .slice(0, 10)
            const rankLiq = top.map(item => item.LIQUIDO)
            const rankBru = top.map(item => item.BRUTO)
            const rankPerc = top
              .map(
                item =>
                  (item.LIQUIDO * 100) /
                  top
                    .map(item => item.LIQUIDO)
                    .reduce((prev, curr) => prev + curr, 0)
              )
              .slice(0, 10)
            const rankVendors = {
              rankCodVend,
              rankNameVend,
              rankLiq,
              rankBru,
              rankPerc
            }

            myChart2.data.datasets[0].data = rankLiq
            myChart2.update()
          })
      }, timeOut)
    })
}

async function createChart3() {
  const url = 'http://127.0.0.1:5000/api/top-clients'
  fetch(url)
    .then(res => {
      const top = res.json()
      return top
    })
    .then(top => {
      const rankName = top.map(name => name.RASSOC.slice(0, 12)).slice(0, 10)
      const rankLiq = top.map(item => item.LIQUIDO)
      const rankBru = top.map(item => item.BRUTO)
      const rankPerc = top
        .map(
          item =>
            (item.LIQUIDO * 100) /
            top.map(item => item.LIQUIDO).reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)
      const rank = { rankName, rankLiq, rankBru, rankPerc }

      const ctx = document.getElementById('myChart3')
      const myChart3 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rank.rankName,
          datasets: [
            {
              label: 'Top 10 liquidez por cliente',
              data: rank.rankPerc,
              backgroundColor: [
                //'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)'
                /*'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'*/
              ],
              borderColor: [
                //'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)' /*,
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'*/
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
              text: 'Participação mensal por cliente',
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
              align: 'top',
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
      setInterval(async function updateChart3() {
        fetch(url)
          .then(res => {
            const top = res.json()
            return top
          })
          .then(top => {
            const rankName = top
              .map(name => name.RASSOC.slice(0, 12))
              .slice(0, 10)
            const rankLiq = top.map(item => item.LIQUIDO)
            const rankBru = top.map(item => item.BRUTO)
            const rankPerc = top
              .map(
                item =>
                  (item.LIQUIDO * 100) /
                  top
                    .map(item => item.LIQUIDO)
                    .reduce((prev, curr) => prev + curr, 0)
              )
              .slice(0, 10)
            const rank = { rankName, rankLiq, rankBru, rankPerc }

            myChart3.data.datasets[0].data = rankLiq
            myChart3.update()
          })
      }, timeOut)
    })
}

async function createChart4() {
  const url = 'http://127.0.0.1:5000/api/top-products'
  fetch(url)
    .then(res => {
      const topProducts = res.json()
      return topProducts
    })
    .then(top => {
      const rankCod = top.map(item => item.PECA).slice(0, 10)
      const rankDesc = top.map(item => item.DESCRI)
      const rankLiq = top.map(item => item.LIQUIDO)
      const rankBru = top.map(item => item.BRUTO)
      const rankPerc = top
        .map(
          item =>
            (item.LIQUIDO * 100) /
            top.map(item => item.LIQUIDO).reduce((prev, curr) => prev + curr, 0)
        )
        .slice(0, 10)

      const rankProducts = { rankCod, rankDesc, rankLiq, rankBru, rankPerc }

      const ctx = document.getElementById('myChart4')
      const myChart4 = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: rankProducts.rankCod,
          datasets: [
            {
              label: 'Top 10 valor bruto por produtos',
              data: rankProducts.rankPerc,
              backgroundColor: [
                //'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)' /*,
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'*/
              ],
              borderColor: [
                //'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)' /*,
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'*/
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
      setInterval(async function updateChart4() {
        fetch(url)
          .then(res => {
            const top = res.json()
            return top
          })
          .then(top => {
            const rankCod = top.map(item => item.PECA).slice(0, 10)
            const rankDesc = top.map(item => item.DESCRI)
            const rankLiq = top.map(item => item.LIQUIDO)
            const rankBru = top.map(item => item.BRUTO)
            const rankPerc = top
              .map(
                item =>
                  (item.LIQUIDO * 100) /
                  top
                    .map(item => item.LIQUIDO)
                    .reduce((prev, curr) => prev + curr, 0)
              )
              .slice(0, 10)
            const rankProducts = {
              rankCod,
              rankDesc,
              rankLiq,
              rankBru,
              rankPerc
            }

            myChart4.data.datasets[0].data = rankLiq
            myChart4.update()
          })
      }, timeOut)
    })
}

async function createProgressChart() {
  const url = 'http://127.0.0.1:5000/api/general'
  fetch(url)
    .then(res => {
      const general = res.json()
      return general
    })
    .then(general => {
      const sumAll = general
        .map(item => item.TOT)
        .reduce((prev, curr) => prev + curr, 0)

      //const sum = { rankCod, rankDesc, rankLiq, rankBru, rankPerc }

      const ctx = document.getElementById('progressChart')
      const progressChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              data: [
                (sumAll * 100) / metaGeral,
                100 - (sumAll * 100) / metaGeral
              ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(54, 162, 235, 0)'
              ],
              borderColor: ['rgba(54, 162, 235, 0)'],
              borderWidth: 2,
              cutout: '65%',
              borderRadius: 20
              //circumference: 180,
              //rotation: 270
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
              ctx.font = '1.5em Helvetica'
              ctx.fillStyle = '#444'
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
              text: 'Progresso mensal geral',
              padding: {
                top: 10,
                bottom: 30
              }
            },
            datalabels: {
              display: false
            }
            /*datalabels: {
              formatter: (value, ctx) => {
                let percentage = value.toFixed(2) + '%'
                return percentage
              },
              anchor: 'end',
              align: 'end',
              font: {
                weight: 'bold'
              }
            }*/
          }
        }
      })
      setInterval(async function updateProgressChart() {
        fetch(url)
          .then(res => {
            const general = res.json()
            return general
          })
          .then(general => {
            const sumAll = general
              .map(item => item.TOT)
              .reduce((prev, curr) => prev + curr, 0)

            progressChart.data.datasets[0].data[0] = (sumAll * 100) / metaGeral
            progressChart.update()
          })
      }, timeOut)
    })
}

async function createProgressChart2() {
  const url = 'http://127.0.0.1:5000/api/general'
  fetch(url)
    .then(res => {
      const general = res.json()
      return general
    })
    .then(general => {
      var typeOrder = new Object()
      general.filter(function (i) {
        if (typeOrder.hasOwnProperty(i.TIPO_VENDA)) {
          typeOrder[i.TIPO_VENDA].QTD_NF += i.QTD_NF
          typeOrder[i.TIPO_VENDA].TOT += i.TOT
        } else {
          typeOrder[i.TIPO_VENDA] = new Object()
          typeOrder[i.TIPO_VENDA].QTD_NF = i.QTD_NF
          typeOrder[i.TIPO_VENDA].TOT = i.TOT
        }
      })

      const sumEcommerce = typeOrder['E-COMMERCE']['TOT']

      const ctx = document.getElementById('progressChart2')
      const progressChart2 = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [
            {
              label: 'Top 10 valor bruto por produtos',
              //data: rankProducts.rankPerc,
              data: [
                (sumEcommerce * 100) / metaEcommerce,
                100 - (sumEcommerce * 100) / metaEcommerce
              ],
              backgroundColor: ['rgba(54, 162, 235, 0.6)', 'grey'],
              borderColor: ['rgba(54, 162, 235, 0)'],
              borderWidth: 2,
              cutout: '65%'
              //circumference: 180,
              //rotation: 270
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
              ctx.font = '1.5em Helvetica'
              ctx.fillStyle = '#444'
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
              text: 'Progresso mensal e-commerce',
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
      setInterval(async function updateProgressChart2() {
        fetch(url)
          .then(res => {
            const general = res.json()
            return general
          })
          .then(general => {
            var typeOrder = new Object()
            general.filter(function (i) {
              if (typeOrder.hasOwnProperty(i.TIPO_VENDA)) {
                typeOrder[i.TIPO_VENDA].QTD_NF += i.QTD_NF
                typeOrder[i.TIPO_VENDA].TOT += i.TOT
              } else {
                typeOrder[i.TIPO_VENDA] = new Object()
                typeOrder[i.TIPO_VENDA].QTD_NF = i.QTD_NF
                typeOrder[i.TIPO_VENDA].TOT = i.TOT
              }
            })
            const sumEcommerce = typeOrder['E-COMMERCE']['TOT']
            progressChart2.data.datasets[0].data[0] =
              (sumEcommerce * 100) / metaEcommerce
            progressChart2.update()
          })
      }, timeOut)
    })
}

async function createTimeSeries() {
  const url_year = 'http://localhost:5000/api/annual-progress'
  fetch(url_year)
    .then(res => {
      const general_year = res.json()
      return general_year
    })
    .then(general => {
      const typeOrder = general.filter(item => item.TIPO_CFOP === 'Venda')

      /*function compare(x, y) {
        let a = new Date(x['DT_FATURADO']),
          b = new Date(y['DT_FATURADO'])
        return a - b
      }*/

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
            result[j].TOT += i.TOT
          } else {
            result.push(i)
          }
        })

      /*console.log(
        result
          .sortBy(function (o) {
            return new Date(o.date)
          })
          .slice(1, 100)
      )*/
      /*console.log(
        result
          .map(item => [item.DT_FATURADO, item.TOT])
          //.sort(compare)
          .slice(1, 100)
      )*/
      const ctx = document.getElementById('timeSeries1').getContext('2d')
      const timeSeries = new Chart(ctx, {
        type: 'line',
        data: {
          labels: result.map(item => item.DT_FATURADO),
          datasets: [
            {
              label: 'Faturamento anual',
              data: result.map(item => item.TOT),
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

createChart()
createChart2()
createChart3()
createChart4()
createProgressChart()
createProgressChart2()
createTimeSeries()
