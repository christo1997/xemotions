// Capture Tweets on the current page
let tweets = [];
document.querySelectorAll('.tweet-text').forEach(tweet => {
    tweets.push(tweet.innerText);
});

// Send captured Tweets to background.js
chrome.runtime.sendMessage({ action: 'sendTweets', tweets: tweets });