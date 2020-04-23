const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// TODO adjust this func so it says months, days, years, hours, minutes, etc
const createTweetElement = (tweet) => {
  const now = Date.now();
  const daysAgo = Math.floor((now - tweet.created_at) / (1000 * 60 * 60 * 24));
  // TODO add if statement here

  const markup = `<article>
      <header class="tweet-header">
        <div class="user-and-logo">
          <img src="${tweet.user.avatars}" alt="${tweet.user.handle} avatar"></i>
      <span>${tweet.user.name}</span>
        </div>
        <span class="tweeter-handle">${tweet.user.handle}</span>
      </header>
      <div class="tweet-body">
        <p class="tweet-message">${escape(tweet.content.text)}</p>
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
      </footer>`;
  return markup;
};

$(document).ready(function () {
  const $allTweets = $('.all-tweets');

  const renderTweets = function (tweets) {
    $allTweets.empty();
    tweets.forEach(tweet => {
      let markup = createTweetElement(tweet);
      $allTweets.prepend(markup);
    });
  };

  const loadTweets = () => {
    $.get('/tweets/')
      .then((res) => {
        renderTweets(res);
      });
  };
  loadTweets();

  const $form = $('.post-tweet');

  $form.submit(function (e) {
    e.preventDefault();

    const $formInput = $('#tweet-text');
    const $tweet = $formInput.val();
    const $errorNoText = $('.error-no-text');
    const $errorOver140 = $('.error-over-140');
    const self = this;
    const $counter = $(this).find('.counter')

    $errorNoText.slideUp();
    $errorOver140.slideUp();

    if ($tweet.length === 0) {
      $errorNoText.slideDown(); ("slow", () => {
        $(self)[0].reset();
      });
      return;
    }

    if ($tweet.length > 140) {
      $errorOver140.slideDown("slow", () => {
        $(self)[0].reset();
      });
      return;
    }

    const $postTweet = $(this).serialize();
    $.post('/tweets/', $postTweet)
      .then(() => {
        $(self)[0].reset();
        $counter.text(140);
        loadTweets();
      })
      .catch(err, () => {
        console.log(err);
      });
  });
});
