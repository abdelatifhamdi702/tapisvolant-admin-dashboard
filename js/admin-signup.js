function phonenumber(inputtxt) {
  var phoneno = /^\+\d{8,14}$/
  if (inputtxt.match(phoneno)) {
    return true
  } else {
    return false
  }
}

function CheckPassword(inputtxt) {
  var decimal =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,50}$/
  if (inputtxt.match(decimal)) {
    return true
  } else {
    return false
  }
}

const signup = async () => {
  let email = document.getElementById('email').value
  let pwd = document.getElementById('pwd').value
  let username = document.getElementById('username').value
  let phone = document.getElementById('phone').value

  if (!CheckPassword(pwd)) {
    let error =
      'Le mot de passe doit contenir (1 majuscule, 1 symbole, plus de 8 caractères)'
    document.getElementById('pwdError').innerHTML = error
    return {
      error: error,
    }
  } else document.getElementById('pwdError').innerHTML = ''

  if (!phonenumber(phone)) {
    let error =
      "Le numéro de téléphone n'est pas correct! la forme accepté: (+33143156455)"
    document.getElementById('phoneError').innerHTML = error
    return {
      error: error,
    }
  } else document.getElementById('phoneError').innerHTML = ''

  let headersList = {
    'Content-Type': 'application/json',
    //'Cross-Origin-Resource-Policy': 'cross-origin',
  }
  let bodyContent = JSON.stringify({
    email: email,
    password: pwd,
    username: username,
    phone: phone,
  })

  let response = await fetch(
    `http://localhost:3000/Fu4mHX5QN6Jd2mpDIMqsd5cMfdLe/signup`,
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
  $('#signup-admin').submit(async (e) => {
    e.preventDefault()
    const res = await signup()
    console.log(res)
    if (res.data) {
      localStorage.setItem('admintoken', res.data.accessToken)
      localStorage.setItem('adminrefreshtoken', res.data.refreshToken)
      localStorage.setItem('adminstatus', true)
      document.location.href = './admin-dashboard.html'
    }
  })
})()
