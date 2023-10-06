import { connect } from "mqtt";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

// MQTT Broker Address
const brokerUrl = "mqtt://13.38.173.241:1883";

let uavObj = {
  batInf: {
    id: "",
    vl: "",
    pt: "",
  },
  gpsdata: {
    fx: "",
    ns: "",
    lat: "",
    lon: "",
    abs: "",
    rel: "",
  },
  uavstat: {
    in_air: "",
    armed: "",
    state: "",
    mav_msg: "",
    health: "",
    fm: "",
  },
};

let uav1 = { ...uavObj };
let uav2 = { ...uavObj };

// Create an MQTT Client
const mqttClient = connect(brokerUrl);

// Define topic categories and topics within each category for uav1 and uav2
const topicCategories = {
  uav1: {
    "Battery Information": ["uav1/bat/id", "uav1/bat/vl", "uav1/bat/pt"],
    "GPS Data": [
      "uav1/gps/fx",
      "uav1/gps/ns",
      "uav1/gps/lat",
      "uav1/gps/lon",
      "uav1/gps/abs",
      "uav1/gps/rel",
    ],
    "UAV Status": [
      "uav1/in_air",
      "uav1/armed",
      "uav1/state",
      "uav1/mav_msg",
      "uav1/health",
      "uav1/fm",
    ],
  },
  uav2: {
    "Battery Information": ["uav2/bat/id", "uav2/bat/vl", "uav2/bat/pt"],
    "GPS Data": [
      "uav2/gps/fx",
      "uav2/gps/ns",
      "uav2/gps/lat",
      "uav2/gps/lon",
      "uav2/gps/abs",
      "uav2/gps/rel",
    ],
    "UAV Status": [
      "uav2/in_air",
      "uav2/armed",
      "uav2/state",
      "uav2/mav_msg",
      "uav2/health",
      "uav2/fm",
    ],
  },
};

// Express app for serving HTML and Socket.io
const app = express();
app.use(cors());
const server = createServer(app);
const io = new Server(server);

// Handle MQTT Connection Events
mqttClient.on("connect", () => {
  console.log("Connected to MQTT Broker");

  // Subscribe to topics within each category
  for (const uav in topicCategories) {
    const categories = topicCategories[uav];
    for (const category in categories) {
      const topics = categories[category];
      topics.forEach((topic) => {
        mqttClient.subscribe(topic, (err) => {
          if (!err) {
            console.log(`Subscribed to ${topic}`);
          }
        });
      });
    }
  }
});

// Handle Incoming MQTT Messages
mqttClient.on("message", (topic, message) => {
  //filter by topic to uav1 and uav2
  if (topic.split("/")[0] === "uav1") {
    if (topic.split("/")[1] === "bat") {
      if (topic.split("/")[2] === "id") {
        uav1.batInf.id = message.toString();
      } else if (topic.split("/")[2] === "vl") {
        uav1.batInf.vl = message.toString();
      } else if (topic.split("/")[2] === "pt") {
        uav1.batInf.pt = message.toString();
      }
    } else if (topic.split("/")[1] === "gps") {
      if (topic.split("/")[2] === "fx") {
        uav1.gpsdata.fx = message.toString();
      } else if (topic.split("/")[2] === "ns") {
        uav1.gpsdata.ns = message.toString();
      } else if (topic.split("/")[2] === "lat") {
        uav1.gpsdata.lat = message.toString();
      } else if (topic.split("/")[2] === "lon") {
        uav1.gpsdata.lon = message.toString();
      } else if (topic.split("/")[2] === "abs") {
        uav1.gpsdata.abs = message.toString();
      } else if (topic.split("/")[2] === "rel") {
        uav1.gpsdata.rel = message.toString();
      }
    } else if (topic.split("/")[1] === "in_air") {
      uav1.uavstat.in_air = message.toString();
    } else if (topic.split("/")[1] === "armed") {
      uav1.uavstat.armed = message.toString();
    } else if (topic.split("/")[1] === "state") {
      uav1.uavstat.state = message.toString();
    } else if (topic.split("/")[1] === "mav_msg") {
      uav1.uavstat.mav_msg = message.toString();
    } else if (topic.split("/")[1] === "health") {
      uav1.uavstat.health = message.toString();
    } else if (topic.split("/")[1] === "fm") {
      uav1.uavstat.fm = message.toString();
    }
  } else if (topic.split("/")[0] === "uav2") {
    if (topic.split("/")[1] === "bat") {
      if (topic.split("/")[2] === "id") {
        uav2.batInf.id = message.toString();
      } else if (topic.split("/")[2] === "vl") {
        uav2.batInf.vl = message.toString();
      } else if (topic.split("/")[2] === "pt") {
        uav2.batInf.pt = message.toString();
      }
    } else if (topic.split("/")[1] === "gps") {
      if (topic.split("/")[2] === "fx") {
        uav2.gpsdata.fx = message.toString();
      } else if (topic.split("/")[2] === "ns") {
        uav2.gpsdata.ns = message.toString();
      } else if (topic.split("/")[2] === "lat") {
        uav2.gpsdata.lat = message.toString();
      } else if (topic.split("/")[2] === "lon") {
        uav2.gpsdata.lon = message.toString();
      } else if (topic.split("/")[2] === "abs") {
        uav2.gpsdata.abs = message.toString();
      } else if (topic.split("/")[2] === "rel") {
        uav2.gpsdata.rel = message.toString();
      }
    } else if (topic.split("/")[1] === "in_air") {
      uav2.uavstat.in_air = message.toString();
    } else if (topic.split("/")[1] === "armed") {
      uav2.uavstat.armed = message.toString();
    } else if (topic.split("/")[1] === "state") {
      uav2.uavstat.state = message.toString();
    } else if (topic.split("/")[1] === "mav_msg") {
      uav2.uavstat.mav_msg = message.toString();
    } else if (topic.split("/")[1] === "health") {
      uav2.uavstat.health = message.toString();
    } else if (topic.split("/")[1] === "fm") {
      uav2.uavstat.fm = message.toString();
    }
  }
  console.log("uav1:", uav1);
  console.log("uav2:", uav2);

  // Extract the UAV prefix (uav1 or uav2) from the topic
  const uavPrefix = topic.split("/")[0];

  // Check if the topic is GPS data for uav1 or uav2
  if (
    uavPrefix === "uav1" &&
    (topic === "uav1/gps/lat" || topic === "uav1/gps/lon")
  ) {
    const batInf = uav1.batInf;
    const gpsdata = uav1.gpsdata;
    const uavstat = uav1.uavstat;
    io.emit(`gpsData-${uavPrefix}`, { batInf, gpsdata, uavstat });
  } else if (
    uavPrefix === "uav2" &&
    (topic === "uav2/gps/lat" || topic === "uav2/gps/lon")
  ) {
    const batInf = uav1.batInf;
    const gpsdata = uav1.gpsdata;
    const uavstat = uav1.uavstat;
    io.emit(`gpsData-${uavPrefix}`, { batInf, gpsdata, uavstat });
  }
});

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("A user connected to socket.io");

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server
const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
