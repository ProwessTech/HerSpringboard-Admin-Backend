const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const AWS = require('aws-sdk');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
const port = 3001;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

AWS.config.update({
  region: process.env.AWS_REGION
});


app.use(cors());
app.use(bodyParser.json());
app.get('/users', async (req, res) => {
  const params = {
    TableName: process.env.AWS_TABLE,
    ProjectionExpression: 'userId, firstName, lastName, email, password, category, courseCompleted, coursesInProgress, emailVerified'
  };
  try {
    const data = await dynamoDb.scan(params).promise();
    res.json(data.Items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/users', async (req, res) => {
  const {
    email,
    category,
    courseCompleted,
    coursesInProgress,
    emailVerified,
    firstName,
    gender,
    goal,
    hoursSpentThisWeek,
    lastName,
    password,
    profileUrl,
    registerType,
    skills,
  } = req.body;
  const newUser = {
    userId: uuidv4(),
    email,
    category,
    courseCompleted,
    coursesInProgress,
    emailVerified,
    firstName,
    gender,
    goal,
    hoursSpentThisWeek,
    lastName,
    password,
    profileUrl,
    registerType,
    skills
  };
  const params = {
    TableName: process.env.AWS_TABLE,
    Item: newUser,
  };
  try {
    await dynamoDb.put(params).promise();
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.put('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  const updateParams = {
    TableName: process.env.AWS_TABLE,
    Key: { userId },
    UpdateExpression: `set 
      email = :email, 
      category = :category, 
      courseCompleted = :courseCompleted, 
      coursesInProgress = :coursesInProgress, 
      emailVerified = :emailVerified, 
      firstName = :firstName, 
      gender = :gender, 
      goal = :goal, 
      hoursSpentThisWeek = :hoursSpentThisWeek, 
      lastName = :lastName, 
      password = :password, 
      profileUrl = :profileUrl, 
      registerType = :registerType, 
      skills = :skills`,
    ExpressionAttributeValues: {
      ':email': updates.email,
      ':category': updates.category,
      ':courseCompleted': updates.courseCompleted,
      ':coursesInProgress': updates.coursesInProgress,
      ':emailVerified': updates.emailVerified,
      ':firstName': updates.firstName,
      ':gender': updates.gender,
      ':goal': updates.goal,
      ':hoursSpentThisWeek': updates.hoursSpentThisWeek,
      ':lastName': updates.lastName,
      ':password': updates.password,
      ':profileUrl': updates.profileUrl,
      ':registerType': updates.registerType,
      ':skills': updates.skills,
    },
    ReturnValues: 'ALL_NEW',
  };
  try {
    const result = await dynamoDb.update(updateParams).promise();
    res.json(result.Attributes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const deleteParams = {
    TableName: process.env.AWS_TABLE,
    Key: { userId },
  };
  try {
    await dynamoDb.delete(deleteParams).promise();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

app.use(cors(corsOptions));