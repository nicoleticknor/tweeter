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
      allTweets.prepend(markup);
    })
  }

  $('.post-tweet').submit(function (e) {
    e.preventDefault();
    const postTweet = $(this).serialize();
    $.post('/tweets/', postTweet)
      .then(() => {
        console.log(postTweet)
      })
  });

  const loadTweets = () => {
    $.get('/tweets/')
      .then((res) => {
        renderTweets(res)
      })
  }
  loadTweets();

});
