from sds011 import SDS011
import os
 
sds = SDS011(port='/dev/ttyUSB0')

def readmeasurment():
    x = sds.read_measurement()
    return x

print(readmeasurment())
    