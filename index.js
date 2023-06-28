const form = document.querySelector(".formEl");
const searchBox = document.querySelector("#movieSearch");
const moviesDiv = document.querySelector(".movies");
const popup = document.querySelector(".popup");

const API_KEY = "681102c3";
// For Search
// searchAPI = "https://www.omdbapi.com/?s";
// For Title search
// titleAPI = "https://www.omdbapi.com/?t";
// searchWithIdAPI = "https://www.omdbapi.com/?i";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  moviesDiv.innerHTML = "";
  const movie = searchBox.value;
  fetch(`https://www.omdbapi.com/?s=${movie}&apikey=${API_KEY}`)
    .then((res) => res.json())
    .then((data) => {
      handleSearchData(data.Search);
    });
});

function handleSearchData(searchData) {
  searchData.forEach((search) => {
    const movieTitle = search.Title;
    fetch(`https://www.omdbapi.com/?t=${movieTitle}&apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        renderMovie(data);
      });
  });
}

function renderMovie(movieData) {
  let html = `
    <div class="movie">
      <img
        src=${movieData.Poster}
        alt="poster"
        class="poster"
      />
      <div class="movie-info">
        <div class="head">
          <h3>${movieData.Title}</h3>
          <p>${movieData.imdbRating}</p>
        </div>
        <div class="actions">
          <p>${movieData.Runtime}</p>
          <p>${movieData.Genre}</p>
          <div class="watchlist">
          <!-- ICON -->
          <i class="fa-solid fa-circle-check watchlist-icon"></i>
          <button class="watchListBtn" data-imdbID=${movieData.imdbID}>WatchList</button>
          </div>
        </div>
        <p class="description">${movieData.Plot}</p>
      </div>
    </div>
  `;

  moviesDiv.innerHTML += html;
  // Event Listener for Add To Watchlist Functionality
  const watchListBtn = document.querySelectorAll(".watchListBtn");
  watchListBtn.forEach((btn) => {
    // <i class="fa-solid fa-circle-check fa-bounce"></i>
    btn.addEventListener("click", (e) => {
      const imdbId = e.target.dataset.imdbid;
      fetch(`https://www.omdbapi.com/?i=${imdbId}&apikey=${API_KEY}`)
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem(`${imdbId}`, JSON.stringify(data));
        });
      // Display/Hide POPUP
      popup.innerHTML = `
          <p class="popup-msg">Added To Watchlist</p>
        `;
      popup.classList.add("visible");
      setTimeout(() => {
        popup.classList.remove("visible");
      }, 2000);
    });
  });
}
