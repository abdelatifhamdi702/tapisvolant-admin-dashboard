const login = async () => {
  let headersList = {
    'Content-Type': 'application/json',
    'Cross-Origin-Resource-Policy': 'cross-origin',
  }
  let bodyContent = JSON.stringify({
    email: document.getElementById('email').value,
    password: document.getElementById('pwd').value,
  })

  let response = await fetch(
    `http://localhost:3000/Fu4mHX5QN6Jd2mpDIMqsd5cMfdLe/signin`,
    {
      method: 'POST',
      headers: headersList,
      body: bodyContent,
    }
  )

  return await response.json()
}

!(function (e) {
  'use strict'
  //   login page
  $('#login-form-admin').submit(async (e) => {
    e.preventDefault()
    const res = await login()
    console.log(res)
    if (res.statusCode == 409) {
      document.getElementById('loginError').innerHTML =
        'Email ou mot de passe incorrect'
    } else {
      if (res.data) {
        localStorage.setItem('admintoken', res.data.tokens.accessToken)
        localStorage.setItem('adminstatus', true)
        document.location.href = './admin-dashboard.html'
      }
    }
  })
})()
