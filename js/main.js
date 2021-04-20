var moviesList = [];
var searchList = [];


var allMoviesUrl = "https://api.themoviedb.org/3/trending/all/day?api_key=c657287b055c076418bfc63c59f64465";

getData(allMoviesUrl , moviesList);

function getData(url , array){
    var myHttp = new XMLHttpRequest();

    myHttp.open("GET", url);

    myHttp.send();


    myHttp.addEventListener("readystatechange", () => {
        if (myHttp.readyState == 4 && myHttp.status == 200) {
           array = JSON.parse(myHttp.response).results;
           displayMovies(array);
        }
    });
}




function displayMovies(list) {

    var movieItem = ``;

    for (let i = 0; i < list.length; i++) {

        if (list[i].title == undefined) {
            list[i].title = list[i].name
        }
        movieItem += ` <div class="col-md-3 my-3">
        <div class="movie position-relative">
        <img class="w-100" src="https://www.themoviedb.org/t/p/w500${list[i].poster_path}" alt="${list[i].title} image">
        <h3>${list[i].title}</h3>    
        <p>${list[i].overview}</p>
        <div class="vote position-absolute py-2 font-weight-bolder">
                            <i class="fas fa-star">
                            </i>
                            <span class="vote-num">${list[i].vote_average}</span>
                        </div>
        </div>
    </div>`
    }

    document.getElementById('moviesContainer').innerHTML = movieItem;
}



var movieSearchInput = document.getElementById('movieSearchInput');


movieSearchInput.addEventListener('keyup', getSearchedMovies)


function getSearchedMovies() {

    let searchText = movieSearchInput.value;

    var searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=c657287b055c076418bfc63c59f64465&query=${searchText}`;


    if (searchText != '') {
        getData(searchUrl , searchList);
    }else{
        
       getData(allMoviesUrl , moviesList);
    }
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

