const url = `https://www.omdbapi.com?apikey=d2b0e527&`

$('#searchForm').on('submit', (e) => {
    e.preventDefault();

    let searchText = $('#searchText').val();
    getMovies(searchText);
})

async function getMovies(searchText) {
    try {
        const res = await fetch(url + 's=' + searchText);
        const data = await res.json();
        let moviesArray = data.Search;
    
        let movieCard = moviesArray.map(movie => {
            return (`
            <div class="movie-card col-lg-2 col-md-6 col-12 px-0 mx-lg-3 text-center">
                <a id="details-btn" 
                    href="#" 
                    class=""
                    onclick="selectedMovie('${movie.imdbID}')"
                >
                    <img src="${movie.Poster}" alt="Poster de ${movie.Title}"  />
                    </a>
                    <h1 class="fs-5 my-3">${movie.Title}</h1>
            </div>`
            )
        });
        $('#movies').html('')
        $('#movies').append(`<h1 class="fs-5 ms-5">showing results for <span class="fs-3 text-danger">${searchText}</span></h1>`)
        $('#movies').append(movieCard.join(''))
    } catch {
        $('#movies').html('<h1 class="fs-1 text-center text-danger">Sorry, we didn&apos;t find any movies :(</h1>')
    }
}

function selectedMovie(movieId) {
    sessionStorage.setItem('movieId', movieId);
    window.location = 'movie.html';
    return false;
}

async function getSelectedMovie() {
    let movieId = sessionStorage.getItem('movieId');

    const res = await fetch(url + 'i=' + movieId);
    const movie = await res.json()

    $('#SelectedMovie').append(
        `<div class="col-md-3">
            <img class="movie-img" src="${movie.Poster}" alt="Poster of ${movie.Poster}" />
        </div>
        <div class="col-md-5 d-flex flex-column justify-content-around ps-4">
            <h2 class="fs-1 mb-3">${movie.Title}</h2>
            <ul class="list-group opacity-75">
                <li><strong>Genre:</strong> ${movie.Genre}</li>
                <li><strong>Released:</strong> ${movie.Released}</li>
                <li><strong>Rated:</strong> ${movie.Rated}</li>
                <li><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                <li><strong>Director:</strong> ${movie.Director}</li>
                <li><strong>Writer:</strong> ${movie.Writer}</li>
                <li><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
        </div>
        <div class="col-md-4 px-4 d-flex flex-column justify-content-between">
            <div class="plot rounded-3 p-3">
                <h3 class="text-center mb-3">Plot</h3>
                <p class="opacity-75">${movie.Plot}</p>
            </div>
            <div class="d-flex justify-content-center">
                <a class="btn btn-light me-2" href="https://www.imdb.com/title/${movieId}" target="_blank">IMDB Link</a>
                <a class="btn btn-outline-light" href="./index.html">Search cooler movies!</a>
            </div>
        </div>
        `
    )
}