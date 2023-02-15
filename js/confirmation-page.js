jQuery(document).ready(() => {
  'use strict'
  $('#login-form').submit(async (e) => {
    try {
      e.preventDefault()
      const email = $('#login-form-email')
      const password = $('#login-form-password')

      const res = await axios.post(
        'http://localhost:3000/accounts/users/login',
        {
          email: email.val(),
          password: password.val(),
        },
        { withCredentials: true }
      )
      if (res.status == 200) {
        email.val('')
        password.val('')
        $('button.close')[1].click()
        window.location.href = 'index.html'
      }
    } catch (error) {
      console.log(error)
    }
  })
})
