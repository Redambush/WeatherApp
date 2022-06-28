import pyrebase
import time
import json

config = {
    "apiKey": "AIzaSyDXlXq6xU82eGDxZef075_szRNDHyx-lbs",
    "authDomain": "weatherapp-546e3.firebaseapp.com",
    "databaseURL": "https://weatherapp-546e3-default-rtdb.europe-west1.firebasedatabase.app",
    "projectId": "weatherapp-546e3",
    "storageBucket": "weatherapp-546e3.appspot.com",
    "messagingSenderId": "860633158016",
    "appId": "1:860633158016:web:b642228eb2b8a45f9cf165",
    "measurementId": "G-VB270R266Y"
  }

firebase = pyrebase.initialize_app(config)
database = firebase.database()

def add_data(pm10, pm25, rain, humidity, temperature):
    data = {"rain": rain, "humidity": humidity, "pm10": pm10, "pm25": pm25, "temperature": temperature, "timestamp": time.time()}
    database.child("measures").push(json.dumps(data))