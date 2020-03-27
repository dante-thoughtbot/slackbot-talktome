CREATE TABLE conversations (
	ID SERIAL PRIMARY KEY,
	hostID VARCHAR(255) NOT NULL,
	topic VARCHAR(255) NOT NULL,
	participantOneID VARCHAR(255) NOT NULL
	);

INSERT INTO conversations (hostID, topic, participantOneID)
VALUES ('testHostID', 'testTopicID', 'testParticipantOneID');