jQuery(document).ready(() => {
  'use strict'
  userStat()
  //   login page
  loadPageData()

  // image profile signup
  // $('input[name=imageProfile]').on(
  //   ('change',
  //   function cb() {
  //     console.log('image profile has been changed')
  //   })
  // )

  // login form
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
        $('#login-btn').toggleClass('d-none')
        $('#signup-btn').toggleClass('d-none')
        $('#logout-btn').toggleClass('d-none')
        $('#profile-btn').toggleClass('d-none')
        $('button.close')[1].click()
      }
    } catch (error) {
      bootbox.alert(error.response.data)
    }
  })
  // create axios auth
  const authAxios = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
  })
  $('#logout-btn').click(async () => {
    try {
      const res = await authAxios.post('/accounts/users/logout')
      if (res.status == 200) {
        location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  })
  $('#flight').submit(async (e) => {
    e.preventDefault()
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
    const departingDate = $('#flight input[name=daterange-single]')
      .eq(0)
      .val()
      .replace(pattern, '$3-$2-$1')
    const arrivingDate = $('#flight input[name=daterange-single]')
      .eq(1)
      .val()
      .replace(pattern, '$3-$2-$1')
    const type = $('#flight select').eq(1).next().first().text()
    const seats = $('#flight input[name=adult_number]').val()
    const destinationId = $('#flight select').eq(0).val()
    const loadRequest = async (
      departureDate,
      arrivalDate,
      type,
      seatsNumber,
      destinationId
    ) => {
      try {
        const res = await authAxios.post('/demands/planes', {
          departureDate: departureDate,
          arrivalDate: arrivalDate,
          type: type,
          seatsNumber: seatsNumber,
          destinationId: destinationId,
        })
        return res
      } catch (error) {
        bootbox.alert('Your are not a user yet !')
      }
    }
    loadRequest(departingDate, arrivingDate, type, seats, destinationId).then(
      (res) => {
        if (res.status == 201) {
          bootbox.alert({
            message: 'Your flight request was sended with success',
            className: 'rubberBand animated',
          })
        }
      },
      (err) => {
        throw err
      }
    )
  })

  $('#hotel').submit(async (e) => {
    e.preventDefault()
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
    const checkIn = $('#hotel input[name=daterange-single]')
      .eq(0)
      .val()
      .replace(pattern, '$3-$2-$1')
    const checkOut = $('#hotel input[name=daterange-single]')
      .eq(1)
      .val()
      .replace(pattern, '$3-$2-$1')
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const nights = (checkOutDate - checkInDate) / 86400000
    const children = $('#hotel span.children').html()[0]
    const adult = $('#hotel span.adult').eq(0).html()[0]
    const rating = $('#hotel span.adult').eq(1).html()[0]
    const destination = $('#hotel .destinationsSelect')
      .children(0)
      .first()
      .val()
    const roomType = $('#dropDownId :selected').text()

    try {
      const res = await authAxios.post('/demands/hotels', {
        personsNumber: adult,
        kidsNumber: children,
        starsRating: rating,
        roomType: roomType,
        checkInDate: checkIn,
        checkOutDate: checkOut,
        nightsNumber: nights,
        destinationId: destination,
      })
      if (res.status == 201) {
        bootbox.alert({
          message: 'Your hotel request was sended with success',
          className: 'rubberBand animated',
        })
      }
    } catch (error) {
      bootbox.alert('Your are not a user yet !')
    }
  })
  $('#visas').submit(async (e) => {
    e.preventDefault()
    const pattern = /(\d{2})\/(\d{2})\/(\d{4})/
    const country = $('#dropDownId2 :selected').text()
    const duration = $('#visas input[name=duration]').val()
    const applicationDate = $('#visas input[name=daterange-single]')
      .val()
      .replace(pattern, '$3-$2-$1')
    try {
      const res = await authAxios.post('/demands/visas', {
        country: country,
        duration: duration,
        applicationDate: applicationDate,
      })
      if (res.status == 201) {
        bootbox.alert({
          message: 'Your visa request was sended with success',
          className: 'rubberBand animated',
        })
      }
    } catch (error) {
      bootbox.alert('Your are not a client yet !')
    }
  })
  $('#signupPopupForm').submit(async (e) => {
    e.preventDefault()
    const userName = $('#signupPopupForm input[name=username]').val()
    const firstName = $('#signupPopupForm input[name=first-name]').val()
    const lastName = $('#signupPopupForm input[name=last-name]').val()
    const dob = $('#signupPopupForm input[name=dob]').val()
    const phone = $('#signupPopupForm input[name=phone]').val()
    const email = $('#signupPopupForm input[name=email]').val()
    const password = $('#signupPopupForm input[name=password]').val()
    const gender = $('#signupPopupForm select').val()[0]
    const confirmPassword = $(
      '#signupPopupForm input[name=confirm-password]'
    ).val()
    let profileImage = ''
    if ($('#signupPopupForm input[name=imageProfile]')[0].files)
      profileImage = $('#signupPopupForm input[name=imageProfile]')[0].files[0]
    const imagePassport = $('#signupPopupForm input[name=imagePassport]')[0]
      .files[0]
    if (password == confirmPassword) {
      let formData = new FormData()
      formData.append('userName', userName)
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('birthDate', dob)
      formData.append('phone', phone)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('gender', gender)
      formData.append('imagePassport', imagePassport)
      formData.append('imageProfile', profileImage)
      try {
        const res = await axios.put(
          'http://localhost:3000/accounts/users/signup',
          formData
        )
        if (res.status == 201) {
          $('button.close').eq(0).click()
          bootbox.alert({
            message:
              'You sign up with success, please check your email for the confirmation.',
            className: 'rubberBand animated',
          })
        }
      } catch (error) {
        bootbox.alert(error + '')
      }
    } else {
      bootbox.alert('password dont match')
    }
  })
})

