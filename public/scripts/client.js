/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {


  //dynamically updates&styles tweets automatically

  const createTweetElement = (tweets) => {
    const $tweet = $('<article>').addClass('tweet');

    const HTML = `
   
    <header>
    <img src="${tweets.user.avatars}"/> 
     <span class="name">${tweets.user.name}</span>
      <span class="username">${tweets.user.handle}</span>
    </header>
    <span class="submitted-tweet">${tweets.content.text}</span>
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
      $('#tweet-container').append($tweet);
    }
  };




  const loadTweets = function () {
    $.ajax('/tweets', { method: 'GET' })
      .then(function (fetchedTweets) {
        renderTweets(fetchedTweets);
      })
  }
  loadTweets();

  //prevents page from redirecting on submit button
  $('.new-tweet form').submit(function (event) {
    event.preventDefault();
    // const $input = $(this);
    const $inputText = $(this).children('texts')
    console.log($inputText)

    // if (!$inputText) {
    //   alert("Cannot submit empty text area. All tweets must be at least one character long.");
    // } else if ($inputText.length > 140) {
    //   alert("Too long: Cannot submit tweet greater than 140 characters.");
    // } else {
    const encoded = $('form').serialize();
    $.ajax({ url: "/tweets/", method: 'POST', data: encoded })

  });




  // Test / driver code (temporary). Eventually will get this from the server.




});