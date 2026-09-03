// ======================================
// LOGIN PROTECTION
// ======================================

const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {

    alert("Please login first to access movie booking.");

    window.location.replace("login.html");

}


// ======================================
// TMDB CONFIGURATION
// ======================================

const TMDB_API_KEY = "fadd39bd5b4d9620e9b9dd16af3e5949";

const TMDB_BASE_URL =
    "https://api.themoviedb.org/3";


// ======================================
// BOOK MOVIE
// ======================================

document.getElementById("movieForm").addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();

        let customerName =
            document.getElementById("customerName").value.trim();

        let movieName =
            document.getElementById("movieName").value.trim();

        let theatreName =
            document.getElementById("theatreName").value.trim();

        let showTime =
            document.getElementById("showTime").value;

        let seats =
            document.getElementById("seats").value;


        if (
            customerName === "" ||
            movieName === "" ||
            theatreName === "" ||
            showTime === "" ||
            seats === ""
        ) {

            alert("Please fill all fields.");
            return;

        }


        let movie = {

            customerName: customerName,
            movieName: movieName,
            theatreName: theatreName,
            showTime: showTime,
            seats: parseInt(seats)

        };


        try {

            let response = await fetch(
                "https://reservix-backend.onrender.com/movie/book",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(movie)

                }
            );


            let result = await response.text();

            alert(result);


            if (response.ok) {

                document
                    .getElementById("movieForm")
                    .reset();

                loadBookings();

            }

        }

        catch (error) {

            console.error(error);

            alert("Unable to connect to server.");

        }

    }
);


// ======================================
// LOAD BOOKINGS
// ======================================

async function loadBookings() {

    try {

        let response =
            await fetch("https://reservix-backend.onrender.com/movie/view");


        if (!response.ok) {

            throw new Error(
                "Unable to load bookings"
            );

        }


        let movies =
            await response.json();


        let output = "";


        if (movies.length === 0) {

            output = `

                <tr>

                    <td colspan="7">

                        No Movie Bookings Found

                    </td>

                </tr>

            `;

        }

        else {

            movies.forEach(movie => {

                output += `

                    <tr>

                        <td>${movie.id}</td>

                        <td>${movie.customerName}</td>

                        <td>${movie.movieName}</td>

                        <td>${movie.theatreName}</td>

                        <td>${movie.showTime}</td>

                        <td>${movie.seats}</td>

                        <td>

                            <button
                                class="edit-btn"
                                onclick="editMovie(${movie.id})">

                                Edit

                            </button>

                            <button
                                class="delete-btn"
                                onclick="deleteMovie(${movie.id})">

                                Delete

                            </button>

                        </td>

                    </tr>

                `;

            });

        }


        document.getElementById(
            "bookingResult"
        ).innerHTML = output;

    }

    catch (error) {

        console.error(error);

    }

}


// ======================================
// DELETE MOVIE
// ======================================

async function deleteMovie(id) {

    if (
        !confirm(
            "Are you sure you want to delete this booking?"
        )
    ) {

        return;

    }


    try {

        let response = await fetch(

            "https://reservix-backend.onrender.com/movie/delete/" + id,

            {
                method: "DELETE"
            }

        );


        let result =
            await response.text();


        alert(result);

        loadBookings();

    }

    catch (error) {

        console.error(error);

    }

}


// ======================================
// EDIT MOVIE
// ======================================

function editMovie(id) {

    alert(
        "Edit feature will be added in the next version."
    );

}


// ======================================
// LOAD MOVIES FROM TMDB
// ======================================

async function loadMoviesByCategory(type) {

    const movieCards =
        document.getElementById("movieCards");

    const heading =
        document.getElementById("movieCategoryTitle");


    movieCards.innerHTML = `

        <h2 style="text-align:center;">
            Loading Movies...
        </h2>

    `;


    let endpoint = "";


    switch (type) {

        case "popular":

            endpoint = "/movie/popular";

            heading.innerHTML =
                "🔥 Popular Movies";

            break;


        case "now-playing":

            endpoint = "/movie/now_playing";

            heading.innerHTML =
                "🎬 Now Playing";

            break;


        case "top-rated":

            endpoint = "/movie/top_rated";

            heading.innerHTML =
                "⭐ Top Rated Movies";

            break;


        case "trending":

            endpoint = "/trending/movie/day";

            heading.innerHTML =
                "📈 Trending Movies";

            break;


        default:

            return;

    }


    try {

        const url =
            TMDB_BASE_URL +
            endpoint +
            "?api_key=" +
            TMDB_API_KEY +
            "&language=en-US&page=1";


        console.log(
            "Loading movies from:",
            url
        );


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "TMDB Error: " +
                response.status
            );

        }


        const data =
            await response.json();


        displayMovies(data);

    }

    catch (error) {

        console.error(
            "TMDB movie error:",
            error
        );


        movieCards.innerHTML = `

            <div style="
                text-align:center;
                padding:30px;
            ">

                <h3>
                    ❌ Unable to load movies
                </h3>

                <p>
                    Please check your TMDB API key.
                </p>

            </div>

        `;

    }

}


