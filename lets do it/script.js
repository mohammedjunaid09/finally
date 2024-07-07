document.addEventListener('DOMContentLoaded', () => {
    const tweetInput = document.getElementById('tweetInput');
    const saveTweetButton = document.getElementById('saveTweetButton');
    const searchInput = document.getElementById('searchInput');
    const tweetsSection = document.getElementById('tweetsSection');

    // Load tweets from local storage on page load
    loadTweets();

    // Save tweet to local storage
    saveTweetButton.addEventListener('click', () => {
        const tweetText = tweetInput.value.trim();
        if (tweetText) {
            const tweets = getTweetsFromLocalStorage();
            tweets.push(tweetText);
            localStorage.setItem('tweets', JSON.stringify(tweets));
            tweetInput.value = '';
            displayTweets(tweets);
        }
    });

    // Search tweets
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const tweets = getTweetsFromLocalStorage();
        const filteredTweets = tweets.filter(tweet => tweet.toLowerCase().includes(query));
        displayTweets(filteredTweets);
    });

    function getTweetsFromLocalStorage() {
        return JSON.parse(localStorage.getItem('tweets')) || [];
    }

    function loadTweets() {
        const tweets = getTweetsFromLocalStorage();
        displayTweets(tweets);
    }

    function displayTweets(tweets) {
        tweetsSection.innerHTML = '';
        if (tweets.length === 0) {
            tweetsSection.innerHTML = '<p>No tweets found.</p>';
        } else {
            tweets.forEach(tweet => {
                const tweetDiv = document.createElement('div');
                tweetDiv.className = 'tweet';
                tweetDiv.textContent = tweet;
                tweetsSection.appendChild(tweetDiv);
            });
        }
    }
});