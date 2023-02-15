jQuery(document).ready(() => {
  'use strict'
  const authAxios = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  })

  $('#send-message-form').submit(async (e) => {
    e.preventDefault()
    try {
      const res = await authAxios.post('/communications/messages/', {
        message: $('#messageContext').val() + '',
      })

      if (res.status == 201) {
        bootbox.alert({
          message: 'You send the message with success',
          className: 'rubberBand animated',
        })
      }
    } catch (error) {
      bootbox.alert('You are not a user yet')
    }
  })
})
