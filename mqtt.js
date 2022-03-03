import mqtt from 'mqtt'
import { knex } from './index.js'
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org')
const topic = "WSN_MiniProject_Hust"

export const publish = (data) => {
	mqttClient.publish(topic, data)
}

mqttClient.on('connect', () => {
	console.log("Connecting to broker");
	mqttClient.subscribe(topic, (err) => {
		if(err) {
			throw Error("Cannot subscribe the topic " + topic);
		} else {
			console.log("Subscribed to topic " + topic);
		}
	});
	// setInterval(function () {
	// 	mqttClient.publish(topic, "15.22_30_30");
	// }, 3000);
});

mqttClient.on('message', (topic, message) => {
	console.log("Receving messages from topic " + topic + ": " + message);
	message = message.toString();
	// Todo: Handle logic here
	if (topic === "WSN_MiniProject_Hust") {
		const receivedData = message.split("_");
		const temp = Number(receivedData[0]);
		const humid = Number(receivedData[1]);
		const lux = Number(receivedData[2]);
		knex('temp').insert({value: temp})
		.then(()=>{
			console.log("Inserted to temp table: ", temp);
		});

		knex('humid').insert({value: humid})
		.then(()=>{
			console.log("Inserted to humid table: ", humid);
		});

		knex('lux').insert({value: lux})
			.then(()=>{
				console.log("Inserted to lux table: ", lux);
		});
	}
});

//export default mqttClient
