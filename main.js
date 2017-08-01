
function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center:  {lat: 40.8054491, lng: -73.9654415},
    zoom: 8
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
  

// Step 2: Get HTML from template
    var source = $("#reviewItem").html();
// Step 3: Compile template
    var template = Handlebars.compile(source);
// Step 4: Get data for template.

// Step 5: Integrate the volume info data with the template
    var newListItemHTML = template(userInput);
// Step 6: Append the new book to the books list
    $('.reviews').append(newListItemHTML);
    
  
});




