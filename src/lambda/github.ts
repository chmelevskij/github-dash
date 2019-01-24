import fetch from 'node-fetch';
import { Context, APIGatewayEvent } from 'aws-lambda';
import { URL } from 'url';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.hawkgirl-preview+json',
  },
  fetch: fetch as any,
});

const githubQuery = gql`
query Github($owner: String!, $name: String!) {
  repository(owner: $owner name: $name) {
		forks(first: 10) {
      nodes {
        nameWithOwner
      }
    }
  }
}
`;

export async function handler(event: APIGatewayEvent, context: Context) {
  try {
    // TODO: validation
    const [, owner, name] = new URL(event.queryStringParameters.repo).pathname.split('/');

    const repo = await client.query({
      // TODO: pagination
      query: githubQuery,
      variables: {
        owner,
        name,
      },

    });
    return {
      statusCode: 200,
      body: JSON.stringify(repo)
    }
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
