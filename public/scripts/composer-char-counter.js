$(document).ready(function () {
  // --- our code goes here ---
  const tweetText = $('#tweet-text');
  tweetText.on('input', function () {
    let chars = tweetText.val().length;
    const $counter = $(this.parentElement.querySelector('.prompt-footer').querySelector('.counter'));
    $counter.text(140 - chars);
    if (chars > 140) {
      $counter.addClass('text-red');
    } else {
      $counter.removeClass('text-red');
    }
  });

});
