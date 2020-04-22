$(document).ready(function () {
  const tweetText = $('#tweet-text');

  tweetText.on('input', function () {
    // Traverse Dom for counter
    const $counter = tweetText.siblings().last().children().last();

    // Gettext area lenght
    let chars = tweetText.val().length;
    $counter.text(140 - chars);
    if (chars > 140) {
      $counter.addClass('text-red');
    } else {
      $counter.removeClass('text-red');
    }
  });

});
