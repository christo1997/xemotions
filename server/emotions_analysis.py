import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

# Charge dataset CSV
data = pd.read_csv('data\\train-00000-of-00001.csv')

# Separing characteristics and labels
tweet = data['text'] # Text of Tweets
emotion = data['label'] # Emotion of Tweets

# Divide datas for training and tests
tweet_train, tweet_test, emotion_train, emotion_test = train_test_split(tweet, emotion, test_size=0.2, random_state=42)

# Vectorizing Tweets
vectorizer = TfidfVectorizer(max_features=5000)
tweet_train_vec = vectorizer.fit_transform(tweet_train).toarray()
tweet_test_vec = vectorizer.transform(tweet_test).toarray()

# Training a model Naive Bayes
model = MultinomialNB()
model.fit(tweet_train_vec, emotion_train)

# Saving the model and vectorize it
with open('model/model.pkl', 'wb') as f:
    pickle.dump(model, f)

with open('model/vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)

# Test
example_tweet = "I'm angry'!"
example_vec = vectorizer.transform([example_tweet])
predicted_emotion = model.predict(example_vec)[0]
print(f"Tweet: {example_tweet}")
print(f"Predicted Emotion: {predicted_emotion}")
