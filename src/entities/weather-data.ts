export class WeatherData {
  id: string
  timestamp: string;
  temperature: string;
  humidity: string;
  isRain: string;
  stationId: string;

  constructor(id: string, timestamp: string, temperature: string, humidity: string, isRain: string, stationId: string) {
    this.id = id;
    this.timestamp = timestamp;
    this.temperature = temperature;
    this.humidity = humidity;
    this.isRain = isRain;
    this.stationId = stationId;
  }
}
