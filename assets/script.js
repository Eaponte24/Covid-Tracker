var searchBtn = document.querySelector("#searchBtn");
var searchForm = $('#search');
var tableBody = document.getElementById('repo-table');


function covidStats() {

// Covid tracker HISTORY API
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://covid-193.p.rapidapi.com/history?country=usa&day=2020-06-02",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "355da21f74msh0c6c414fadadee4p1fe140jsn8c17d86b7d33",
		"X-RapidAPI-Host": "covid-193.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
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
                    $.each(responseData.data.children, function(idx, searchResult) {
                        for (let i = 0; i < responseData.data.children.length; i++) {
                            
                          
                          
                        var createTableRow = document.createElement('tr');
                        var tableData = document.createElement('td');
                        var link = document.createElement('a');

       
                        link.textContent = responseData.data.children[i].data.title;
                        link.href = responseData.data.children[i].data.url;

        
                        tableData.appendChild(link);
                        createTableRow.appendChild(tableData);
                        tableBody.appendChild(createTableRow);
                        }

                        console.log("--- Title of Subreddit: " + searchResult.data.title);
                });
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


searchForm.on('submit', function(event){
    event.preventDefault();
    
    var inputValue = $("#search-bar").val();
    var searchTerm = 'covid ' + inputValue;

    redditList();

 console.log(inputValue, searchTerm);
})