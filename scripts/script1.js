const searchBtn = document.querySelector("#search-btn");
const content = document.querySelector(".content");
const searchBarInput = document.querySelector("#input");

// searchBarInput.addEventListener("keypress", (e) => {
//   if (e.key === "Enter") {
//     search();
//   }
// });

// document.addEventListener("click", (e) => {
//   console.log(e.target.dataset.id);
// });

searchBtn.addEventListener("click", function search() {
  let titleArray = [];
  // console.log(searchBarInput.value);
  fetch(`https://www.omdbapi.com/?apikey=98ae7670&s=${searchBarInput.value}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.Search);
      for (let obj of data.Search) {
        // console.log(obj);
        titleArray.push(obj.Title);
      }
      console.log(titleArray);
      fetchMovieData(titleArray);
    });
  // fetchMovieData(searchBarInput.value);
  searchBarInput.value = "";
});

const fetchMovieData = async (titleArray) => {
  let movieDataArray = [];
  for (let title of titleArray) {
    // console.log(title);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=98ae7670&t=${title}`
      );
      const data = await res.json();
      // console.log(data);
      movieDataArray.push(data);
      // renderMovies(data);
    } catch (error) {
      console.error("An error occurred while fetching the data: ", error);
    }
  }
  console.log(movieDataArray);
  renderMovies(movieDataArray);
};

function renderMovies(movieDataArray) {
  let contentHtml = "";
  // console.log(movieDataArray);
  for (let movieObj of movieDataArray) {
    contentHtml += `
        <div class="title h-36 w-11/12 mx-auto flex gap-4 text-white">
          <div class="poster-wrapper w-1/4">
            <img
              class="h-full w-full"
              src="${movieObj.Poster}"
              alt=""
            />
          </div>
          <div class="flex flex-col gap-y-3 w-3/4">
            <div class="title-rating flex gap-3 items-center text-[15px]">
              <h1 class="font-bold">${movieObj.Title}</h1>
              <div class="rating flex items-center justify-center gap-1">
                <svg
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <path
                    fill="#FFD43B"
                    d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                  />
                </svg>
                <p class="pt-1">${movieObj.imdbRating}</p>
              </div>
            </div>
            <div class="details flex justify-between w-48 text-sm">
              <p class="small-text">${movieObj.Year}</p>
              <p class="small-text">${movieObj.Runtime}</p>
              <div class="watchlist flex items-center gap-1 cursor-pointer text-sm">
                <svg
                  class="w-4 h-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#ffffff"
                    d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM232 344l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z"
                  />
                </svg>
      
                <p class="small-text" data-id="${movieObj.imdbID}">Watchlist</p>
              </div>
            </div>
            <div class="plot flex">
              <p class="small-text opacity-75 text-slate-300 text-sm line-clamp-3">
                ${movieObj.Plot}
              </p>
            </div>
          </div>
        </div>
        <br />
        <hr class="w-11/12 mx-auto opacity-50" />
        <br />
      `;
    content.innerHTML = contentHtml;
  }
  console.log(contentHtml);
}
// console.log(movieObj);

console.log(!movieDataArray);
