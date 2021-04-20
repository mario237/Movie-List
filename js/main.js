var myHttp = new XMLHttpRequest();

var moviesList = [];

var url = "https://api.themoviedb.org/3/trending/all/day?api_key=c657287b055c076418bfc63c59f64465";

myHttp.open("GET", url);

myHttp.send();


myHttp.addEventListener("readystatechange", () => {
    if (myHttp.readyState == 4 && myHttp.status == 200) {
        moviesList = JSON.parse(myHttp.response).results;
        displayMovies(moviesList);
    }
});

function displayMovies(array) {

    var movieItem = ``;

    for (let i = 0; i < array.length; i++) {

        if (array[i].title == undefined) {
            array[i].title = array[i].name
        }
        movieItem += ` <div class="col-md-3 my-3">
        <div class="movie position-relative">
        <img class="w-100" src="https://www.themoviedb.org/t/p/w500${array[i].poster_path}" alt="${array[i].title} image">
        <h3>${array[i].title}</h3>    
        <p>${array[i].overview}</p>
        <div class="vote position-absolute py-2 font-weight-bolder">
                            <i class="fas fa-star">
                            </i>
                            <span class="vote-num">${array[i].vote_average}</span>
                        </div>
        </div>
    </div>`
    }

    document.getElementById('moviesContainer').innerHTML = movieItem;
}

var scrollBtn = document.querySelector('.scroll-to-top');


window.onscroll = function () { showScrollToTop() };

function showScrollToTop() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
}


$(".scroll-to-top").click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 2000);
});

var movieSearchInput = document.getElementById('movieSearchInput');

var searchList = [];

movieSearchInput.addEventListener('keyup', getMovie)

function getMovie() {

    let searchText = movieSearchInput.value;

    var searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=c657287b055c076418bfc63c59f64465&query=${searchText}`;


    if (searchText != '') {
        var myHttp2 = new XMLHttpRequest();



        myHttp2.open("GET", searchUrl);

        myHttp2.send();


        myHttp2.addEventListener("readystatechange", () => {
            if (myHttp2.readyState == 4 && myHttp2.status == 200) {
               searchList = JSON.parse(myHttp2.response).results;
               displayMovies(searchList);
            }
        });
    }else{
        displayMovies(moviesList)
    }
}






