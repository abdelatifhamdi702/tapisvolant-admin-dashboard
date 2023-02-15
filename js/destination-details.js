jQuery(document).ready(() => {
  'use strict'
  // isAuth
  userStat()
  //   login page
  loadPageData()
  // create axios auth
  const authAxios = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
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

  $('#logout-btn').click(async (e) => {
    try {
      const res = await authAxios.post('/accounts/users/logout')
      if (res.status == 200) {
        location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  })
})
const loadPageData = () => {
  destinationPromis.then(
    (res) => {
      var picpath = res[0].destinationImgUrls.split(',')[0]
      var search = '\\'
      var replacement = '/'
      var result = picpath.split(search).join(replacement)
      // offer information
      $('#breadcrumb-top-bar-ul').append(
        `<li><a href="#">${res[0].country.toUpperCase()}</a></li>`
      )
      $('#header-banner').css(
        'background-image',
        `url(http://localhost:3000${result})`
      )
      $('h3.title.font-size-26').html(res[0].country.toUpperCase())
      $('p.mr-2').html(res[0].city)
      $('span.badge.badge-warning.text-white.font-size-16').html(
        `${getRandomInt(1, 4) + getRandomInt(1, 10) / 10}/5`
      )
      $('span#reviews').html(`(${getRandomInt(15, 98)} Reviews)`)
      $('span#date').html(res[0].createdAt.substring(0, 10).replace(/-/g, '/'))
      res[0].destinationImgUrls.split(',').map((imgUrl) => {
        if (imgUrl.length > 1)
          $('#photoSlider').append(`
                <div class="card-item mb-0">
                  <div class="card-img">
                      <img src="http://localhost:3000${imgUrl}" alt="Destination-img" style="max-height:40em;min-height:40em">
                  </div>
                </div><!-- end card-item -->`)
      })
      // imageButton

      $('#imagesButton').append(`                               
        <a class="theme-btn" data-src="http://localhost:3000${
          res[0].destinationImgUrls.split(',')[0]
        }" data-fancybox="gallery"
          data-caption="Showing image - 01" data-speed="700">
          <i class="la la-photo mr-2"></i>Photos
        </a>`)
      res[0].destinationImgUrls.split(',').map((imgUrl, index) => {
        if (imgUrl.length > 1)
          $('#otherImages').append(`                               
            <a class="d-none" data-fancybox="gallery" data-src="http://localhost:3000${imgUrl}"
            data-caption="Showing image - 0${index + 2}" data-speed="700"></a>
          `)
      })
      // offers you might like

      res[1].map((item) => {
        $('#offersArea').append(`
            <div class="col-lg-4 responsive-column">
                <div  class="card-item destination-card">
                    <div  class="card-img" style="cursor:pointer">
                    <a href="destinations-details.html" class="d-block">
                      <img style="min-height:19rem;max-height:19rem" src="http://localhost:3000${
                        item.destinationImgUrls.split(',')[0]
                      }" alt="${item._id}">
                      <span class="badge">${item.city}</span>  
                    </a>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${item.country.toUpperCase()}</h3>
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
            </div>
            `)
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
  axios
    .get('http://localhost:3000/accounts/isauth', {
      withCredentials: true,
    })
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
