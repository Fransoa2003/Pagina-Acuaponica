#define tdsSensorPin 34   
#define VREF 3.3          
#define ADC_RANGE 4095.0  
#define TDS_FACTOR 500   
#define temp_pin 4 

#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "Mega-2.4G-57AE";
const char* password = "RT2tXTARhB";

const String host = "192.168.100.14:3001";
const String host_post = "http://" + host + "/api/esp/enviar-datos";

OneWire ourWire1(temp_pin);
DallasTemperature sensors1(&ourWire1);   

void setup() {
  
  Serial.begin(115200);

  pinMode(tdsSensorPin, INPUT);

  sensors1.begin();
  WiFi.begin(ssid,password);

  while(WiFi.status() != WL_CONNECTED){
    delay(200);
    Serial.print(".");
  }
  Serial.println("Esp32 Conectado");
  Serial.println(WiFi.localIP());
  delay(2000);  
}

void loop() {
  // put your main code here, to run repeatedly:
  // --- Lectura de temperatura ---
  sensors1.requestTemperatures();         // Pedir temperatura al sensor
  float temp = sensors1.getTempCByIndex(0); // Obtener temperatura en grados Celsius

  Serial.print("Temperatura: ");
  Serial.print(temp);
  Serial.println(" °C");

  // --- Lectura del sensor TDS ---
  int analogValue = analogRead(tdsSensorPin);  // Leer señal analógica
  float voltage = analogValue * (VREF / ADC_RANGE); // Convertir a voltaje

  // Compensación de temperatura
  float compensationCoefficient = 1.0 + 0.02 * (temp - 25.0); // Ajuste por temperatura
  float compensatedVoltage = voltage / compensationCoefficient; // Voltaje corregido
  float tdsValue = compensatedVoltage * TDS_FACTOR; // Conversión a ppm

  // Conductividad eléctrica
  float factor_conversion = 0.5;  //Calibrar acorde al tipo de agua
  float EC = tdsValue / factor_conversion;

  Serial.print("Conductividad: ");
  Serial.print(EC, 2);
  Serial.println(" uS/cm");

  // Mostrar valores TDS en el monitor serie
  Serial.print("Analog Value: ");
  Serial.print(analogValue);
  Serial.print(" | Voltage: ");
  Serial.print(voltage, 2);
  Serial.print(" V | TDS: ");
  Serial.print(tdsValue, 2);
  Serial.println(" ppm");
  // ---- Esperar antes de la siguiente lectura ----

  enviarDatos(temp,voltage,tdsValue);
  delay(4000); // Esperar 5 segundos antes de la siguiente lectura
}

void enviarDatos(float _temp,float _voltage,float _tdsValue){
  if(WiFi.status() == WL_CONNECTED){
    WiFiClient client;
    HTTPClient http;

    http.begin(host_post);

    http.addHeader("Content-Type","application/json");
    String httpData = "{\"ph\": 6,\"temperatura\":" + String(_temp,0) + "," +
                        "\"solidosdisueltos\":" + String(_tdsValue,0) + "," +
                        "\"conductividad\":" + String(_voltage,2) +"," +
                        "\"producto\":\"SORA-227\"}";
    http.POST(httpData);

    http.end();
    delay(1000);
  }
}
