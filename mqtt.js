import mqtt from 'mqtt'
import { knex } from './index.js'
const mqttClient = mqtt.connect('mqtt://test.mosquitto.org')
const topic = "doan2-hust"

export const publish = (data) => {
	mqttClient.publish(topic, data)
}

mqttClient.on('connect', () => {
	console.log("Connecting to broker")
	mqttClient.subscribe(topic, (err) => {
		if(err) {
			throw Error("Cannot subscribe the topic " + topic)
		} else {
			console.log("Subscribed to topic " + topic)
		}
	})
})

mqttClient.on('message', (topic, message) => {
	console.log("Receving messages from topic " + topic + message);
	message = message.toString()
	// Todo: Handle logic here
	if (topic === "doan2-hust") {
		const receivedData = message.split("_");
		const lux = Number(receivedData[0])
		const mode = Number(receivedData[1])
		knex('light').insert({value: lux})
		.then(()=>{
			console.log("Inserted to light table: ", lux);
		})
		
		knex('mode').insert({value: mode})
		.then(()=>{
			console.log("Inserted to mode table: ", mode);
		})
	}
})

//export default mqttClient
