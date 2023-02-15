jQuery(document).ready(() => {
  'use strict'
  $('button[name=change-btn]').click(async () => {
    const password = $('input[name=password]').val()
    const confirme = $('input[name=confirme]').val()
    const token = getToken()
    try {
      if (password == confirme) {
        const res = await axios.post(
          'http://localhost:3000/accounts/users/password/change/',
          { password: password, token: token }
        )
        if ((res.status = 201)) {
          alert(res.data.msg)
          window.location.href = 'index.html'
        }
      } else {
        alert('password dont match')
      }
    } catch (err) {
      console.log(err.response.data)
    }
  })
})
function getToken() {
  return location.search.substr(1).split('?')[0].split('=')[1]
}
