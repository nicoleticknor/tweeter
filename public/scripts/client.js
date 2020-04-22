const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = (tweet) => {
  const now = Date.now();
  const daysAgo = Math.floor((now - tweet.created_at) / (1000 * 60 * 60 * 24));
  const markup = `<article>
      <header class="tweet-header">
        <div class="user-and-logo">
          <img src="${tweet.user.avatars}" alt="${tweet.user.handle} avatar"></i>
      <span>${tweet.user.name}</span>
        </div>
        <span class="tweeter-handle">${tweet.user.handle}</span>
      </header>
      <div class="tweet-body">
        <p class="tweet-message">${tweet.content.text}</p>
      </div>
      <footer>
        <span for="datestamp">${daysAgo} days ago</span>
        <span for="tweeter-actions">
          <i class="fontAwesomeIconSmall fas fa-flag"></i>
          <i class="fontAwesomeIconNull fas fa-flag"></i>
          <i class="fontAwesomeIconSmall fas fa-retweet"></i>
          <i class="fontAwesomeIconNull fas fa-flag"></i>
          <i class="fontAwesomeIconSmall fas fa-heart"></i>
          </span>
      </footer>`
  return markup;
};


$(document).ready(function () {
  const allTweets = $('.all-tweets');
  const renderTweets = function (tweets) {
    tweets.forEach(tweet => {
      let markup = createTweetElement(tweet);
      allTweets.append(markup);
    })
  }
  renderTweets(data);

});