// ======================================
// LOAD MOVIES BY LANGUAGE
// ======================================

async function loadLanguage(lang) {

    const movieCards =
        document.getElementById("movieCards");

    const heading =
        document.getElementById("movieCategoryTitle");


    movieCards.innerHTML = `

        <h2 style="text-align:center;">
            Loading Movies...
        </h2>

    `;


    switch (lang) {

        case "te":

            heading.innerHTML =
                "🇮🇳 Telugu Movies";

            break;

        case "hi":

            heading.innerHTML =
                "🇮🇳 Hindi Movies";

            break;

        case "ta":

            heading.innerHTML =
                "🇮🇳 Tamil Movies";

            break;

        case "ml":

            heading.innerHTML =
                "🇮🇳 Malayalam Movies";

            break;

        case "en":

            heading.innerHTML =
                "🇬🇧 English Movies";

            break;

    }


    try {

        const url =
            TMDB_BASE_URL +
            "/discover/movie" +
            "?api_key=" +
            TMDB_API_KEY +
            "&with_original_language=" +
            lang +
            "&sort_by=popularity.desc" +
            "&language=en-US&page=1";


        const response =
            await fetch(url);


        if (!response.ok) {

            throw new Error(
                "TMDB Error: " +
                response.status
            );

        }


        const data =
            await response.json();


        displayMovies(data);

    }

    catch (error) {

        console.error(
            "TMDB language error:",
            error
        );


        movieCards.innerHTML = `

            <div style="
                text-align:center;
                padding:30px;
            ">

                <h3>
                    ❌ Unable to load movies
                </h3>

            </div>

        `;

    }

}


// ======================================
// DISPLAY MOVIES
// ======================================

function displayMovies(data) {

    const movieCards =
        document.getElementById("movieCards");


    if (
        !data ||
        !data.results ||
        data.results.length === 0
    ) {

        movieCards.innerHTML = `

            <h3 style="text-align:center;">
                No Movies Found
            </h3>

        `;

        return;

    }


    let output = "";


    data.results
        .slice(0, 8)
        .forEach(movie => {


            let poster;


            if (movie.poster_path) {

                poster =
                    "https://image.tmdb.org/t/p/w500" +
                    movie.poster_path;

            }

            else {

                poster =
                    "images/no-image.png";

            }


            let rating =
                Number(
                    movie.vote_average || 0
                ).toFixed(1);


            let releaseDate =
                movie.release_date ||
                "N/A";


            let title =
                movie.title ||
                "Unknown Movie";


            output += `

                <div class="movie-card-api">

                    <img
                        src="${poster}"
                        alt="${title}"
                    >

                    <h3>
                        ${title}
                    </h3>

                    <p>
                        ⭐ ${rating}
                    </p>

                    <p>
                        📅 ${releaseDate}
                    </p>

                    <button
                        type="button"
                        onclick='selectMovie(${JSON.stringify(title)})'
                    >

                        Select Movie

                    </button>

                </div>

            `;

        });


    movieCards.innerHTML =
        output;

}


// ======================================
// SELECT MOVIE
// ======================================

function selectMovie(movieName) {

    document.getElementById(
        "movieName"
    ).value = movieName;


    document.getElementById(
        "movieForm"
    ).scrollIntoView({

        behavior: "smooth"

    });

}


// ======================================
// ACTIVE FILTER BUTTON
// ======================================

const filterButtons =
    document.querySelectorAll(
        ".movie-filters button"
    );


filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "active-filter"
                );

            });


            this.classList.add(
                "active-filter"
            );

        }
    );

});


// ======================================
// PAGE LOAD
// ======================================

window.onload = function () {

    loadBookings();

    loadMoviesByCategory(
        "popular"
    );


    if (filterButtons.length > 0) {

        filterButtons[0].classList.add(
            "active-filter"
        );

    }

};