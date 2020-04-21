$(document).ready(function () {
  // --- our code goes here ---
  const tweetText = $('#tweet-text');
  tweetText.on('input', function () {
    const $counter = $(this.parentElement.querySelector('.prompt-footer').querySelector('.counter'));
    $counter.text(140 - tweetText.val().length);
    if (tweetText.val().length > 140) {
      $counter.toggleClass('text-red');
    }
  });

});
