import AWS from 'aws-sdk';

export const updateTodo = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { completed } = JSON.parse(event.body);
        const { id } = event.pathParameters;

        const data = await dynamodb.update({
            TableName: "Todotable", Key: { id }, UpdateExpression: "set completed = :completed", ExpressionAttributeValues: {
                ":completed": completed
            },
            ReturnValues: "ALL_NEW"
        }).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({
                msg: "Todo Updated"
            })
        };
    } catch (err) {
        console.error(`Error happened at ${err.message}`);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
};

