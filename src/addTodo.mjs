import { v4 } from "uuid";
import AWS from 'aws-sdk';
import middy from '@middy/core';
import { httpJsonBodyParser } from '@middy/http-json-body-parser';
const addTodoHandeler = async (event) => {
  try {
    const { todo } = event.body;
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

export const addTodo = middy(addTodoHandeler).use(httpJsonBodyParser())