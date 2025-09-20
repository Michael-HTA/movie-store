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

function renderExtraMovies(categoryName, movieList) {
  const moreMoviesContainer = document.getElementById("moreMoviesContainer");
  const modalTitle = document.getElementById("moreMoviesModalLabel");
  moreMoviesContainer.innerHTML = "";
  modalTitle.textContent = `${categoryName} Movies`;

  movieList.slice(5).map((movie) => {
    const col = document.createElement("div");
    col.className = "col-2 mb-3";
    col.innerHTML = `
      <div class="movie-card" role="button">
        <img src="${movie.img}" alt="${movie.title}" class="img-fluid" />
        <h6 class="mt-2">${movie.title}</h6>
        <p class="small text-muted">${movie.genre} • ${movie.year}</p>
      </div>
    `;
    col.querySelector(".movie-card").addEventListener("click", () => {
      showMovieModal(movie);
    });

    moreMoviesContainer.appendChild(col);
  });
}

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

  document.getElementById("movieDetailModalLabel").textContent = movie.title;
  const modalImg = document.getElementById("modal-movie-img");
  modalImg.src = movie.img;
  modalImg.alt = movie.title;

  document.getElementById("modal-movie-description").textContent =
    movie.description || "No description available.";

  document.getElementById(
    "modal-movie-genre-year"
  ).textContent = `${movie.genre} • ${movie.year}`;

  movieDetailModal.show();
}

const actionMoviesContainer = document.getElementById("actionMoviesContainer");

let actionMovieData = [];

fetch("/json/actionMovie.json")
  .then((res) => res.json())
  .then((ActionMovie) => {
    actionMovieData = ActionMovie;

    ActionMovie.map((movie, index) => {
      const col = document.createElement("div");
      col.className = "col-2 mb-3";
      col.innerHTML = `
        <div class="movie-card" role="button">
          <img src="../${movie.img}" alt="${movie.title}" class="img-thumbnail" />
          <h6 class="mt-2">${movie.title}</h6>
          <p class="small text-muted">${movie.genre} • ${movie.year}</p>
        </div>
      `;
      col.querySelector(".movie-card").addEventListener("click", () => {
        showMovieModal({
          ...movie,
          img: `../${movie.img}`,
        });
      });

      if (index < 5) {
        actionMoviesContainer.appendChild(col);
      }
    });
  })
  .catch((err) => {
    console.error("Failed to load action movies:", err);
  });

document.getElementById("actionSeeMore").addEventListener("click", () => {
  const fixedData = actionMovieData.map((movie) => ({
    ...movie,
    img: `../${movie.img}`,
  }));

  renderExtraMovies("Action and Adventure", fixedData);
});

const comedyMoviesContainer = document.getElementById("comedyMoviesContainer");

let comedyMovieData = [];

fetch("/json/comedyMovie.json")
  .then((res) => res.json())
  .then((comedyMovie) => {
    comedyMovieData = comedyMovie;
    console.log(comedyMovie);

    comedyMovie.map((movie, index) => {
      const col = document.createElement("div");
      col.className = "col-2 mb-3";
      col.innerHTML = `
        <div class="movie-card" role="button">
          <img src="../${movie.img}" alt="${movie.title}" class="img-fluid" />
          <h6 class="mt-2">${movie.title}</h6>
          <p class="small text-muted">${movie.genre} • ${movie.year}</p>
        </div>
      `;
      col.querySelector(".movie-card").addEventListener("click", () => {
        showMovieModal({
          ...movie,
          img: `../${movie.img}`,
        });
      });

      if (index < 5) {
        comedyMoviesContainer.appendChild(col);
      }
    });
  })
  .catch((err) => {
    console.error("Failed to load action movies:", err);
  });

document.getElementById("comedySeeMore").addEventListener("click", () => {
  const fixedData = comedyMovieData.map((movie) => ({
    ...movie,
    img: `../${movie.img}`,
  }));

  renderExtraMovies("Comedy", fixedData);
});

const horrorMovieContainer = document.getElementById("horrorMovieContainer");

let horrorMovieData = [];

fetch("/json/horrorMovie.json")
  .then((res) => res.json())
  .then((horrorMovie) => {
    horrorMovieData = horrorMovie;
    console.log(horrorMovie);

    horrorMovie.map((movie, index) => {
      const col = document.createElement("div");
      col.className = "col-2 mb-3";
      col.innerHTML = `
        <div class="movie-card" role="button">
          <img src="../${movie.img}" alt="${movie.title}" class="img-fluid" />
          <h6 class="mt-2">${movie.title}</h6>
          <p class="small text-muted">${movie.genre} • ${movie.year}</p>
        </div>
      `;
      col.querySelector(".movie-card").addEventListener("click", () => {
        showMovieModal({
          ...movie,
          img: `../${movie.img}`,
        });
      });

      if (index < 5) {
        horrorMovieContainer.appendChild(col);
      }
    });
  })
  .catch((err) => {
    console.error("Failed to load action movies:", err);
  });

document.getElementById("horrorSeeMore").addEventListener("click", () => {
  const fixedData = horrorMovieData.map((movie) => ({
    ...movie,
    img: `../${movie.img}`,
  }));

  renderExtraMovies("Comedy", fixedData);
});

const romanceMovieContainer = document.getElementById("romanceMovieContainer");

let romanceMovieData = [];

fetch("/json/romanceMovie.json")
  .then((res) => res.json())
  .then((romanceMovie) => {
    romanceMovieData = romanceMovie;
    console.log(romanceMovie);

    romanceMovie.map((movie, index) => {
      const col = document.createElement("div");
      col.className = "col-2 mb-3";
      col.innerHTML = `
        <div class="movie-card" role="button">
          <img src="../${movie.img}" alt="${movie.title}" class="img-fluid" />
          <h6 class="mt-2">${movie.title}</h6>
          <p class="small text-muted">${movie.genre} • ${movie.year}</p>
        </div>
      `;
      col.querySelector(".movie-card").addEventListener("click", () => {
        showMovieModal({
          ...movie,
          img: `../${movie.img}`,
        });
      });

      if (index < 5) {
        romanceMovieContainer.appendChild(col);
      }
    });
  })
  .catch((err) => {
    console.error("Failed to load action movies:", err);
  });

document.getElementById("romanceSeeMore").addEventListener("click", () => {
  const fixedData = romanceMovieData.map((movie) => ({
    ...movie,
    img: `../${movie.img}`,
  }));

  renderExtraMovies("Comedy", fixedData);
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

  fetch("/json/movies.json")
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
            showMovieModal(movie);
            resultsContainer.style.display = "none";
            searchOverlay.classList.remove("active");
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
