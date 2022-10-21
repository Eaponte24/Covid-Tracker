// Covid tracker HISTORY API
var options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '355da21f74msh0c6c414fadadee4p1fe140jsn8c17d86b7d33',
		'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
	}
};

fetch('https://covid-193.p.rapidapi.com/history?country=usa&day=2020-06-02', options)
	.then(response => response.json())
	.then(response => console.log(response))
	.catch(err => console.error(err));


    // Reddit Api
$.ajax(
    "https://www.reddit.com/subreddits/search.json",
    {
        data: { q: searchTerm },
        success: function(responseData) {
            if (responseData.data.children.length > 0) {
                console.log('# of results: ' + responseData.data.children.length);
                $.each(responseData.data.children, function(idx, searchResult) {
                    console.log("--- Title of Subreddit: " + searchResult.data.title);
                });
            } else {
                console.log("No subreddits match the search query!");
            }
        },
        error: function() {
            alert("Something didn't work!");
        }
    }
);