#  Import All Modules
import urllib, json
import re
from flask import Flask, render_template, request,jsonify
from flask_cors import CORS
import numpy as np
import pickle
import pandas as pd
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from datetime import date,timedelta

latestDate = date.today() - timedelta(days=2)
print(latestDate)
#Loading Pickle with saved Model and Tokenizer
loaded_model = []
with open('../dumb_model.pkl', 'rb') as file:
    loaded_model = pickle.load(file)

with open('../words.pkl', 'rb') as file:
    tokenizer = pickle.load(file)

# Fetching Articles Related Technology And Test the Content of News
tech_url = f"https://newsapi.org/v2/everything?q=technology&from={latestDate}&to={latestDate}&sortBy=popularity&apiKey=a63a67b2473841dfb20a515e2a6049c4"
tech_response = urllib.request.urlopen(tech_url)
tech_json_data = json.loads(tech_response.read())
tech_articles = tech_json_data['articles']

for i in tech_articles:
    just = tokenizer.texts_to_sequences([i['title']+' '+i['description']])
    try:
        i['FakeMeter'] = float(loaded_model.predict(just)[0][0])
        if(i['FakeMeter'] > 3):
            i['FakeMeter'] = 3
        if(i['FakeMeter'] < -1):
            i['FakeMeter'] = -0.6
        i['FakeMeter'] = (i['FakeMeter'] + 1)/4*100
    except Exception as e:
        i['FakeMeter'] = 50
print("Technical Articles Scanned ")

# Fetching Articles Related Top Business Headlines And Test the Content of News
business_url = f"https://newsapi.org/v2/everything?q=business&from={latestDate}&to={latestDate}&sortBy=popularity&apiKey=a63a67b2473841dfb20a515e2a6049c4"
business_response = urllib.request.urlopen(business_url)
business_json_data = json.loads(business_response.read())
business_articles = business_json_data['articles']

for i in business_articles:
    try:
        just = tokenizer.texts_to_sequences([i['title']+' '+i['description']])
        try:
            i['FakeMeter'] = float(loaded_model.predict(just)[0][0])
            if(i['FakeMeter'] > 3):
                i['FakeMeter'] = 3
            if(i['FakeMeter'] < -1):
                i['FakeMeter'] = -0.6
            i['FakeMeter'] = (i['FakeMeter'] + 1)/4*100
        except Exception as e:
            i['FakeMeter'] = 50
    except:
        just = tokenizer.texts_to_sequences([i['title']])
    
print("Business Articles Scanned ")

# Fetching Articles Related Fashion And Test the Content of News
fashion_url = f"https://newsapi.org/v2/everything?q=fashion&from={latestDate}&to={latestDate}&sortBy=popularity&apiKey=a63a67b2473841dfb20a515e2a6049c4"
fashion_response = urllib.request.urlopen(fashion_url)
fashion_json_data = json.loads(fashion_response.read())
fashion_articles = fashion_json_data['articles']

for i in fashion_articles:
    just = tokenizer.texts_to_sequences([i['title']+' '+i['description']])
    try:
        i['FakeMeter'] = float(loaded_model.predict(just)[0][0])
        if(i['FakeMeter'] > 3):
            i['FakeMeter'] = 3
        if(i['FakeMeter'] < -1):
            i['FakeMeter'] = -0.6
        i['FakeMeter'] = (i['FakeMeter'] + 1)/4*100
    except Exception as e:
        i['FakeMeter'] = 50
print("Fashion Articles Scanned ")

app = Flask(__name__)
CORS(app)


@app.route('/<search>',methods=['GET','POST'])
def hello(search):
    print(search)
    search = search.replace(" ","%20")
    # Fetching Articles Related Fashion And Test the Content of News
    search_url = f"https://newsapi.org/v2/everything?q={search}&from=2023-06-17&to=2023-06-17&sortBy=popularity&apiKey=a63a67b2473841dfb20a515e2a6049c4"
    search_res = urllib.request.urlopen(search_url)
    search_json_data = json.loads(search_res.read())

    if len(search_json_data['articles']) > 20:
        search_articles = search_json_data['articles']
        search_articles = search_articles[:20]
    else:
        search_articles = search_json_data['articles']

    for i in search_articles:
        just = tokenizer.texts_to_sequences([i['title']+' '+i['description']])
        try:
            i['FakeMeter'] = float(loaded_model.predict(just)[0][0])
            if(i['FakeMeter'] > 3):
                i['FakeMeter'] = 3
            if(i['FakeMeter'] < -1):
                i['FakeMeter'] = -0.6
            i['FakeMeter'] = (i['FakeMeter'] + 1)/4*100
        except Exception as e:
            i['FakeMeter'] = 50
    print(f"{search} Articles Scanned ")
    return search_articles

@app.route('/techcrunch',methods=['GET','POST'])
def provide_techcrunch_data():
    return tech_articles

@app.route('/business',methods=['GET','POST'])
def provide_business_data():
    return business_articles

@app.route('/fashion',methods=['GET','POST'])
def provide_fashion_data():
    return fashion_articles

if __name__ == '__main__':
    app.run()