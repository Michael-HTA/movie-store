const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const hamburgerBtn = document.querySelector(".navbar-toggler");
const hamburgerIcon = document.querySelector(".sidebar-hamburger-icon");
const closeSidebar = document.getElementById("closeSidebar");

hamburgerBtn.addEventListener("click", () => {
  sidebar.classList.add("active");
  overlay.classList.add("active");
  hamburgerIcon.classList.add("rotate");
  console.log("clicked");
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerIcon.classList.remove("rotate");
  console.log("clicked");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerIcon.classList.remove("rotate");
});

const movieDetailModalEl = document.getElementById("movieDetailModal");
const movieDetailModal =
  bootstrap.Modal.getOrCreateInstance(movieDetailModalEl);

const moreMoviesModalEl = document.getElementById("moreMoviesModal");
const moreMoviesModal = bootstrap.Modal.getOrCreateInstance(moreMoviesModalEl);

movieDetailModalEl.addEventListener("hidden.bs.modal", () => {
  const backdrops = document.querySelectorAll(".modal-backdrop");
  backdrops.forEach((backdrop) => backdrop.remove());
  document.body.classList.remove("modal-open");
  document.body.style = "";
});

function showMovieModal(movie) {
  if (moreMoviesModalEl.classList.contains("show")) {
    moreMoviesModal.hide();
  }

  document.getElementById("modal-movie-title").textContent = movie.title;
  const modalImg = document.getElementById("modal-movie-img");
  modalImg.src = movie.img;
  modalImg.alt = movie.title;
  document.getElementById("movieDetailModalLabel").textContent = movie.title;
  document.getElementById("modal-movie-description").textContent =
    movie.description || "No description available.";
  document.getElementById("modal-movie-genre").textContent =
    movie.genre || "Unknown";
  document.getElementById("modal-movie-year").textContent = movie.year || "—";
  document.getElementById("modal-movie-rating").textContent =
    movie.rating || "⭐️⭐️⭐️⭐️⭐️";


  const moreLikeThis = document.getElementById("modal-more-like-this");
  moreLikeThis.innerHTML = "";

  fetch("/json/movies.json")
    .then((res) => res.json())
    .then((allMovies) => {
      const fullMovie = allMovies.find((m) => m.title === movie.title);
      const suggestions = fullMovie?.similar?.slice(0, 6) || [];

      suggestions.forEach((sim) => {
        const card = document.createElement("div");
        card.className = "flip-card";
        card.innerHTML = `
          <div class="flip-card-inner">
            <div class="flip-card-front">
              <div class="front-image">
                <img src="${sim.img}" alt="${sim.title}" />
              </div>
            </div>
            <div class="flip-card-back">
              <h5 class="card-title">${sim.title}</h5>
              <p class="card-desc">${sim.genre || ""}</p>
              <p class="card-text">${sim.description || ""}</p>
              <button class="btn btn-danger mt-2">Watch</button>
            </div>
          </div>`;

        card.querySelector(".btn").addEventListener("click", () => {
          showMovieModal(sim);
        });

        moreLikeThis.appendChild(card);
        console.log(moreLikeThis);
      });

      console.log("Similar movies fetched and displayed.");
    })
    .catch((err) => {
      console.error(" Error fetching similar movies:", err);
      moreLikeThis.innerHTML =
        "<p class='text-danger'>Failed to load similar movies.</p>";
    });

  movieDetailModal.show();
}

const movieDataStore = {};

function renderExtraMovies(categoryName, movieList) {
  const moreMoviesContainer = document.getElementById("moreMoviesContainer");
  const modalTitle = document.getElementById("moreMoviesModalLabel");
  moreMoviesContainer.innerHTML = "";
  modalTitle.textContent = `${categoryName} Movies`;

  movieList.slice(5).map((movie) => {
    const col = document.createElement("div");
    col.className = "col-6 col-sm-4 col-md-3 col-lg-2 mb-3";
    col.innerHTML = `
      <div class="movie-card" role="button">
        <img src="${movie.img}" alt="${movie.title}" class="img-fluid" />
        <h6 class="mt-2">${movie.title}</h6>
        <p class="small text-muted">${movie.genre} • ${movie.year}</p>
      </div>`;
    col.querySelector(".movie-card").addEventListener("click", () => {
      showMovieModal(movie);
    });
    moreMoviesContainer.appendChild(col);
  });
}

