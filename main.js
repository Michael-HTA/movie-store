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

// ? This One Apply Movie Card and Flip Card on hover

function renderExtraMovies(categoryName, movieList) {
  const moreMoviesContainer = document.getElementById("moreMoviesContainer");
  const modalTitle = document.getElementById("moreMoviesModalLabel");
  moreMoviesContainer.innerHTML = "";
  modalTitle.textContent = `${categoryName} Movies`;

  movieList.slice(5).forEach((movie) => {
    const col = document.createElement("div");
    col.className = "col-auto mb-3";
    col.innerHTML = `
      <div class="flip-card">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="front-image">
              <img src="${movie.img}" alt="${movie.title}">
            </div>
          </div>
          <div class="flip-card-back">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-desc">${
              movie.description || "No description available."
            }</p>
            <p class="card-text">${movie.genre} • ${movie.year}</p>
          </div>
        </div>
      </div>
    `;
    col.querySelector(".flip-card").addEventListener("click", () => {
      showMovieModal(movie);
    });

    moreMoviesContainer.appendChild(col);
  });
}

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

// ? Declare div tag we want to apply
const mostPopularContainer = document.getElementById("mostPopularContainer");

// ? fetch data from json file
fetch("/json/popularMovie.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    return response.json();
  })
  .then((PopularMovie) => {
    PopularMovie.map((movie, index) => {
      const col = document.createElement("div");
      col.className = "col-2 mb-3";

      col.innerHTML = `
        <div class="flip-card">
            <div class="flip-card-inner">
            <div class="flip-card-front">
                <div class="front-image">
                <img src="${movie.img}" alt="${movie.title}">
                </div>
            </div>
            <div class="flip-card-back">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-desc">${
                  movie.description || "No description available."
                }</p>
                <p class="card-text">${movie.genre} • ${movie.year}</p>
            </div>
            </div>
        </div>
      `;

      col.querySelector(".flip-card").addEventListener("click", () => {
        showMovieModal(movie);
      });

      // ! Change this onclick function's args to add more movies categories  ("Most Popular", PopularMovie)
      if (index < 5) {
        mostPopularContainer.appendChild(col);
      } else if (index === 5) {
        const seeMoreCol = document.createElement("div");
        seeMoreCol.className = "col-auto m-auto";
        seeMoreCol.innerHTML = `
          <button class="border-0 bg-transparent text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#moreMoviesModal"
                  onclick='renderExtraMovies("Most Popular", ${JSON.stringify(
                    PopularMovie
                  )})'>   
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
            </svg>
            <p>See More</p>
          </button>
        `;
        mostPopularContainer.appendChild(seeMoreCol);
      }
    });
  })
  .catch((error) => {
    console.error("Error loading comedy movies:", error);
  });

// // ? Declare div tag we want to apply
const comedyContainer = document.getElementById("comedyContainer");

fetch("/json/comedyMovie.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    return response.json();
  })
  .then((comedyMovie) => {
    comedyMovie.map((movie, index) => {
      const col = document.createElement("div");
      col.className = "col-2 mb-3";

      col.innerHTML = `
    <div class="flip-card">
        <div class="flip-card-inner">
        <div class="flip-card-front">
            <div class="front-image">
            <img src="${movie.img}" alt="${movie.title}">
            </div>
        </div>
        <div class="flip-card-back">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-desc">${
              movie.description || "No description available."
            }</p>
            <p class="card-text">${movie.genre} • ${movie.year}</p>
        </div>
        </div>
    </div>
    `;
      // ! Change this onclick function's args to add more movies categories  ("Comedy", comedyMovie)
      if (index < 5) {
        comedyContainer.appendChild(col);
      } else if (index === 5) {
        const seeMoreCol = document.createElement("div");
        seeMoreCol.className = "col-auto m-auto";
        seeMoreCol.innerHTML = `
      <button class="border-0 bg-transparent text-white"
              data-bs-toggle="modal"
              data-bs-target="#moreMoviesModal"

              onclick='renderExtraMovies("Comedy", comedyMovie)'>
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
        </svg>
        <p>See More</p>
      </button>
    `;
        comedyContainer.appendChild(seeMoreCol);
      }
    });
  })
  .catch((error) => {
    console.error("Error loading comedy movies:", error);
  });

// // ? Declare div tag we want to apply
// const superHeroesContainer = document.getElementById("superHeroesContainer");

// //  * Now Implementation
