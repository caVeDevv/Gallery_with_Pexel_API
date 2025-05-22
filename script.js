//Variables

const authc = "jPudEfzLJyFj7lAhHu1XM8GUeSssplklyN6Q2EvRKXgwwISKspcTgi2L";
const gaLery = document.querySelector(".gallery"),
  inputSearch = document.querySelector(".search-input"),
  form = document.querySelector(".search"),
  rowDivs = document.querySelectorAll(".row-div"),
  moRe = document.querySelector(".more");
let searchValue;
let currentSearch;
let page = 1;
let fetchLink;

// General function to pick fetch and search
async function fetchApi(url) {
  const datFetch = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: authc,
    },
  });
  const data = await datFetch.json();
  return data;
}

//fetch images
async function fetchData() {
  // modified for load more
  fetchLink = "https://api.pexels.com/v1/curated?per_page=9&page=1";
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

// fetch saved word
async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=9&page=1`;
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

// Function to generate images
function generatePhotos(data) {
  data.photos.forEach((photo) => {
    const galleryEng = document.createElement("div");
    galleryEng.classList.add("gallery-img");
    galleryEng.innerHTML = `
    <div class="img-container">
      <div class="loader"></div>
      <img src="${photo.src.large}" class="loud" onload="this.previousElementSibling.style.display='none'; this.style.display='block';"/>
    </div>
  `;

    gaLery.appendChild(galleryEng);
  });
}
//   <a href='${photo.src.original}'>Download</a>
//   <p>${photo.photographer}</p>

// Function for clear
function clear() {
  gaLery.innerHTML = "";
}

//Event Listeners

form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
inputSearch.addEventListener("input", updateInput);
function updateInput(e) {
  searchValue = e.target.value;
}

//For more
moRe.addEventListener("click", loadMore);
async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=9&page=${page}`;
  } else {
    // console.log(page);
    fetchLink = `https://api.pexels.com/v1/curated?per_page=9&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePhotos(data);
}

fetchData();
