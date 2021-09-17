/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {


  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
      ,

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





  const createTweetElement = (tweets) => {
    const $tweet = $('<article>').addClass('tweet');

    const HTML = `
   
    <div class="test">
    <img src="${tweets.user.avatars}"/>  <div class="username">${tweets.user.name}</div>
      <label><strong>${tweets.user.handle}</strong></label>
    </div>
    <div name="text" class="tweet-text">${tweets.content.text}</div>
    <div class="time-sent">${timeago.format(tweets['created_at'])}</div>
    <div class="icon-container">
    <i class="fa fa-flag" aria-hidden="true"></i>
    <i class="fa fa-retweet" aria-hidden="true"></i>
    <i class="fa fa-heart" aria-hidden="true"></i>
    </div>
 `
    $tweet.append(HTML);
    return $tweet
  }

  const renderTweets = function (userData) {
    for (const tweet of userData) {
      const $tweet = createTweetElement(tweet);
      $('section.tweet-container').append($tweet);
    }
  };


  renderTweets(tweetData);


  // Test / driver code (temporary). Eventually will get this from the server.

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});