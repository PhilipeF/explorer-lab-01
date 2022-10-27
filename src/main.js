import "./css/index.css"
import IMask from "imask"

const ccBgColor01 = document.querySelector('.cc-bg svg > g > g:nth-child(1) path');
const ccBgColor02 = document.querySelector('.cc-bg svg > g > g:nth-child(2) path');

const ccLogo = document.querySelector('.cc-logo span:nth-child(2) img');

const nomeCard = document.querySelector('#card-holder')

function setCardType(type) {

  const colors = {
    visa: ['#436D99', '#2D57F2'],
    mastercard: ['#DF6F29', '#C69347'],
    default: ['black', 'green'],
  }

  ccBgColor01.setAttribute('fill', colors[type][0])
  ccBgColor02.setAttribute('fill', colors[type][1])
  ccLogo.setAttribute('src', `cc-${type}.svg`)

}

setCardType('mastercard');

const securityCode = document.querySelector('#security-code')

const securityCodePattern = {
  mask: "0000"
}

const securityCodeMasked = IMask(securityCode, securityCodePattern)

// const codigoSeguranca = IMask(
//   document.querySelector('#security-code'), {
//   mask: "0000"
// })


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

const securitydateExpirationPattern = IMask(dateExpiration, dateExpirationPattern)

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
      // 'mastercard' => '/^(5[1-5]\d{4}|677189)\d{10}$/',
      cardtype: 'mastercard'
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
    // console.log(foundMask)
    return foundMask
  },
}

const cardNumberMasked = IMask(cardNumber, cardNumberPatthern);

const cardHolder = document.querySelector('#card-holder')

document.querySelector("form").addEventListener('submit', (event) => {
  event.preventDefault()
  console.log('Passei aqui')
})

cardHolder.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")
  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO DA SILVA" : cardHolder.value
})

const ccNumber = document.querySelector('.cc-number')

cardNumber.addEventListener("input", () => {
  ccNumber.innerText = cardNumber.value
})