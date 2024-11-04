import { v4 } from "uuid";
import AWS from 'aws-sdk';
const addTodo = async (event) => {
  try {
    const { todo } = JSON.parse(event);
    console.log(todo)
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const createdAt = new Date().toISOString;
    console.log(createdAt)
    const id = v4();
    console.log(id)
    const newTodo = {
      todo,
      id,
      createdAt,
      completed: false
    }
    await dynamodb.put({
      TableName: "Todotable",
      Item: newTodo
    }).promise()
    return {
      statusCode: 200,
      bodt: JSON.stringify(newTodo)
    }
  }
  catch (err) {
    console.log(`Error happend at ${err.message}`)
  }

};

module.exports = {
  handler: addTodo
}