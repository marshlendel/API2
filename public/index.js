let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let endpoint = `https://api.giphy.com/v1/gifs/search?api_key=74T2pWlV3KDToxqoofX70vNhtJv86rit&offset=0&lang=en`;
  let rating = getRadioValue();
  let limit = getAmount();
  let searchValue = getSearchValue();
  let url = `${endpoint}&q=${searchValue}&rating=${rating}&limit=${limit}`;
  let container = document.querySelector(".row");

  removeAllChildNodes(container);

  fetch(url)
    .then((res) => res.json())
    .then((giphyData) => {
      displayGiphs(giphyData, container);
      if (giphyData.data.length < limit) {
        alert(`There's less than ${limit} GIFs that match your queries`);
      }
    });
});

let getRadioValue = () => {
  let radios = document.getElementsByName("rating");

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
    }
  }
};

let getSearchValue = () => {
  let search = document.querySelector("#search-input").value;
  return search;
};

let removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

let getAmount = () => {
  let amount = document.querySelector("#amount-input").value;
  return amount;
};

let displayGiphs = (giphyData, container) => {
  for (i in giphyData.data) {
    let image = document.createElement("img");
    let column = document.createElement("div");
    column.classList.add("col-sm-auto");
    let giph = giphyData.data[i].images.fixed_width.url;
    image.setAttribute("src", giph);
    column.appendChild(image);
    container.appendChild(column);
  }
};
