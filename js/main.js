(function() {
  const button = document.querySelector("#new-quote");
  const body = document.querySelector("body");
  const text = document.querySelector("#text");
  const author = document.querySelector("#author");
  const shimmer = document.querySelector(".shimmer");
  const tweetButton = document.querySelector("#tweet-quote");
  const tumblrButton = document.querySelector("#tumblr-quote");
  let allQuotes = [];
  const allColors = [
    "#BB3DFC",
    "#C0CA37",
    "#F50590",
    "#6C1E2A",
    "#195CD3",
    "#2FC235",
    "#523FBE",
    "#B17565",
    "#160867",
    "#013F61",
    "#FC472D",
    "#022455",
    "#5D3C67",
    "#32E325",
    "#13B3F7",
    "#86312D"
  ];
  const quotesUrl =
    "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  // get quotes from FCC github file
  function getQuotes() {
    fetch(quotesUrl)
      .then(res => res.json())
      .then(data => {
        allQuotes = data.quotes;
        displayQuote();

        setTimeout(() => {
          shimmer.style.display = "none";
        }, 500);
        button.onclick = displayQuote;
      })
      .catch(err => console.error(err));
  }

  // return random element from passed array
  function getRandomElement(arr) {
    // generate random number
    const randomIndex = Math.floor(Math.random() * (arr.length - 1) + 1);
    // return random element
    return arr[randomIndex];
  }

  //   get random quote from array
  function getRandomQuote() {
    return getRandomElement(allQuotes);
  }

  // get random color from array
  function getRandomColor() {
    return getRandomElement(allColors);
  }

  function displayQuote() {
    let color = getRandomColor();
    let myQuote = getRandomQuote();
    text.style.opacity = 0;
    author.style.opacity = 0;
    setTimeout(() => {
      body.style.backgroundColor = color;
      button.style.backgroundColor = color;
      tweetButton.style.backgroundColor = color;
      tumblrButton.style.backgroundColor = color;
      body.style.color = color;
      text.textContent = myQuote.quote;
      text.classList.add("animate");
      author.textContent = "- " + myQuote.author;
      text.style.opacity = 1;
      author.style.opacity = 1;
      setShareUrls(myQuote);
    }, 500);
  }

  function setShareUrls(myQuote) {
    const tweetUrl =
      "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
      encodeURIComponent('"' + myQuote.quote + '" ' + myQuote.author);
    const tumblrUrl =
      "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
      encodeURIComponent(myQuote.author) +
      "&content=" +
      encodeURIComponent(myQuote.quote) +
      "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";

    tweetButton.setAttribute("href", tweetUrl);
    tumblrButton.setAttribute("href", tumblrUrl);
  }

  function hideTestCasesDropdown() {
    // hide test cases dropdown for new users
    localStorage["project_selector"] = "random-quote-machine";
    localStorage["fCC_random-quote-machine_hide"] = "true";
  }

  hideTestCasesDropdown();
  getQuotes();
})();
