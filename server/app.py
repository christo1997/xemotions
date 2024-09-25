from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

# Charge model and vectorize it
model = pickle.load(open('model/model.pkl', 'rb'))
vectorizer = pickle.load(open('model/vectorizer.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()  # Get Tweets
    tweet = data['tweet']

    # Transform Tweets in vector
    tweet_vec = vectorizer.transform([tweet])

    # Do prediction
    predicted_emotion = model.predict(tweet_vec)[0]

    return jsonify({'emotion': str(predicted_emotion)})

if __name__ == '__main__':
    app.run(debug=True)