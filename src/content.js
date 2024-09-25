// Send a tweet to the API
async function analyzeTweet(tweetText) {
    try {
        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({ tweet: tweetText })
        });

        const data = await response.json();
        return data.emotion;

    } catch (error) {
        console.error("Erreur while analysing the tweet ", error);
    }
}

function processTweets() {
    // Select all element containing tweets
    const allTweets = document.querySelectorAll('article div[lang]');

    allTweets.forEach(async (tweet) => {
        const tweetText = tweet.innerText;

        // Verify if the label already exists
        if (
            !tweetText.includes('[Joy]') && !tweetText.includes('[Sadness]') &&
            !tweetText.includes('[Love]') && !tweetText.includes('[Anger]') &&
            !tweetText.includes('[Fear]')) {

            // Send the tweet to the API and get the predicted emotion
            const emotion = await analyzeTweet(tweetText);

            // Create a new label to add to the tweet
            if (emotion) {
                var textString = "";

                switch(emotion) {
                    case "0":
                        textString = "Sadness";
                        break;
                    case "1":
                        textString = "Joy";
                        break;
                    case "2":
                        textString = "Love";
                        break;
                    case "3": 
                        textString = "Anger";
                        break;
                    case "4":
                        textString = "Fear";
                        break;
                }

                const label = document.createElement('span');
                label.innerText = ` [${textString}]`;
                label.style.color = 'blue';  // Change label's color
                tweet.appendChild(label);  // Add label next to the tweet
            }
        }
    });
}

// Vérifie que la page est complètement chargée
window.onload = () => {
    // Attends quelques secondes pour s'assurer que les tweets sont bien présents
    setTimeout(() => {
        processTweets(); // Traite les tweets déjà chargés

        // Observateur pour surveiller les changements dans le DOM (scroll infini)
        const observer = new MutationObserver(processTweets);
        observer.observe(document.body, { childList: true, subtree: true });

    }, 5000);  // Délai de 3 secondes (ajuste cette valeur si nécessaire)
};