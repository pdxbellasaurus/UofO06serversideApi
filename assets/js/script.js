var key = '2048283834a0f68c2d13c7b293b98849'
var geoUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='
var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat='
var parameters = '&cnt=5&exclude=minutely,hourly,alerts&units=imperial&appid='
var iconUrl = 'http://openweathermap.org/img/w/'
var today = moment().format('ddd, MM/DD/YYYY');
var searchBtn = $('#search-btn');
var city = $('#city-name');
var cityInput = $('#search-city');
var dateToday = $('#current-date'); //city date and icon
var uvibtn = $('#uv').html('');

//containers
var current = $('#current-day');
var listCity = '';

//Local Storage
function submitSearch(event){
    event.preventDefault();
    var cityName = $('#search-city').val().trim().toUpperCase();
    if (cityName) {
        getGeo(cityName);
        saveCity(cityName);
    } else {
        alert('Please enter a city');
    }
};

function saveCity(cityName){
    cityList = JSON.parse(localStorage.getItem('listCity'));
    console.log(cityList);
    console.log(cityName);
    if (cityList === null) {
        cityList = [];
    } 
    if (cityList.length > 8){
        cityList.shift();
    }
    else if (cityList.indexOf(cityName) === -1){
        cityList.push(cityName);
        localStorage.setItem('listCity', JSON.stringify(cityList));
        $('#city-list').append($('<button>').html(cityName)
        .attr({'class': 'list-group-item list-group-item-action', 'id': cityList}));
    }
    $('#search-city').val('')
}

var getList = function (){
    cityList = JSON.parse(localStorage.getItem('listCity'));
    if (!cityList) {
        cityList = '';
    }
    for (var i=0; i < cityList.length;i++) {
        var a = $('<button>')
        .attr({'class': 'list-group-item list-group-item-action', 'id': cityList[i]});
        a.text(cityList[i]);
        $('#city-list').append(a);
    }
}

function getGeo(city){
    //EMPTY CURRENT DAY ICON AND FORECAST CONTAINER
    $('#forecast').remove();
    $('#icon-img').remove();
    //GET CITY DATA
    fetch(geoUrl + city + '&appid=' + key)
    .then(function (response){
        if (response.ok){
            return response.json()
            .then(function(data){
                var lat = data[0].lat;
                var lon = data[0].lon;
                console.log(data);
                displayData(lat,lon);
                $('#current-date').html(today);
                $('#city-name').html(city + ', ' + data[0].state);
});
} else {
    alert('Error: ' + response.statusText);
}
});
};
//DISPLAY DATA TO REMAINING CURRENT AND 5-DAY FORECAST
var displayData = function (lat,lon){
    fetch(apiUrl+lat+'&lon='+lon+parameters+key)
    .then(function (response){
        if (response.ok){
            return response.json()
            .then(function (data) {
                console.log(data);
               
                $('#today-icon').prepend($('<img>')
                .attr({id: 'icon-img', src: iconUrl + data.current.weather[0].icon + '.png', width: '100px'}));
                //ADD CURRENT WEATHER
                $('#today-desc').html(data.current.weather[0].description);
                $('#current-temp').text(Math.round(data.current.temp) +'°F');
                $('#current-humidity').text(Math.round(data.current.humidity) + '% Humidity');
                $('#wi').html('&#xf72e; ');
                $('#wind').text(Math.round(data.current.wind_speed) +' mph');
                $('#uvt').text('UV Index: ');
                $('#uv').text(data.current.uvi);
                $('#five-day').html('5-Day Forcast:');
                //UVICOLOR
                $( "#uv" ).toggleClass(function() {
                    var uvi = parseInt($('#uv').html().trim());
                    var btn = 'rounded p-1 btn btn-';
                    var color = ''
                    if (uvi <= 2) {
                        color = 'success';
                    }
                    // moderate 3 to 5 yellow
                    if (uvi >= 3 && uvi <= 5) {
                        color = 'warning';
                    }
                    // high 6 to 7 orange
                    if (uvi >= 6 && uvi <= 7) {
                        return 'custom-btn-amber';
                    }
                    // very high 8 to 10 red
                    if (uvi >= 8 && uvi <= 10) {
                        color = 'danger';
                    }
                    //Extreme 11 or higher purple
                    if (uvi >= 11) {
                        return 'custom-btn-purple';
                    }
                    return btn + color;
                });
                //ADD FORECAST CONTAINER TO EMPTY
                $('#container').append($('<div>')
                .attr({'id': 'forecast','class': 'row'}));
                //ADD 5-DAY FORECAST CARDS
                for (var i = 1; i < 6; i++) {
                    
                    var addCard = $('<div>')
                    .attr({class: 'col-sm-2 col-md-2 col-lg-2 card-body text-white bg-primary my-2 mx-2 mb-3 rounded text-center',
                    style:'max-width: 15rem;'});
                    
                    $('#forecast').append(addCard);
                    
                    var newDay =  new Date(data.daily[i].dt * 1000)
                    .toLocaleDateString('en-US');
                    
                    addCard.append($('<h4>')
                    .attr('class','card-text').html(newDay));
                    
                    addCard.append($('<img>')
                    .attr({src: iconUrl + data.daily[i].weather[0].icon + '.png', width: '75px', alt: 'Icon Image'}));
                    
                    addCard.append($('<h3>').attr('class','card-text text-center')
                    .html(Math.round(data.daily[i].temp.day) + '°F'));
                    
                    addCard.append($('<p>').attr('class','card-text')
                    .html(Math.round(data.daily[i].humidity) + '% Humidity'));
                }
            });
        }
    });
}
    
// EVENT LISTENERS
//search from the input
$('#search-btn').on('click',submitSearch);
getList();
//search from the buttons
$('#city-list').on('click', '> *', function(event){
    event.preventDefault();
    var cityName = $(this).html();
    if (cityName){
    getGeo(cityName);
}
});
///EMPTY LOCAL STORAGE
$('#empty').on('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    getList();
});