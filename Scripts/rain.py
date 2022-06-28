import smtplib
import RPi.GPIO as GPIO
import time
from gpiozero import InputDevice

GPIO.setmode(GPIO.BCM)
no_rain=InputDevice(18)

while True:
    if no_rain.is_active == True:
        print("No rain")
    else:
        print("Rain")
        
    time.sleep(5)