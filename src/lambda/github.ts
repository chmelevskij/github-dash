import { Context, APIGatewayEvent } from 'aws-lambda';
import { URL } from 'url';

export async function handler(event: APIGatewayEvent, context: Context) {
  try {
    // TODO: validation
    const [, username, repo] = new URL(event.queryStringParameters.repo).pathname.split('/');
    return {
      statusCode: 200,
      body: 'OK'
    }
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
