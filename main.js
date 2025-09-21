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
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerIcon.classList.remove("rotate");
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
  hamburgerIcon.classList.remove("rotate");
});

// ? This One Apply Movie Card and Flip Card on hover

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
      col.className = "col-sm-4 col-md-3 col-lg-2 mb-3";

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
        window.location.href =
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";
      });

      // ! Change this onclick function's args to add more movies categories  ("Most Popular", PopularMovie)
      if (index < 5) {
        mostPopularContainer.appendChild(col);
      }
    });
  })
  .catch((error) => {
    console.error("Error loading comedy movies:", error);
  });

// ? Declare div tag we want to apply
const comedyContainer = document.getElementById("comedyContainer");

fetch("/json/tvSeries.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch movie data");
    }
    return response.json();
  })
  .then((comedyMovie) => {
    comedyMovie.map((movie, index) => {
      const col = document.createElement("div");
      col.className = "col-sm-4 col-md-3 col-lg-2 mb-3";

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
        window.location.href =
          "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1";
      });
      // ! Change this onclick function's args to add more movies categories  ("Comedy", comedyMovie)
      if (index < 5) {
        comedyContainer.appendChild(col);
      }
    });
  })
  .catch((error) => {
    console.error("Error loading comedy movies:", error);
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
            <img src="${movie.img}" alt="${movie.title}" class="search-thumb">
            <div>
              <div class="fw-bold">${movie.title}</div>
              <small class="text-muted">${movie.genre} | ${movie.year}</small>
            </div>
          `;
          item.addEventListener("click", function (e) {
            e.preventDefault();
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
