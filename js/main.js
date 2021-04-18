var myHttp = new XMLHttpRequest();

var moviesList = [];

var url = "https://api.themoviedb.org/3/trending/all/day?api_key=c657287b055c076418bfc63c59f64465";

myHttp.open("GET" , url);

myHttp.send();


myHttp.addEventListener("readystatechange" , ()=>{
    if(myHttp.readyState == 4 && myHttp.status == 200){
        moviesList = JSON.parse(myHttp.response).results;
        displayMovies();
    }
});

function displayMovies(){
    
    var movieItem =``;

    for(let i=0 ; i<moviesList.length ; i++){

        if(moviesList[i].title == undefined){
            moviesList[i].title = moviesList[i].name
        }
        movieItem += ` <div class="col-md-3 my-3">
        <div class="movie position-relative">
        <img class="w-100" src="https://www.themoviedb.org/t/p/w500${moviesList[i].poster_path}" alt="${moviesList[i].title} image">
        <h3>${moviesList[i].title}</h3>    
        <p>${moviesList[i].overview}</p>
        <div class="vote position-absolute py-2 font-weight-bolder">
                            <i class="fas fa-star">
                            </i>
                            <span class="vote-num">${moviesList[i].vote_average}</span>
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


$(".scroll-to-top").click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 2000);
  });



// scrollBtn.addEventListener('click' , ()=>{
//     window.scrollTo({
//         top: 0,
//         behavior: "smooth"
//     })
// })