let resultsContainer = document.getElementsByClassName("container")[0];
//todo to make the closure we made a global vars for the search value and the input field.
let inputField;
let searchValue;

//todo debounce function
function debounce(func, timeout = 700) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

//todo closure
const displayArticles = debounce(() => generateResults(), 700);

const validateInput = (el) => {
  if (el.value === "") {
    resultsContainer.innerHTML =
      "<p>Type something in the above search input</p>";
  } else {
    //todo initializing the search value and the input field we make so we can use them to get the articles
    searchValue = el.value;
    inputField = el;

    //todo invoking the closure we made
    displayArticles();
  }
};

const generateResults = () => {
  fetch(
    "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
      searchValue
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data.query.search;
      let numberOfResults = data.query.search.length;
      resultsContainer.innerHTML = "";
      for (let i = 0; i < numberOfResults; i++) {
        let result = document.createElement("div");
        result.classList.add("results");
        result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `;
        resultsContainer.appendChild(result);
      }
      if (inputField.value === "") {
        resultsContainer.innerHTML =
          "<p>Type something in the above search input</p>";
      }
    });
};
