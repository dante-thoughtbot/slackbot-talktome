const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const util = require('util')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const listConversations = (request, response) => {
	pool.query('SELECT * FROM conversations', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const addConversation = (request, response) => {
	// console.warn("request == "+request);
	// console.warn("request.body stringify== "+JSON.stringify(request.body, null, 2));
	console.warn("request.body == "+util.inspect(request.body, {showHidden: false, depth: null}))

	const { hostID, topic, participantOneID } = request.body

	pool.query('INSERT INTO conversations (hostID, topic, participantOneID) VALUES ($1, $2, $3)', [hostID, topic, participantOneID], error => {
		if (error) {
			throw error
		}
		response.status(201).json({ status: 'success', message: 'Conversation added.' })
	})
}


// TODO: After the tutorial, use separate endpoints for retrieving, creating, and destroying. It appears that Slack Apps only POST to endpoints
app
	.route('/list_conversations')
	.post(listConversations)

app
	.route('/add_conversation')
	.post(addConversation)

// Start server
app.listen(process.env.PORT || 3002, () => {
	console.log('Server listening')
})