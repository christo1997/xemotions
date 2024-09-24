async function analyEmotions(tweet) {
    const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweet: tweet }),
    });
    const data = await response.json();
    return data.emotion;
}