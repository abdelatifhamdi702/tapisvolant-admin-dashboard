!(function (e) {
  'use strict'
  jQuery(document).ready(function () {
    const e = document.querySelector('.copy-input'),
      c = document.querySelector('.copy-text'),
      t = document.querySelector('.text-success-message')
    c.onclick = function () {
      e.select(),
        document.execCommand('copy'),
        e.blur(),
        t.classList.add('active'),
        setTimeout(function () {
          t.classList.remove('active')
        }, 2e3)
    }
  })
})()
