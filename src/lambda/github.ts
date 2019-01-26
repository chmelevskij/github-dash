import fetch from 'node-fetch';
import { Context, APIGatewayEvent } from 'aws-lambda';
import { URL } from 'url';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
  },
  fetch: fetch as any,
});

const githubQuery = gql`
query Github($owner: String!, $name: String!) {
  repository(owner: $owner name: $name) {
    releases { totalCount }

    ref(qualifiedName: "master"){
      target {
        ...on Commit {
          treeUrl
          history { totalCount }
        }
      }
    }
    issues{ totalCount }
    stargazers { totalCount }
    watchers { totalCount }
    pullRequests{ totalCount }
    forks{ totalCount }
    assignableUsers { totalCount }
    commitComments{ totalCount }
    defaultBranchRef { name }
    labels(first:100) {
      totalCount
      nodes {
        name
        color
        pullRequests {
          totalCount
        }
        issues {
          totalCount
        }
      }
    }
    languages(first:50) {
      totalSize
      nodes {
        name
        color
      }
    }
    diskUsage
    createdAt
    updatedAt
    primaryLanguage {
      name
      color
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
