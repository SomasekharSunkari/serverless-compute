import AWS from 'aws-sdk';
const addTodo = async (event) => {
    try {

        const dynamodb = new AWS.DynamoDB.DocumentClient();

        const data = await dynamodb.scan({}).promise()
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