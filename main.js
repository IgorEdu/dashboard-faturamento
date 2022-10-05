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
    document.getElementById('card-value-1').innerHTML = sumAll.toLocaleString(
      'pt-br',
      { style: 'currency', currency: 'BRL' }
    )

    const countAll = general
      .map(item => item.QTD_NF)
      .reduce((prev, curr) => prev + curr, 0)
    document.getElementById('card-value-2').innerHTML = countAll

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
    document.getElementById('card-value-3').innerHTML =
      sumEcommerce.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL'
      })

    const countEcommerce = typeOrder['E-COMMERCE']['QTD_NF']
    document.getElementById('card-value-4').innerHTML = countEcommerce
  })

const url_year = 'http://localhost:5000/api/annual-progress'
fetch(url_year)
  .then(res => {
    const general_year = res.json()
    return general_year
  })
  .then(general => {
    const sumAll_year = general
      .filter(item => item.TIPO_CFOP === 'Venda')
      .map(item => item.TOT)
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
      typeOrder.map(item => [item.DT_FATURADO, item.TOT]),
      'DT_FATURADO'
    )
    //console.log('group by:', dateGrouped)
    /*document.getElementById('card-value-1').innerHTML = sumAll.toLocaleString(
      'pt-br',
      { style: 'currency', currency: 'BRL' }
    )*/

    //console.log(sumAll_year)
  })
