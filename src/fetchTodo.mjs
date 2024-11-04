import AWS from 'aws-sdk';

export const fetchTodo = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;

        const data = await dynamodb.get({ TableName: "Todotable", Key: { id } }).promise();
        return {
            statusCode: 200,
            body: data
        };
    } catch (err) {
        console.error(`Error happened at ${err.message}`);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};