$('#btnEditUser').click(async () => {
  try {
    let profileImage = ''
    if ($('#userImageProfile input[name=userImageProfile]')[0].files)
      profileImage = $('#userImageProfile input[name=userImageProfile]')[0]
        .files[0]
    const imagePassport = $(
      '#userImagePassport input[name=userImagePassport]'
    )[0].files[0]
    let formData = new FormData()
    formData.append('userName', $('#UsernamePI13').val() + '')
    formData.append('firstName', $('#FirstNamePI1').val() + '')
    formData.append('lastName', $('#LastNamePI1').val() + '')
    formData.append('birthDate', $('#DateOfBirthPI1').val() + '')
    formData.append('phone', $('#PhonePI1').val() + '')
    formData.append('email', $('#EmailPI1').val() + '')
    formData.append('imageProfile', profileImage)
    formData.append('imagePassport', imagePassport)
    const res = await authAxios.patch('/accounts/users', formData, {
      withCredentials: true,
    })
    if (res.status == 201) {
      alert('Your profile information was updated with success')
    }
  } catch (error) {
    console.log(error)
  }
})
$('#btnEditAgent').click(async () => {
  try {
    let profileImage = ''
    if ($('#agentImageProfile input[name=agentImageProfile]')[0].files)
      profileImage = $('#agentImageProfile input[name=agentImageProfile]')[0]
        .files[0]
    console.log(profileImage)
    let formData = new FormData()
    formData.append('agentName', $('#AgentnameAI3').val() + '')
    formData.append('firstName', $('#FirstNameAI').val() + '')
    formData.append('lastName', $('#LastNameAI').val() + '')
    formData.append('birthDate', $('#DateOfBirthAI').val() + '')
    formData.append('phone', $('#PhoneAI').val() + '')
    formData.append('email', $('#EmailAI').val() + '')
    formData.append('image', profileImage)
    const res = await authAxios.patch('/accounts/agents', formData, {
      withCredentials: true,
    })
    console.log(res)
    if (res.status == 201) {
      bootbox.alert('Your profile information was updated with success')
    }
  } catch (error) {
    bootbox.alert(error)
    console.log(error)
  }
})
$('#addOfferForm').submit(async (e) => {
  e.preventDefault()
  const title = $('#addOfferForm input[name=title]').val()
  const days = $('#addOfferForm input[name=days]').val()
  const price = $('#addOfferForm input[name=price]').val()
  const details = $('#addOfferForm textarea[name=details]').val()
  const limit = $('#addOfferForm input[name=limit]').val()
  let formData = new FormData()
  let offerImages = ''
  if ($('#addOfferForm input[name=offerImages]')[0].files) {
    var n = $('#addOfferForm input[name=offerImages]')[0].files.length
    for (i = 0; i < n; i++) {
      offerImages = $('#addOfferForm input[name=offerImages]')[0].files[i]
      formData.append('images', offerImages)
    }
  }
  formData.append('title', title)
  formData.append('days', days)
  formData.append('price', price)
  formData.append('details', details)
  formData.append('limit', limit)

  try {
    const res = await authAxios.post('/services/offers', formData, {
      withCredentials: true,
    })
    if (res.status == 201) {
      bootbox.alert({
        message: 'New offer created',
        className: 'rubberBand animated',
      })
    }
  } catch (error) {
    bootbox.alert(error.response.data)
  }
})
$('#updateOfferForm').submit(async (e) => {
  e.preventDefault()
  var queryString = decodeURIComponent(window.location.search)
  queryString = queryString.substring(1)
  const title = $('#updateOfferForm input[name=title]').val()
  const days = $('#updateOfferForm input[name=days]').val()
  const price = $('#updateOfferForm input[name=price]').val()
  const limit = $('#updateOfferForm input[name=limit]').val()
  const details = $('#updateOfferForm textarea[name=details]').val()
  let formData = new FormData()
  let offerImages = ''
  if ($('#updateOfferForm input[name=offerImages]')[0].files) {
    var n = $('#updateOfferForm input[name=offerImages]')[0].files.length
    for (i = 0; i < n; i++) {
      offerImages = $('#updateOfferForm input[name=offerImages]')[0].files[i]
      formData.append('images', offerImages)
    }
  }
  formData.append('title', title)
  formData.append('days', days)
  formData.append('price', price)
  formData.append('limit', limit)
  formData.append('details', details)
  try {
    const res = await authAxios.patch(
      '/services/offers/' + queryString,
      formData,
      {
        withCredentials: true,
      }
    )
    if (res.status == 201) {
      bootbox.alert({
        message: 'The offer was updated',
        className: 'rubberBand animated',
      })
    }
  } catch (error) {
    bootbox.alert(error.response.data)
  }
})
$('#addDestinationForm').submit(async (e) => {
  e.preventDefault()
  const country = $('#addDestinationForm input[name=country]').val()
  const city = $('#addDestinationForm input[name=city]').val()
  let formData = new FormData()
  let destinationImages = ''
  if ($('#addDestinationForm input[name=destinationImages]')[0].files) {
    var n = $('#addDestinationForm input[name=destinationImages]')[0].files
      .length
    for (i = 0; i < n; i++) {
      destinationImages = $(
        '#addDestinationForm input[name=destinationImages]'
      )[0].files[i]
      formData.append('images', destinationImages)
    }
  }
  formData.append('country', country)
  formData.append('city', city)
  try {
    const res = await authAxios.put('/services/destinations', formData, {
      withCredentials: true,
    })
    if (res.status == 201) {
      bootbox.alert({
        message: 'New destination created',
        className: 'rubberBand animated',
      })
    }
  } catch (error) {
    bootbox.alert(error.response.data)
  }
})
$('#updateDestinationForm').submit(async (e) => {
  e.preventDefault()
  var queryString = decodeURIComponent(window.location.search)
  queryString = queryString.substring(1)
  const country = $('#updateDestinationForm input[name=country]').val()
  const city = $('#updateDestinationForm input[name=city]').val()
  let formData = new FormData()
  let destinationImages = ''
  if ($('#updateDestinationForm input[name=destinationImages]')[0].files) {
    var n = $('#updateDestinationForm input[name=destinationImages]')[0].files
      .length
    for (i = 0; i < n; i++) {
      destinationImages = $(
        '#updateDestinationForm input[name=destinationImages]'
      )[0].files[i]
      formData.append('images', destinationImages)
    }
  }
  formData.append('country', country)
  formData.append('city', city)
  try {
    const res = await authAxios.patch(
      '/services/destinations/' + queryString,
      formData,
      {
        withCredentials: true,
      }
    )
    if (res.status == 201) {
      bootbox.alert({
        message: 'The destination was updated',
        className: 'rubberBand animated',
      })
    }
  } catch (error) {
    bootbox.alert(error.response.data)
  }
})

