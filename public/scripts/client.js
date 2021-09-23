/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 */

$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //dynamically updates&styles tweets automatically

  const createTweetElement = (tweets) => {
    const $tweet = $('<article>').addClass('tweet-container');

    const HTML = `
   
    <header>
    <img src="${tweets.user.avatars}"/> 
     <span class="name">${tweets.user.name}</span>
      <span class="username">${tweets.user.handle}</span>
    </header>
    <span class="submitted-tweet">${escape(tweets.content.text)}</span>
    <hr>
    <footer>
    <span class="time-sent">${timeago.format(tweets['created_at'])}</span>
    <span class="icons">
    <i class="fa fa-heart" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-flag" aria-hidden="true"></i>
    </span>
    </footer>
 `
    $tweet.append(HTML);
    return $tweet
  }


  // //renders tweet to page
  const renderTweets = function (userData) {
    for (const tweet of userData) {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').prepend($tweet);
    }
  };

  //loads tweets to page
  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (fetchedTweets) {
        renderTweets(fetchedTweets);
      })
  }

  loadTweets();


  $('.new-tweet form').submit(function (event) {
    //clears animation queue for error message
    $('#error-message').empty().slideUp()
    //prevents page from redirecting on submit button
    event.preventDefault();
    const $input = $('#tweet-text').val().trim();

    if (!$input) {
      $('#error-message').append('<b><i class="fa fa-times-circle"></i> Unable to sumbit:</b> Tweet must be at least one alphanumeric character long.').slideDown('slow')
    } else if ($input.length > 140) {
      $('#error-message').append('<b><i class="fa fa-times-circle"></i> Too long:</b> Tweet must be 140 characters or less.').slideDown('slow')
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).then(function () { // loads tweets without refreshing page
        loadTweets();
        $('#tweet-text').val('');
      }).then(function () {
        $('#tweet-text').reset(); //resets textarea box
      })
    }
  });
});