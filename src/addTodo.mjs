import { v4 } from "uuid";
import AWS from 'aws-sdk';

export const addTodo = async (event) => {
  try {
    const { todo } = JSON.parse(event.body);
    console.log(todo);

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const createdAt = new Date().toISOString();
    console.log(createdAt);

    const id = v4();
    console.log(id);

    const newTodo = {
      todo,
      id,
      createdAt,
      completed: false
    };


    await dynamodb.put({
      TableName: "Todotable",
      Item: newTodo
    }).promise();


    return {
      statusCode: 200,
      body: JSON.stringify(newTodo)
    };
  } catch (err) {
    console.error(`Error occurred: ${err.message}`);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: "An error occurred", error: err.message })
    };
  }
};
