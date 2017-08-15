
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.8054491, lng: -73.9654415},
    zoom: 10,
    scrollwheel: false
  });

  var marker = new google.maps.Marker({
    position: {lat: 40.8054491, lng: -73.9654415},
    map: map,
    title: 'Monks Café'
  });
}

  
$('form').on('submit', function(e) {
  var var_review=$('#review').val();
  var var_name=$('#customername').val();
  e.preventDefault();
  var userInput =  {
    review: var_review,
    customername: var_name
  };
  

    var source = $("#reviewItem").html();
    var template = Handlebars.compile(source);
    var newListItemHTML = template(userInput);
    $('.reviews').append(newListItemHTML);
    
  
});

var config = {
  apiKey: "AIzaSyDN2fP81JLH4w_QkEH8r1GfVo9-wWcSmlY",
    authDomain: "restaurant-site-e069a.firebaseapp.com",
    databaseURL: "https://restaurant-site-e069a.firebaseio.com",
    projectId: "restaurant-site-e069a",
    storageBucket: "restaurant-site-e069a.appspot.com",
    messagingSenderId: "536765724148"
};

firebase.initializeApp(config);

var database = firebase.database();


var reservationData = {};

$('.reservation-day li').on('click', function() {
  reservationData.day = $(this).text();
});

$('.reservation-form').on('submit', function(event) {
  event.preventDefault();

  reservationData.name = $('.reservation-name').val();

  var reservationsReference = database.ref('reservations');

  reservationsReference.push(reservationData);
});


function getReservations() {

  database.ref('reservations').on('value', function(results) {

    
      var allReservations = results.val();

      $('.reservations').empty();
    
    for (var reservation in allReservations) {
  
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
      var source = $("#reservation-template").html();
      var template = Handlebars.compile(source);
      var reservationListItem = template(context);

      $('.reservations').append(reservationListItem);

    }

  });

}
$(function () {
    $('#reserve').on('click', 'li', function () {
        var id = $('#reserve li').data('id');
        console.log(id);
        var reservationReference = database.ref('reservations/' + id)
         reservationReference.remove()
        $(this).remove();
    });
});

//$('.reservations li').on('click', function() {

//
  // Get the ID for the comment we want to update
 // var id = $(e.target).parent().data('id')

  // find comment whose objectId is equal to the id we're searching with
  //var reservationReference = database.ref('reservations/' + id)


  // Use remove method to remove the comment from the database
  //reservationReference.remove()
//});

getReservations();
initMap();






