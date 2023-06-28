const watchListMovies = document.querySelector(".watchlist-movies");
const popup = document.querySelector(".popup");
const API_KEY = "681102c3";

getKeys();

function getKeys() {
  watchListMovies.innerHTML = "";
  if (localStorage.length == 0) {
    watchListMovies.innerHTML = `
      <div class="icon">
        <span>
          <i class="fa-solid fa-clapperboard"></i>
        </span>
        <p>No Items Added To WatchList</p>
      </div>
    `;
  }
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    renderMovie(JSON.parse(localStorage.getItem(key)));
  }
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
            <button class="remove" data-imdbID=${movieData.imdbID}>Remove</button>
            </div>
          </div>
          <p class="description">${movieData.Plot}</p>
        </div>
      </div>
    `;
  watchListMovies.innerHTML += html;
  // Event Listener for Remove button.
  const removeBtn = document.querySelectorAll(".remove");
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      localStorage.removeItem(e.target.dataset.imdbid);
      popup.innerHTML = `
          <p class="popup-msg">Removed From Watchlist</p>
        `;
      popup.classList.add("visible");
      popup.classList.add("removed");
      setTimeout(() => {
        popup.classList.remove("visible");
        popup.classList.remove("removed");
      }, 2000);
      getKeys();
    });
  });
}
