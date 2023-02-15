jQuery(document).ready(() => {
  'use strict'
  $('button[name=reset-btn]').click(async () => {
    const email = $('input[name=email-restore]').val()
    try {
      const res = await axios.post(
        'http://localhost:3000/accounts/users/password',
        { email: email }
      )
      if ((res.status = 201)) {
        bootbox.alert(res.data.msg)
      }
    } catch (err) {
      bootbox.alert(err.response.data)
    }
  })
})
