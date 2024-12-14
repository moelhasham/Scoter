const express = require("express")
const cors = require("cors")
const crypto = require('crypto');
const net = require('net');
const app = express();
// const { Server } = require('socket.io');
// const http = require('http');
// const serverr = http.createServer(app);
// const io = new Server(serverr, {
//     cors: {
//       origin: "*", // Allow all origins for testing
//     },
//   });
app.use(cors())
app.use(express.json())

 
 let scooterSocket = null;
//  let scooterData = {
//     status: "Disconnected",
//     lastResponse: "No data yet",
//   };
  let scooterData = {};
/////////////SSSSSSSSSSSS///////////////////////////////////////////////
const server = net.createServer( async (socket) => {


        console.log("IOT module connected")
        
        console.log('Scooter IoT connected:', socket.remoteAddress);

    //   await    socket.write(`*SCOS,OM,868351077123154,Q0,0,20,2411#\n`);
    //   await  socket.write(`*SCOS,OM,868351077123154,L1,247#\n`);
        
        socket.on('data', (data) => {
            const response = data.toString().trim();
            console.log('Received:', response); 

            // const parts = response.split(',');
          
            // if (parts[3] === 'S6') {
            //     // Parse System Data
            //     scooterData = {
            //       imei: parts[2],
            //       battery: `${parts[4]}%`,
            //       speedMode: parts[5] === '2' ? "Medium" : "Unknown",
            //       currentSpeed: `${parts[6]} km/h`,
            //       batteryVoltage: `${parts[8]}V`,
            //       chargingStatus: parts[9] === '0' ? "Not Charging" : "Charging",
            //       powerStatus: parts[10] === '1' ? "On" : "Off",
            //       temperature: `${parts[11]}°C`,
            //     };
            //   }
            //   io.emit('update', scooterData);
        })



    socket.on("end" , () => {
        console.log("dis")
    })

    scooterSocket = socket;
})





// // IMEI of the scooter
const IMEI = '868351077123154';

server.listen(3000 , '0.0.0.0', () => {
    console.log("run tcp")
})

app.listen(2000, () => {
  console.log("run")
})


// app.post('/unlock', async (req, res) => {
//     try {
//       if (!scooterSocket) {
//         return res.status(500).send("No IoT device connected");
//       }
  
//       // Send Unlock Command to the scooter
//       await  scooterSocket.write(`*SCOS,OM,868351077123154,L0,247#\n`);
//       res.send("Unlock command sent to the scooter");
//     } catch (error) {
//       console.error("Error in sending unlock command:", error);
//       res.status(500).send("Failed to send unlock command");
//     }
//   });

//   app.post('/lock', async (req, res) => {
//     try {
//       if (!scooterSocket) {
//         return res.status(500).send("No IoT device connected");
//       }
  
//       // Send Unlock Command to the scooter
//       await  scooterSocket.write(`*SCOS,OM,868351077123154,L1,247#\n`);
//       res.send("Unlock command sent to the scooter");
//     } catch (error) {
//       console.error("Error in sending unlock command:", error);
//       res.status(500).send("Failed to send unlock command");
//     }
//   });

//   app.get('/api/data', (req, res) => {
//     res.json(scooterData);
//   });


// app.listen(3001, () => {
//     console.log(`Server running on port 3000`);
//   });


// setInterval(() => {
//     sendCommand();
//   }, 10000);
// Connect to localhost (127.0.0.1) on port 8080
// const host = 'gfc.royalcell.online';  // localhost
// const port = 5006;  // Port 8080 for communication

// const command = '*SCOS,OM,868351077123154,R0,0,20,1234,1497689816#\n';

// function sendCommand(host, port, command) {
//     return new Promise((resolve, reject) => {
//         const client = new net.Socket();

//         client.connect(port, host, () => {
//             console.log(`Connected to IoT device at ${host}:${port}`);
//             console.log(`Sending command: ${command}`);
//             client.write(command);  // Send the command to the device
//         });

//         client.on('data', (data) => {
//             console.log(`Received response: ${data}`);
//             resolve(data.toString());
//             client.destroy();  // Close the connection after receiving the response
//         });

//         client.on('error', (err) => {
//             console.error(`Error: ${err.message}`);
//             reject(err);
//         });

//         client.on('close', () => {
//             console.log('Connection closed');
//         });
//     });
// }

// // Test the communication
// sendCommand(host, port, command)
//     .then(response => console.log('IoT device response:', response))
//     .catch(error => console.error('Error in communication:', error));



//     async function main() {
//         const host = 'gfc.royalcell.online'; // Replace with your IoT device's IP.
//         const port = 12345; // Replace with your IoT device's port.
        
//         // Example R0 Command
//         const imei = '868351077123154'; // Replace with the device's IMEI.
//         const operation = 0; // 0 for unlock, 1 for lock.
//         const keyEffectiveTime = 20; // Valid time for the key in seconds.
//         const userId = 1234; // Replace with the user ID.
//         const timestamp = Math.floor(Date.now() / 1000); // Current Unix timestamp.
        
//         const rawCommand = `*SCOS,OM,${imei},R0,${operation},${keyEffectiveTime},${userId},${timestamp}`;
        
//         // Calculate CRC16 for validation (if needed)
//         const commandBuffer = Buffer.from(rawCommand, 'utf8');
//         const crc16 = calculateCRC16(commandBuffer);
//         const command = `${rawCommand},${crc16}#`;
    
//         try {
//             const response = await sendCommand(host, port, command);
//             console.log('Device Response:', response);
//         } catch (err) {
//             console.error('Failed to communicate with IoT device:', err.message);
//         }
//     }
    
//     main();

// const client = net.createConnection(
//     { host: '49.13.223.236', port: 5006, timeout: 10000 },  // 10s timeout
//     () => {
//       console.log('Connected to the IoT device');
  
//       // Example command: Unlock Request (R0)
//       const imei = '868351077123154';
//       const command = `*SCOS,OM,${imei},R0,L0,20,1234,${Date.now()}#\n`;
//       console.log('Sending:', command);
//       client.write(command); // Send command
//     }
//   );
  
//   // Handle incoming data
//   client.on('data', (data) => {
//     console.log('Received:', data.toString());
//   });
  
//   // Handle errors
//   client.on('error', (err) => {
//     console.error('Error:', err.message);
//   });
  
//   // Handle timeout
//   client.on('timeout', () => {
//     console.error('Connection timed out');
//     client.destroy();  // Close the socket
//   });
  
//   // Handle connection closure
//   client.on('end', () => {
//     console.log('Disconnected from the IoT device');
//   });

//   const imei = '868351077123154';
// const command = `*SCOS,OM,${imei},R0,0,20,1234,${Date.now()}#\n`;
// console.log('Sending:', command);
// client.write(command);