const loadPageData = () => {
  dataPromis.then(
    (res) => {
      res[0].map((offer) => {
        $('#offersArea').append(
          `<div class="card-item mb-0">
              <div  class="card-img" style="cursor:pointer">
                  <a  href="offer-details.html" class="d-block">
                      <img style="max-height:17rem;min-height:17rem"  src="http://localhost:3000${
                        offer.picturesImgUrl.split(',')[0]
                      }" alt="${offer._id}">
                  </a>
                  <span class="badge">Bestseller</span>
                  <div class="add-to-wishlist icon-element" data-toggle="tooltip" data-placement="top"
                      title="Bookmark">
                      <i class="la la-heart-o"></i>
                  </div>
              </div>
              <div class="card-body">
                  <h3 class="card-title"><a href="hotel-single.html">${offer.title.toUpperCase()}</a></h3>
                  <p class="card-meta">${
                    offer.details.split(/\s+/).slice(0, 6).join(' ') + '...'
                  }</p>
                  <div class="card-rating">
                      <span class="badge text-white">${
                        getRandomInt(1, 4) + getRandomInt(1, 10) / 10
                      }/5</span>
                      <span class="review__text">Average</span>
                      <span class="rating__text">(${getRandomInt(
                        13,
                        234
                      )} Reviews)</span>
                  </div>
                  <div class="card-price d-flex align-items-center justify-content-between">
                      <p>
                          <span class="price__from">From</span>
                          <span class="price__num">${offer.price}&nbsp;Da</span>
                          <span class="price__text">Per night</span>
                      </p>
                      <a href="hotel-single.html" class="btn-text">See details<i
                              class="la la-angle-right"></i></a>
                  </div>
              </div>
          </div>`
        )
      })
      res[1].map((dest) => {
        $('select.destinationsSelect')
          .eq(0)
          .append(
            `<option value="${dest._id}" selected>${dest.country} - ${dest.city}</option>`
          )
        $('select.destinationsSelect')
          .eq(1)
          .append(
            `<option value="${dest._id}" selected>${dest.country} - ${dest.city}</option>`
          )
      })
      res[2].map((item, index) => {
        let eq = index % 3
        $('#topDest .col-lg-4').eq(eq).append(`
        <div  class="card-item destination-card">
            <div  class="card-img" style="cursor:pointer">
              <a href="destinations-details.html" class="d-block">
                <img style="min-height : 17rem ; ${
                  eq == 2 ? 'height:36rem' : 'max-height:17rem'
                }"  src="http://localhost:3000${
          item.destinationImgUrls.split(',')[0]
        }" alt="${item._id}">
                <span class="badge">${item.city}</span>
              </a>
            </div>
            <div class="card-body">
                <h3 class="card-title"><a href="destinations-details.html"data-dest-id="${
                  item._id
                }">${item.country.toUpperCase()}</a></h3>
                <div class="card-rating d-flex align-items-center">
                    <span class="ratings d-flex align-items-center mr-1">
                    ${putStarts(getRandomInt(1, 4))}
                    </span>
                    <span class="rating__text">(${getRandomInt(
                      13,
                      432
                    )} Reviews)</span>
                </div>
                <div class="card-price d-flex align-items-center justify-content-between">
                    <p class="tour__text">
                    ${getRandomInt(1, 6)} Offers
                    </p>
                </div>
            </div>
        </div>
        `)
      })
      res[3].map((item) => {
        let destName = ''
        res[2].map((i) => {
          if (i._id == item.destinationId) destName = i.country
        })
        $('#topPlanes').append(`
        <div class="col-lg-4 responsive-column">
        <div class="deal-card">
            <div class="deal-title d-flex align-items-center">
                <img src="images/airline-img.png" alt="air-line-img">
                <h3 class="deal__title">
                    <a href="flight-single.html" class="d-flex align-items-center">
                        Algeria<i class="la la-exchange mx-2"></i>${destName}
                    </a>
                </h3>
            </div>
            <p class="deal__meta">${item.type}</p>
            <div
                class="deal-action-box d-flex align-items-center justify-content-between">
            </div>
        </div><!-- end deal-card -->
    </div><!-- end col-lg-4 -->
        `)
      })
      res[4].map((item) => {
        $('#testimonials').append(`
        <div class="testimonial-card" style="min-height:20rem">
        <div class="testi-desc-box">
            <p class="testi__desc">${item.messageContent} .</p>
        </div>
        <div class="author-content d-flex align-items-center">
            <div class="author-img">
                <img src="http://localhost:3000${
                  item.user.profileImgUrl
                }" alt="testimonial image">
            </div>
            <div class="author-bio">
                <h4 class="author__title">${item.user.firstName}&nbsp;${
          item.user.lastName
        }</h4>
                <span class="author__meta">Algeria</span>
                <span class="ratings d-flex align-items-center">
                  ${putStarts(getRandomInt(2, 5))}
                </span>
            </div>
        </div>
    </div>
        `)
      })
      $('.card-img a ').click(function cb(e) {
        // e.preventDefault()
        const offerId = $(this).children().first().attr('alt')
        localStorage.setItem('offerId', offerId)
      })
      $('.card-img')
        .before()
        .click(function cb(e) {
          const destinationId = $(this)
            .children()
            .first()
            .children()
            .first()
            .attr('alt')
          localStorage.setItem('destinationId', destinationId)
          window.location.href = 'destinations-details.html'
        })
    },
    (err) => {
      console.log(err)
    }
  )
}
const userStat = () => {
  isAuth
    .then((res) => {
      $('#login-btn').toggleClass('d-none')
      $('#signup-btn').toggleClass('d-none')
      $('#logout-btn').toggleClass('d-none')
      $('#profile-btn').toggleClass('d-none')
    })
    .catch((err) => {})
}
const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
const putStarts = (nbr) => {
  let stars = ''
  for (i = 0; i < nbr; i++) {
    stars += `<i class="la la-star"></i>`
  }
  for (i = 0; i < 5 - nbr; i++) {
    stars += `<i class="la la-star-o"></i>`
  }
  return stars
}
