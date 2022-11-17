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

import { createChart, updateChart, createChart2, updateChart2, 
  createChart3, updateChart3, createChart4, updateChart4, 
  createProgressChart, updateProgressChart, 
  createProgressChart2, updateProgressChart2 } from "./drawChart.js"

const swiper = new Swiper('.swiper', {
  autoplay: {
    delay: 15000
  },
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination'
  },
  mousewheel: true,
  keyboard: true,
  breakpoints: {
    767: {
      slidesPerView: 2
      //setWrapperSize: true
    }
  }
})



const url = 'http://10.1.2.198:5000/api'
let timeOut = 60000 * 30
let sumAll
let sumEcommerce
let topProducts
let topClients
let topVendors
let topStates
let modelsProducts

async function connectGeneral() {
  try {
    const res = await fetch(`${url}/general`)
    const general = await res.json()

    var typeOrder = new Object()
    general.filter(function (i) {
      if (typeOrder.hasOwnProperty(i.TIPO_VENDA)) {
        typeOrder[i.TIPO_VENDA].QTD_NF += i.QTD_NF
        typeOrder[i.TIPO_VENDA].BRUTO += i.BRUTO
      } else {
        typeOrder[i.TIPO_VENDA] = new Object()
        typeOrder[i.TIPO_VENDA].QTD_NF = i.QTD_NF
        typeOrder[i.TIPO_VENDA].BRUTO = i.BRUTO
      }
    })

    topProducts = new Object()
    general.filter(function (i) {
      if (topProducts.hasOwnProperty(i.PRODUTO)) {
        if (i.PRODUTO.substring(0,2) == '11'){
          topProducts[i.PRODUTO].QTD_NF += i.QTD_NF
          topProducts[i.PRODUTO].BRUTO += i.BRUTO
        } else {
          topProducts[i.PRODUTO].QTD_NF += (i.QTD_NF) * 2
          topProducts[i.PRODUTO].BRUTO += (i.BRUTO) * 2
        }
      } else {
        topProducts[i.PRODUTO] = new Object()
        if (i.PRODUTO.substring(0,2) == '11'){
          topProducts[i.PRODUTO].PRODUTO = i.PRODUTO
          topProducts[i.PRODUTO].QTD_NF = (i.QTD_NF) * 2
          topProducts[i.PRODUTO].BRUTO = (i.BRUTO) * 2
        } else {
          topProducts[i.PRODUTO].PRODUTO = i.PRODUTO
          topProducts[i.PRODUTO].QTD_NF = i.QTD_NF
          topProducts[i.PRODUTO].BRUTO = i.BRUTO
        }
      }
    })

    topProducts = Object.values(topProducts)
    topProducts = _.sortBy(topProducts, 'BRUTO').reverse()

    topClients = new Object()
    general.filter(function (i) {
      if (topClients.hasOwnProperty(i.BASE_CGC)) {
        if (i.PRODUTO.substring(0,2) == '11'){
          topClients[i.BASE_CGC].QTD_NF += i.QTD_NF
          topClients[i.BASE_CGC].BRUTO += i.BRUTO
        } else {
          topClients[i.BASE_CGC].QTD_NF += (i.QTD_NF) * 2
          topClients[i.BASE_CGC].BRUTO += (i.BRUTO) * 2
        }
      } else {
        topClients[i.BASE_CGC] = new Object()
          if (i.PRODUTO.substring(0,2) == '11'){
            topClients[i.BASE_CGC].RASSOC = i.RASSOC ?? 'SEM RAZÃO SOCIAL'
            topClients[i.BASE_CGC].QTD_NF = (i.QTD_NF) * 2
            topClients[i.BASE_CGC].BRUTO = (i.BRUTO) * 2
          } else {
            topClients[i.BASE_CGC].RASSOC = i.RASSOC ?? 'SEM RAZÃO SOCIAL'
            topClients[i.BASE_CGC].QTD_NF = i.QTD_NF
            topClients[i.BASE_CGC].BRUTO = i.BRUTO
          }  
      }
    })

    topClients = Object.values(topClients)
    topClients = _.sortBy(topClients, 'BRUTO').reverse()

    topVendors = new Object()
    general.filter(function (i) {
      if (topVendors.hasOwnProperty(i.RASSOCFOR)) {
        if (i.PRODUTO.substring(0,2) == '11'){
          topVendors[i.RASSOCFOR].QTD_NF += i.QTD_NF
          topVendors[i.RASSOCFOR].BRUTO += i.BRUTO
        } else {
          topVendors[i.RASSOCFOR].QTD_NF += (i.QTD_NF) * 2
          topVendors[i.RASSOCFOR].BRUTO += (i.BRUTO) * 2
        }
      } else {
        topVendors[i.RASSOCFOR] = new Object()
          if (i.PRODUTO.substring(0,2) == '11'){
            topVendors[i.RASSOCFOR].RASSOCFOR = i.RASSOCFOR ?? 'SEM REPRESENTANTE'
            topVendors[i.RASSOCFOR].QTD_NF = (i.QTD_NF) * 2
            topVendors[i.RASSOCFOR].BRUTO = (i.BRUTO) * 2
          } else {
            topVendors[i.RASSOCFOR].RASSOCFOR = i.RASSOCFOR ?? 'SEM REPRESENTANTE'
            topVendors[i.RASSOCFOR].QTD_NF = i.QTD_NF
            topVendors[i.RASSOCFOR].BRUTO = i.BRUTO
          }  
      }
    })

    topVendors = Object.values(topVendors)
    topVendors = _.sortBy(topVendors, 'BRUTO').reverse()


    topStates = new Object()
    general.filter(function (i) {
      if (topStates.hasOwnProperty(i.UF_SIGLA)) {
        if (i.PRODUTO.substring(0,2) == '11'){
          topStates[i.UF_SIGLA].QTD_NF += i.QTD_NF
          topStates[i.UF_SIGLA].BRUTO += i.BRUTO
        } else {
          topStates[i.UF_SIGLA].QTD_NF += (i.QTD_NF) * 2
          topStates[i.UF_SIGLA].BRUTO += (i.BRUTO) * 2
        }
      } else {
        topStates[i.UF_SIGLA] = new Object()
          if (i.PRODUTO.substring(0,2) == '11'){
            topStates[i.UF_SIGLA].ESTADO = i.ESTADO ?? 'NÃO INFORMADO'
            topStates[i.UF_SIGLA].QTD_NF = (i.QTD_NF) * 2
            topStates[i.UF_SIGLA].BRUTO = (i.BRUTO) * 2
          } else {
            topStates[i.UF_SIGLA].ESTADO = i.ESTADO ?? 'NÃO INFORMADO'
            topStates[i.UF_SIGLA].QTD_NF = i.QTD_NF
            topStates[i.UF_SIGLA].BRUTO = i.BRUTO
          }  
      }
    })

    topStates = Object.values(topStates)
    topStates = _.sortBy(topStates, 'BRUTO').reverse()


    modelsProducts = new Object()
    general.filter(function (i) {
      if (modelsProducts.hasOwnProperty(i.MODELO)) {
        if (i.PRODUTO.substring(0,2) == '11'){
          modelsProducts[i.MODELO].QTD_NF += i.QTD_NF
          modelsProducts[i.MODELO].BRUTO += i.BRUTO
        } else {
          modelsProducts[i.MODELO].QTD_NF += (i.QTD_NF) * 2
          modelsProducts[i.MODELO].BRUTO += (i.BRUTO) * 2
        }
      } else {
        modelsProducts[i.MODELO] = new Object()
          if (i.PRODUTO.substring(0,2) == '11'){
            modelsProducts[i.MODELO].MODELO = i.MODELO ?? 'NÃO INFORMADO'
            modelsProducts[i.MODELO].QTD_NF = (i.QTD_NF) * 2
            modelsProducts[i.MODELO].BRUTO = (i.BRUTO) * 2
          } else {
            modelsProducts[i.MODELO].MODELO = i.MODELO ?? 'NÃO INFORMADO'
            modelsProducts[i.MODELO].QTD_NF = i.QTD_NF
            modelsProducts[i.MODELO].BRUTO = i.BRUTO
          }  
      }
    })
    
    modelsProducts = Object.values(modelsProducts)
    modelsProducts = _.sortBy(modelsProducts, 'BRUTO').reverse()
    
    sumAll = (general 
      .map(item => item.BRUTO)
      .reduce((prev, curr) => prev + curr, 0)) - typeOrder['E-COMMERCE']['BRUTO']
    document.getElementById('card-value-1').innerHTML = sumAll.toLocaleString(
      'pt-br',
      { style: 'currency', currency: 'BRL' }
    )

    const countAll = (general 
      .map(item => item.QTD_NF)
      .reduce((prev, curr) => prev + curr, 0)) - typeOrder['E-COMMERCE']['QTD_NF']
    document.getElementById('card-value-2').innerHTML = countAll


    sumEcommerce = typeOrder['E-COMMERCE']['BRUTO']
    document.getElementById('card-value-3').innerHTML =
      sumEcommerce.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })

    const countEcommerce = typeOrder['E-COMMERCE']['QTD_NF']
    document.getElementById('card-value-4').innerHTML = countEcommerce
    
    const ticketGeral = sumAll / countAll
    document.getElementById('card-value-5').innerHTML =
    ticketGeral.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })

    const ticketEcommerce = sumEcommerce / countEcommerce
    document.getElementById('card-value-6').innerHTML =
    ticketEcommerce.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })
    
    const firstState = topStates[0].ESTADO
    document.getElementById('card-value-7').innerHTML = firstState
    
    const lastState = topStates.slice(-1)[0].ESTADO
    document.getElementById('card-value-8').innerHTML = lastState

    const firstModel = modelsProducts[0].MODELO
    document.getElementById('card-value-9').innerHTML = firstModel
    
    const lastModel = modelsProducts.slice(-1)[0].MODELO
    document.getElementById('card-value-10').innerHTML = lastModel
    
  return{ sumAll, sumEcommerce, countAll, countEcommerce, 
      topProducts, topClients, topVendors, topStates}
  } catch (error) {
    console.error(error)
  }
}  

