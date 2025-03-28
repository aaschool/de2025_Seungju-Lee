#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

// WiFi credentials
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";

// Server IP and port
const char* serverAddress = "192.168.1.100";  // Replace with your computer's IP
const int serverPort = 3000;

WebSocketsClient webSocket;

const int ultrasonicTrig = 12;
const int ultrasonicEcho = 14;
const int electropadPin = 27;

unsigned long lastSendTime = 0;
const unsigned long sendInterval = 300; // ms

void setup() {
  Serial.begin(115200);
  pinMode(ultrasonicTrig, OUTPUT);
  pinMode(ultrasonicEcho, INPUT);
  pinMode(electropadPin, INPUT);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected! IP: " + WiFi.localIP().toString());

  webSocket.begin(serverAddress, serverPort, "/");
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);
}

void loop() {
  webSocket.loop();

  if (millis() - lastSendTime > sendInterval) {
    sendSensorData();
    lastSendTime = millis();
  }
}

void sendSensorData() {
  float proximity = readDistance();
  bool touched = digitalRead(electropadPin) == HIGH;

  StaticJsonDocument<256> doc;
  doc["type"] = "sensor";
  JsonObject data = doc.createNestedObject("data");
  data["proximity"] = proximity;
  data["touched"] = touched;

  String payload;
  serializeJson(doc, payload);
  webSocket.sendTXT(payload);

  Serial.println("Sent: " + payload);
}

float readDistance() {
  digitalWrite(ultrasonicTrig, LOW);
  delayMicroseconds(2);
  digitalWrite(ultrasonicTrig, HIGH);
  delayMicroseconds(10);
  digitalWrite(ultrasonicTrig, LOW);

  long duration = pulseIn(ultrasonicEcho, HIGH, 30000); // Timeout after 30ms
  float distanceCm = duration * 0.034 / 2;

  if (distanceCm == 0 || distanceCm > 400) return 0;
  return distanceCm;
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case WStype_CONNECTED:
      Serial.println("✅ Connected to server");
      break;
    case WStype_DISCONNECTED:
      Serial.println("❌ Disconnected from server");
      break;
    case WStype_TEXT:
      Serial.println("📥 Received: " + String((char*)payload));
      break;
  }
}