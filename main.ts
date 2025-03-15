import { APIGatewayProxyHandler } from 'aws-lambda';
import { config } from 'dotenv';
import { Client } from 'pg';


config({
    path: './.env',
  });

// Lambda handler
export const handler: APIGatewayProxyHandler = async (event) => {
    const body = event; // Lambda Payload Object
    let dbConnection: Client;
    try {
        
        // Connect to the source database and fetch data
        console.log('Connecting to the database through RDS Proxy');
        dbConnection = new Client({
            host: process.env.DB_PROXY_ENDPOINT,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        });
        await dbConnection.connect();
        console.log('Connected to the database through RDS Proxy');

        // ADD LOGIC HERE
        
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Lambda function executed successfully.' }),
        };
    } catch (error) {
        console.error('Error processing data:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error processing data', error: error.message }),
        };
    } finally {
        // Close connections
        if (dbConnection) {
            await dbConnection.end();
            console.log('Database connection closed');
        }
    }
};

