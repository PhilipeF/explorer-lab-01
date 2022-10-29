import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector('.cc-bg svg > g > g:nth-child(1) path');
const ccBgColor02 = document.querySelector('.cc-bg svg > g > g:nth-child(2) path');

const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

function setCardType(type) {

  const colors = {
    visa: ['#436D99', '#2D57F2'],
    mastercard: ['#DF6F29', '#C69347'],
    hipercard: ['#822124', '#000'],
    elo: ['black', 'black'],
    default: ['black', 'green'],
  }

  ccBgColor01.setAttribute('fill', colors[type][0])
  ccBgColor02.setAttribute('fill', colors[type][1])
  ccLogo.setAttribute('src', `cc-${type}.svg`)
}

setCardType('default');

//verificar o codigo de segurança
const securityCode = document.querySelector('#security-code')

const securityCodePattern = {
  mask: "000"
}

const securityCodeMasked = IMask(securityCode, securityCodePattern)

// const codigoSeguranca = IMask(
//   document.querySelector('#security-code'), {
//   mask: "0000"
// })


//verificar o codigo de expiração
const dateExpiration = document.querySelector('#expiration-date')

const dateExpirationPattern = {
  mask: "MM{/}YY",

  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
}

const expirationDateMasked = IMask(dateExpiration, dateExpirationPattern)

//verificar o numero do cartão
const cardNumber = document.querySelector('#card-number')

const cardNumberPatthern = {
  mask: [
    {
      mask: '0000 0000 0000 0000',
      regex: /^4\d{0,15}/,
      cardtype: 'visa',
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      // regex: /^(5[1-5]\d{4}|677189)\d{10}$/,
      cardtype: 'mastercard'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})$/,
      cardtype: 'elo'
    },
    {
      mask: '0000 0000 0000 0000',
      regex: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
      cardtype: 'hipercard'
    },
    {
      mask: '0000 0000 0000 0000',
      cardtype: "default"
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    var number = (dynamicMasked.value + appended).replace(/\D/g, '');

    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    });

    // verificar as mascaras regex
    // console.log(foundMask)

    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPatthern);

document.querySelector("form").addEventListener('submit', (event) => {
  event.preventDefault()
  alert('Cartão adicionado')
  // console.log('Passei aqui')
})

const cardHolder = document.querySelector("#card-holder")

cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector('.cc-holder .value')
  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

const ccNumber = document.querySelector('.cc-number')

cardNumber.addEventListener("input", () => {
  ccNumber.innerText = cardNumber.value
})

securityCodeMasked.on('accept', () => {
  updateSecurityCode(securityCodeMasked.value)
})

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector('.cc-security .value')
  ccSecurity.innerText = code.length === 0 ? "123" : code
}

cardNumberMasked.on('accept', () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype
  setCardType(cardType)
  updateCardNumber(cardNumberMasked.value)

})

function updateCardNumber(number) {
  // console.log(number)

  const ccNumber = document.querySelector('.cc-number')

  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number
}

expirationDateMasked.on('accept', () => {
  updateDateExpiration(expirationDateMasked.value)
})

function updateDateExpiration(date) {
  const experitionDate = document.querySelector('.cc-extra .value')
  experitionDate.innerText = date.length === 0 ? "02/32" : date
}