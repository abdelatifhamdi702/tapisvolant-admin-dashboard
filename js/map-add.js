function singleMap() {
  var e = {
      lng: $('#singleMap').data('longitude'),
      lat: $('#singleMap').data('latitude'),
    },
    n = new google.maps.Map(document.getElementById('singleMap'), {
      zoom: 15,
      center: e,
      scrollwheel: !1,
      fullscreenControl: !0,
      scaleControl: !1,
      navigationControl: !1,
      streetViewControl: !0,
      styles: [
        {
          featureType: 'landscape',
          elementType: 'all',
          stylers: [{ color: '#f2f2f2' }],
        },
      ],
    }),
    a = new google.maps.Marker({
      position: e,
      map: n,
      icon: { url: 'images/map-marker.png' },
      draggable: !0,
      title: 'Your location',
    })
  google.maps.event.addListener(a, 'dragend', function (e) {
    ;(document.getElementById('latitude').value = e.latLng.lat()),
      (document.getElementById('longitude').value = e.latLng.lng())
  })
}
var head = document.getElementsByTagName('head')[0],
  insertBefore = head.insertBefore
head.insertBefore = function (e, n) {
  ;(e.href &&
    0 === e.href.indexOf('https://fonts.googleapis.com/css?family=Roboto')) ||
    insertBefore.call(head, e, n)
}
var single_map = document.getElementById('singleMap')
void 0 !== single_map &&
  null != single_map &&
  google.maps.event.addDomListener(window, 'load', singleMap)
