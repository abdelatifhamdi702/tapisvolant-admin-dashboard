jQuery(document).ready(() => {
  'use strict'
  // isAuth
  userStat()
  //   login page
  loadPageData()
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
      console.log(error)
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
          alert('new user created')
        }
        console.log(res)
      } catch (error) {
        console.log(error.response.data)
      }
    } else {
      console.log('password dont match')
    }
  })
})
const loadPageData = () => {
  offersPromis.then(
    (res) => {
      res[0].map((offer) => {
        $('#offersArea').append(
          `<div class="col-lg-4 responsive-column">
            <div class="card-item">
                <div class="card-img" >
                  <a href="offer-details.html" class="d-block"> 
                        <img src="http://localhost:3000${
                          offer.picturesImgUrl.split(',')[0]
                        }" alt="${
            offer._id
          }" style="max-height:20rem;min-height:20rem">
                 </a> 
                    <div class="add-to-wishlist icon-element" data-toggle="tooltip" data-placement="top"
                        title="Save for Later">
                        <i class="la la-heart-o"></i>
                    </div>
                </div>
                <div class="card-body">
                    <h3 class="card-title"><a href="tour-details.html">${offer.title.toUpperCase()}</a></h3>
                    <p class="card-meta">${
                      offer.details.split(/\s+/).slice(0, 6).join(' ') + ' ...'
                    }</p>
                    <div class="card-rating">
                        <span class="badge text-white">${
                          getRandomInt(1, 4) + getRandomInt(1, 10) / 10
                        }/5</span>
                        <span class="review__text">Average</span>
                        <span class="rating__text">(${getRandomInt(
                          15,
                          89
                        )} Reviews)</span>
                    </div>
                    <div class="card-price d-flex align-items-center justify-content-between">
                        <p>
                            <span class="price__from">From</span>
                            <span class="price__num">${offer.price} Da</span>
                        </p>
                    </div>
                </div>
            </div><!-- end card-item -->
          </div><!-- end col-lg-4 -->`
        )
      })
      $('.card-img').click(function cb(e) {
        const offerId = $(this)
          .children()
          .first()
          .children()
          .first()
          .attr('alt')
        localStorage.setItem('offerId', offerId)
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
