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

    const { data } = await client.query({
      query: githubQuery,
      variables: {
        owner,
        name,
        until: new Date().toISOString(),
      },
    });

    // There is an issue with GQL api, it doesn't return number of bytes
    // per language, which makes it unusable really...
    const languages = await  fetch(`https://api.github.com/repos/facebook/react/languages?access_token=${GITHUB_TOKEN}`).then(resp => resp.json());
    const body = {
      ...data.repository,
      languages,
    }

    return ({
      statusCode: 200,
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
