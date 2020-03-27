const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { pool } = require('./config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const getConversations = (request, response) => {
	pool.query('SELECT * FROM conversations', (error, results) => {
		if (error) {
			throw error
		}
		response.status(200).json(results.rows)
	})
}

const addConversation = (request, response) => {
	const { hostID, topic } = request.body

	pool.query('INSERT INTO conversations (hostID, topic) VALUES ($1, $2)', [hostID, topic], error => {
		if (error) {
			throw error
		}
		response.status(201).json({ status: 'success', message: 'Conversation added.' })
	})
}


// TODO: After the tutorial, use separate endpoints for retrieving, creating, and destroying. It appears that Slack Apps only POST to endpoints
app
	.route('/conversations')
	// GET endpoint
	.get(getConversations)
	// POST endpoint
	.post(addConversation)

	// Start server
	app.listen(process.env.PORT || 3002, () => {
		console.log('Server listening')
	})