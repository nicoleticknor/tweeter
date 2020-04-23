const escape = function (str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const createTweetElement = (tweet) => {
  const now = Date.now();
  const daysAgo = Math.floor((now - tweet.created_at) / (1000 * 60 * 60 * 24));
  let time = null;
  // TODO add if statement here

  if (daysAgo > 29 && daysAgo < 60) {
    time = 'One month ago'
  } else if (daysAgo >= 60 && daysAgo < 365) {
    time = Math.floor(daysAgo / 12) + ' months ago';
  } else if (daysAgo >= 365 && daysAgo < 730) {
    time = 'Over a year ago'
  } else if (daysAgo >= 730) {
    time = Math.floor(daysAgo / 365) + ' years ago';
  } else if ((daysAgo * 60) < 1) {
    time = 'Less than an hour ago';
  } else {
    time = (daysAgo * 24) + ' hours ago';
  }
  // <span for="datestamp">${daysAgo} days ago</span>

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
        <span for="datestamp">${time}</span>
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

  const $button = $('.new-tweet-btn');
  const $newTwtSection = $('.new-tweet');

  $button.click(() => {
    if ($newTwtSection.is(':visible')) {
      $newTwtSection.slideUp();
    } else {
      $newTwtSection.slideDown(); ("slow", () => { });
      $('#tweet-text').focus();
    }
  })

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
      $errorNoText.slideDown(); ("slow", () => { });
      return;
    }

    if ($tweet.length > 140) {
      $errorOver140.slideDown("slow", () => { });
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
