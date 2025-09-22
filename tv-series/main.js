const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const hamburgerBtn = document.querySelector(".navbar-toggler");
const hamburgerIcon = document.querySelector(".sidebar-hamburger-icon");
const closeSidebar = document.getElementById("closeSidebar");

// Open sidebar
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

function showMovieModal(movie) {
  const modalTitle = document.getElementById("movieDetailModalLabel");
  const modalImg = document.getElementById("modal-movie-img");
  const modalDescription = document.getElementById("modal-movie-description");
  const modalGenreYear = document.getElementById("modal-movie-genre-year");

  modalTitle.textContent = movie.title;
  modalImg.src = movie.img;
  modalImg.alt = movie.title;
  modalDescription.textContent =
    movie.description || "No description available.";
  modalGenreYear.textContent = `${movie.genre} • ${movie.year}`;

  const movieModal = new bootstrap.Modal(
    document.getElementById("movieDetailModal")
  );
  movieModal.show();
}

const actionTvSeriesContainer = document.getElementById(
  "actionTvSeriesContainer"
);
// const tvLoader = document.getElementById("tv-loader");

let actionTvSeriesData = [];

fetch("../json/tvSeries.json")
  .then((res) => res.json())
  .then((TvSeries) => {
    actionTvSeriesData = TvSeries;

    setTimeout(() => {
      // if (tvLoader) tvLoader.remove();

      TvSeries.forEach((movie) => {
        const col = document.createElement("div");
        col.className = "col-6 col-md-3 col-lg-2 mb-3";
        col.innerHTML = `
          <div class="movie-card" role="button">
            <img src="../${movie.img}" alt="${movie.title}" class="img-fluid" />
            <h6 class="mt-2">${movie.title}</h6>
            <p class="small text-muted">${movie.genre} • ${movie.year}</p>
          </div>
        `;

        col.querySelector(".movie-card").addEventListener("click", () => {
          // showMovieModal({
          //   ...movie,
          //   img: `../${movie.img}`,
          // });
          window.location.href =
            "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";
        });

        actionTvSeriesContainer.appendChild(col);
      });
    });
  })
  .catch((err) => {
    console.error("Failed to load action movies:", err);
  });

const form = document.getElementById("movie-search-form");
const input = document.getElementById("search-input");
const resultsContainer = document.getElementById("search-results");
const searchOverlay = document.getElementById("search-overlay");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const query = input.value.trim().toLowerCase();
  resultsContainer.innerHTML = "";

  if (query.length === 0) {
    resultsContainer.style.display = "none";
    searchOverlay.classList.remove("active");
    return;
  }

  fetch("./json/movies.json")
    .then((response) => response.json())
    .then((movies) => {
      const filtered = movies.filter((movie) =>
        movie.title.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        resultsContainer.innerHTML = `<div class="list-group-item">No results found</div>`;
      } else {
        filtered.forEach((movie) => {
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
          item.addEventListener("click", function (e) {
            e.preventDefault();
            // showMovieModal(movie);
            window.location.href =
              "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";
          });
          resultsContainer.appendChild(item);
        });
      }

      resultsContainer.style.display = "block";
      searchOverlay.classList.add("active");
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
      resultsContainer.innerHTML = `<div class="list-group-item text-danger">Error loading data</div>`;
      resultsContainer.style.display = "block";
      searchOverlay.classList.add("active");
    });
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    resultsContainer.style.display = "none";
    searchOverlay.classList.remove("active");
  }
});

searchOverlay.addEventListener("click", () => {
  resultsContainer.style.display = "none";
  searchOverlay.classList.remove("active");
});
