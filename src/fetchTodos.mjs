import AWS from 'aws-sdk';

export const fetcTodos = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const data = await dynamodb.scan({ TableName: "Todotable" }).promise();
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