function loadMovies({ url, container, limit = 5, genre, seeMoreButtonId }) {
  fetch(url)
    .then((res) => res.json())
    .then((movies) => {
      movieDataStore[genre] = movies;
      movies.slice(0, limit).forEach((movie) => {
        const col = document.createElement("div");
        col.className = "col-6 col-sm-4 col-md-3 col-lg-2 mb-3";
        col.innerHTML = `
          <div class="movie-card" role="button">
            <img src="../${movie.img}" alt="${movie.title}" class="img-fluid" />
            <h6 class="mt-2">${movie.title}</h6>
            <p class="small text-muted">${movie.genre} • ${movie.year}</p>
          </div>`;
        col.querySelector(".movie-card").addEventListener("click", () => {
          showMovieModal({ ...movie, img: `../${movie.img}` });
        });
        container.appendChild(col);
      });
      if (seeMoreButtonId) {
        document
          .getElementById(seeMoreButtonId)
          .addEventListener("click", () => handleSeeMoreClick(genre));
      }
    })
    .catch((err) => console.error(`Error loading ${genre} movies:`, err));
}

function handleSeeMoreClick(genre) {
  const movies = movieDataStore[genre];
  if (!movies) {
    console.warn(`No data found for genre: ${genre}`);
    return;
  }

  const fixedData = movies.map((movie) => ({
    ...movie,
    img: `../${movie.img}`,
  }));

  renderExtraMovies(genre, fixedData);
}

loadMovies({
  url: "../json/actionMovie.json",
  container: actionMoviesContainer,
  limit: 5,
  genre: "Action",
  seeMoreButtonId: "actionSeeMore",
});

loadMovies({
  url: "../json/comedyMovie.json",

  container: comedyMoviesContainer,
  limit: 5,
  genre: "Comedy",
  seeMoreButtonId: "comedySeeMore",
});

loadMovies({
  url: "../json/horrorMovie.json",

  container: horrorMovieContainer,
  limit: 5,
  genre: "Horror",
  seeMoreButtonId: "horrorSeeMore",
});

loadMovies({
  url: "../json/romanceMovie.json",

  container: romanceMovieContainer,
  limit: 5,
  genre: "Romance",
  seeMoreButtonId: "romanceSeeMore",
});

// DOM Elements
const form = document.getElementById("movie-search-form");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");
const searchOverlay = document.getElementById("search-overlay");

form.addEventListener("submit", handleSearchSubmit);
document.addEventListener("keydown", handleEscapeKey);
searchOverlay.addEventListener("click", closeSearchResults);

function handleSearchSubmit(e) {
  e.preventDefault();

  const query = input.value.trim().toLowerCase();
  resultsContainer.innerHTML = "";

  if (query.length === 0) {
    closeSearchResults();
    return;
  }

  performSearch(query);
}

function performSearch(query) {
  fetch("/json/movies.json")
    .then((res) => res.json())
    .then((movies) => {
      const results = filterMovies(movies, query);
      displaySearchResults(results);
    })
    .catch((err) => {
      console.error("Error fetching movies:", err);
      showError("Error loading data");
    });
}

function filterMovies(movies, query) {
  return movies.filter((movie) => movie.title.toLowerCase().includes(query));
}

function displaySearchResults(movies) {
  resultsContainer.innerHTML = "";

  if (movies.length === 0) {
    resultsContainer.innerHTML = `<div class="list-group-item">No results found</div>`;
  } else {
    movies.map((movie) => {
      const item = createSearchResultItem(movie);
      resultsContainer.appendChild(item);
    });
  }

  resultsContainer.style.display = "block";
  searchOverlay.classList.add("active");
}

// Create individual search result element
function createSearchResultItem(movie) {
  const item = document.createElement("a");
  item.className =
    "list-group-item list-group-item-action d-flex align-items-start gap-3";
  item.href = "#";
  item.innerHTML = `
    <img src="../${movie.img}" alt="${movie.title}" class="search-thumb">
    <div>
      <div class="fw-bold">${movie.title}</div>
      <small class="text-muted">${movie.genre} | ${movie.year}</small>
    </div>
  `;
  item.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href =
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";
  });

  return item;
}

// Handle Escape key to close overlay
function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeSearchResults();
  }
}

// Close search results and overlay
function closeSearchResults() {
  resultsContainer.style.display = "none";
  searchOverlay.classList.remove("active");
}

// Show error message
function showError(message) {
  resultsContainer.innerHTML = `<div class="list-group-item text-danger">${message}</div>`;
  resultsContainer.style.display = "block";
  searchOverlay.classList.add("active");
}
