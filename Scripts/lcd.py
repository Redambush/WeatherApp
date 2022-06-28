from signal import signal, SIGTERM, SIGHUP, pause
from rpi_lcd import LCD
import time
import board
import adafruit_dht
import pymongo
from sds011 import SDS011
import os
from pm10 import readmeasurment
import smtplib
import RPi.GPIO as GPIO
from gpiozero import InputDevice
import urllib.request
import dbConnection

lcd = LCD()
GPIO.setmode(GPIO.BCM)
no_rain=InputDevice(18)


def safe_exit(signum, frame):
    exit(1)
    
def printLCD(stringP, line):
    try:
        signal(SIGTERM, safe_exit)
        signal(SIGHUP, safe_exit)
        lcd.text(stringP, line)
    except KeyboardInterrupt:
        pass

dhtDevice = adafruit_dht.DHT22(board.D4, use_pulseio=False)

while True:
    try:
        # Print the values to the serial port
        temperature_c = dhtDevice.temperature
        temperature_f = temperature_c * (9 / 5) + 32
        humidity = dhtDevice.humidity
        pmSens = readmeasurment()
        tempP = "Temp: {:.1f} F / {:.1f}C Humidity: {}%".format(temperature_f, temperature_c, humidity)
        printLCD(tempP, 1)
        pmString1 = "pm2.5: {:.1f}".format(pmSens['pm2.5']) + " ug"
        pmString2 = "pm10: {:.1f}".format(pmSens['pm10']) + " ug"
        printLCD(pmString1, 3)
        printLCD(pmString2, 4)
        if no_rain.is_active == True:
            dbConnection.add_data(pmSens['pm10'], pmSens['pm2.5'], False, humidity, temperature_c)
        else:
            dbConnection.add_data(pmSens['pm10'], pmSens['pm2.5'], True, humidity, temperature_c)
    except RuntimeError as error:
        # Errors happen fairly often, DHT's are hard to read, just keep going
        print(error.args[0])
        time.sleep(2.0)
        continue
    except Exception as error:
        dhtDevice.exit()
        raise error
    time.sleep(120)

