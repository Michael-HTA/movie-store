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

const mostPopularMovie = [
  {
    title: "The Dark Knight",
    genre: "Action",
    year: 2008,
    img: "images/psa/IMDb/The Dark Knight (2008).jpg",
    description: "Batman faces the Joker, a criminal mastermind.",
  },
  {
    title: "BetterCallSaul",
    genre: "Sci-Fi",
    year: 2010,
    img: "images/hta/americanTvSeries/BetterCallSaul.jpg",
    description:
      "An elite FBI team profiles serial killers and solves complex crimes using psychological analysis.",
  },
  {
    title: "CriminalMinds",
    genre: "Sci-Fi",
    year: 2014,
    img: "images/hta/americanTvSeries/CriminalMinds.jpg",
    description:
      "Noble families vie for power in the Seven Kingdoms while an ancient threat rises beyond the Wall.",
  },
  {
    title: "GameOfThrone",
    genre: "Drama",
    year: 2019,
    img: "images/hta/americanTvSeries/GameOfThrone.jpg",
    description:
      "Rival houses clash over the Iron Throne as winter draws near and alliances are tested.",
  },

  {
    title: "IT",
    genre: "Horror",
    year: 2019,
    img: "images/etza/horror/it(2017).jpg",
  },
  {
    title: "Notebook",
    genre: "Drama",
    year: 2019,
    img: "images/etza/romance/the_notebook.jpg",
  },
];

const comedyMovie = [
  {
    title: "The Dark Knight",
    genre: "Comedy",
    year: 2004,
    img: "images/psa/Comedy/50 First Dates (2004).jpg",
    description: "Batman faces the Joker, a criminal mastermind.",
  },
  {
    title: "BetterCallSaul",
    genre: "Sci-Fi",
    year: 2010,
    img: "images/psa/Comedy/European Gigolo (2005) .jpg",
    description:
      "An elite FBI team profiles serial killers and solves complex crimes using psychological analysis.",
  },
  {
    title: "CriminalMinds",
    genre: "Sci-Fi",
    year: 2014,
    img: "images/psa/Comedy/Anger Management (2003).jpg",
    description:
      "Noble families vie for power in the Seven Kingdoms while an ancient threat rises beyond the Wall.",
  },
  {
    title: "GameOfThrone",
    genre: "Drama",
    year: 2019,
    img: "images/psa/Comedy/Baby's Day Out (1994).jpg",
    description:
      "Rival houses clash over the Iron Throne as winter draws near and alliances are tested.",
  },

  {
    title: "GameOfThrone",
    genre: "Drama",
    year: 2019,
    img: "images/psa/Comedy/Billy Madison (1995).jpg",
  },
  {
    title: "GameOfThrone",
    genre: "Drama",
    year: 2019,
    img: "images/psa/Comedy/European Gigolo (2005) .jpg",
  },
];

const mostPopularContainer = document.getElementById("mostPopularContainer");

mostPopularMovie.forEach((movie) => {
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

  mostPopularContainer.appendChild(col);
});

const comedyContainer = document.getElementById("comedyContainer");

comedyMovie.forEach((movie) => {
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

  comedyContainer.appendChild(col);
});

// ? This One Apply Movie Card and Flip Card on hover

const moreMoviesContainer = document.getElementById("moreMoviesContainer");
const modalTitle = document.getElementById("moreMoviesModalLabel");
function renderExtraMovies(categoryName, movieList) {
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
    moreMoviesContainer.appendChild(col);
  });
}

// ? Declare div tag we want to apply
const superHeroesContainer = document.getElementById("superHeroesContainer");

//  * Now Implementation
