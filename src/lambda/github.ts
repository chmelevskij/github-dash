import fetch from 'node-fetch';
import { Context, APIGatewayEvent } from 'aws-lambda';
import { URL } from 'url';
import ApolloClient, { gql } from 'apollo-boost';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `bearer ${GITHUB_TOKEN}`,
  },
  fetch: fetch as any,
});

const githubQuery = gql`
query Github($owner: String!, $name: String!, $until: GitTimestamp!) {
  repository(owner: $owner name: $name) {
    releases { totalCount }

    ref(qualifiedName: "master"){
      target {
        ...on Commit {
          history(until: $until, first:50){
            totalCount
            nodes {
              additions
              deletions
              changedFiles
              committedDate
              pushedDate
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
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
    diskUsage
    createdAt
    updatedAt
    languages(first: 100) {
      edges {
        node {
					name
          color
        }
        size
      }
    }
  }
}
`;

export async function handler(event: APIGatewayEvent, context: Context) {
  try {
    // TODO: validation
    const [, owner, name] = new URL(event.queryStringParameters.repo).pathname.split('/');

    const { data } = await client.query<{ repository: any }>({
        query: githubQuery,
        variables: {
          owner,
          name,
          until: new Date().toISOString(),
        },
      });

    return ({
      statusCode: 200,
      body: JSON.stringify(data.repository),
    });
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