async function plotCharts() {
  
  try {
    const conn = await connectGeneral()
    const progressChart = createProgressChart(sumAll);
    const progressChart2 = createProgressChart2(sumEcommerce);
    const barChart = createChart(topStates);
    const barChart2 = createChart2(topVendors);
    const barChart3 = createChart3(topClients);
    const barChart4 = createChart4(topProducts);

    const teste = progressChart.progressChart
    const teste2 = progressChart2.progressChart2
    const myChart = barChart.myChart
    const myChart2 = barChart2.myChart2
    const myChart3 = barChart3.myChart3
    const myChart4 = barChart4.myChart4

    
    document.getElementById('time-update').innerHTML =
    'Última atualização: ' + Date()

    setInterval(() => {
      try {
        connectGeneral()
        updateProgressChart(teste, conn.sumAll);
        updateProgressChart2(teste2, conn.sumEcommerce);
        updateChart(myChart, conn.topStates);
        updateChart2(myChart2, conn.topVendors);
        updateChart3(myChart3, conn.topClients);
        updateChart4(myChart4, conn.topProducts);
        
        console.log('atualizado');
        document.getElementById('time-update').innerHTML =
          'Última atualização: ' + Date()
      } catch (error) {
        console.error(error)
      }
    }, timeOut)

  } catch (error) {
    console.error(error)
  }
}

plotCharts()

const url_year = 'http://10.1.2.198:5000/api/annual-progress'
fetch(url_year)
  .then(res => {
    const general_year = res.json()
    return general_year
  })
  .then(general => {
    const sumAll_year = general
      .filter(item => item.TIPO_CFOP === 'Venda')
      .map(item => item.BRUTO)
      .reduce((prev, curr) => prev + curr, 0)
    const typeOrder = general.filter(item => item.TIPO_CFOP === 'Venda')
    //.reduce((prev, curr) => prev + curr, 0)

    const groupBy = (arr, key) => {
      const initialValue = []
      return arr.reduce((acc, cval) => {
        const myAttribute = cval[key]
        acc[myAttribute] = [...(acc[myAttribute] || []), cval]
        return acc
      }, initialValue)
    }

    const dateGrouped = groupBy(
      typeOrder.map(item => [item.DT_FATURADO, item.BRUTO]),
      'DT_FATURADO'
    )
    //console.log('group by:', dateGrouped)
    /*document.getElementById('card-value-1').innerHTML = sumAll.toLocaleString(
      'pt-br',
      { style: 'currency', currency: 'BRL' }
    )*/

    //console.log(sumAll_year)
  })
