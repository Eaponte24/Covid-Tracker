var searchBtn = document.querySelector("#searchBtn");
var searchForm = $('#search');
var tableBody = document.getElementById('repo-table');

//Grabs the current time and date
var date = moment().format("YYYY-MM-DD")
console.log(date);


function covidStats(inputValue) {

    var inputValue = $("#search-bar").val();
    

// Covid tracker HISTORY API
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-193.p.rapidapi.com/history?country=" + inputValue + "&day=" + date + "",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "355da21f74msh0c6c414fadadee4p1fe140jsn8c17d86b7d33",
		"X-RapidAPI-Host": "covid-193.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
    
     var {country} = response.parameters
     var {active} = response.response[0].cases
     var {total} = response.response[0].cases
     var {recovered} = response.response[0].cases
     var totalTests = response.response[0].tests.total

    document.querySelector(".country").innerText = country.charAt(0).toUpperCase() + country.slice(1);
    document.querySelector(".active").innerText = "Total Active Cases: " + active.toLocaleString();
    document.querySelector(".deaths").innerText = "Total Deaths: " + total.toLocaleString();
    document.querySelector(".recovered").innerText = "Total Recovered Cases: " + recovered.toLocaleString();
    document.querySelector(".tests").innerText = "Total Tests Done: " + totalTests.toLocaleString();

    console.log(country, active, total, recovered, totalTests);
    console.log(response);

   
});

};
   
    
function redditList(searchTerm){
   
    var inputValue = $("#search-bar").val();
    var searchTerm = 'covid ' + inputValue;

// reddit API call
$.ajax(
    "https://www.reddit.com/subreddits/search.json",
    {
        data: { q: searchTerm },
        success: function(responseData) {
            if (responseData.data.children.length > 0) {
                console.log(responseData);
                console.log('# of results: ' + responseData.data.children.length);

                // For the first 15 results, build a table row and add it to the left bar
                for (let i = 0; i < 15; i++) {
                    var createTableRow = document.createElement('tr');
                    var tableData = document.createElement('td');
                    var link = document.createElement('a');

                    // Build the link from the response
                    link.textContent = responseData.data.children[i].data.display_name_prefixed;
                    link.href = "http://reddit.com" + responseData.data.children[i].data.url;
    
                    // Nest the html into each other
                    tableData.appendChild(link);
                    createTableRow.appendChild(tableData);
                    tableBody.appendChild(createTableRow);
                }  
                
            } else { 

                console.log("No subreddits match the search query!");
                
            }
        },
        error: function() {
            alert("Something didn't work!");
        }
    },
);

};

// this is to alert the user when they submit nothing in the search bar that they must enter a valid country
function checkCountry() {
    var inputValue = $("#search-bar").val();
    
     if (!inputValue) {
     alert("Please Enter a Valid Country!")
     location.reload();
 } 
}

searchForm.on('submit', function(event){
    event.preventDefault();
    
    var inputValue = $("#search-bar").val();
    var searchTerm = 'covid ' + inputValue;

    checkCountry();
    redditList();
    covidStats();
 
 console.log(inputValue, searchTerm);
 $('#search').children('input').val('');
})


