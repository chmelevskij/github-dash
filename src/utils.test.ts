import { getRepository, filterTotalCounts } from './utils';
import * as R from 'ramda';

const repository = {
  "releases": {
    "totalCount": 73,
    "__typename": "ReleaseConnection"
  },
  "ref": {
    "target": {
      "treeUrl": "https://github.com/facebook/react/tree/e19c9e106401fd41c91b67273d4c22289ed0917c",
      "history": {
        "totalCount": 10618,
        "__typename": "CommitHistoryConnection"
      },
      "__typename": "Commit"
    },
    "__typename": "Ref"
  },
  "issues": {
    "totalCount": 6916,
    "__typename": "IssueConnection"
  },
  "stargazers": {
    "totalCount": 120702,
    "__typename": "StargazerConnection"
  },
  "watchers": {
    "totalCount": 6603,
    "__typename": "UserConnection"
  },
  "pullRequests": {
    "totalCount": 7629,
    "__typename": "PullRequestConnection"
  },
  "forks": {
    "totalCount": 21113,
    "__typename": "RepositoryConnection"
  },
  "assignableUsers": {
    "totalCount": 55,
    "__typename": "UserConnection"
  },
  "commitComments": {
    "totalCount": 501,
    "__typename": "CommitCommentConnection"
  },
  "defaultBranchRef": {
    "name": "master",
    "__typename": "Ref"
  },
  "labels": {
    "totalCount": 48,
    "nodes": [
      {
        "name": "Type: Bug",
        "color": "b60205",
        "__typename": "Label"
      },
      {
        "name": "Resolution: Duplicate",
        "color": "cccccc",
        "__typename": "Label"
      },
      {
        "name": "Type: Enhancement",
        "color": "84b6eb",
        "__typename": "Label"
      },
      {
        "name": "Resolution: Invalid",
        "color": "e6e6e6",
        "__typename": "Label"
      },
      {
        "name": "Type: Question",
        "color": "cc317c",
        "__typename": "Label"
      },
      {
        "name": "Resolution: Wontfix",
        "color": "ffffff",
        "__typename": "Label"
      },
      {
        "name": "Difficulty: starter",
        "color": "94ce52",
        "__typename": "Label"
      },
      {
        "name": "Browser: Safari",
        "color": "c7def8",
        "__typename": "Label"
      },
      {
        "name": "Browser: IE",
        "color": "c7def8",
        "__typename": "Label"
      },
      {
        "name": "Component: Build Infrastructure",
        "color": "f9d0c4",
        "__typename": "Label"
      },
      {
        "name": "Type: Release",
        "color": "00D8EA",
        "__typename": "Label"
      },
      {
        "name": "Type: Feature Request",
        "color": "c7def8",
        "__typename": "Label"
      },
      {
        "name": "SVG",
        "color": "f7c6c7",
        "__typename": "Label"
      },
      {
        "name": "Component: DOM",
        "color": "fef2c0",
        "__typename": "Label"
      },
      {
        "name": "Component: Core Utilities",
        "color": "c5def5",
        "__typename": "Label"
      },
      {
        "name": "Component: Test Utils",
        "color": "eb6420",
        "__typename": "Label"
      },
      {
        "name": "Status: Unconfirmed",
        "color": "d4c5f9",
        "__typename": "Label"
      },
      {
        "name": "Status: New",
        "color": "006b75",
        "__typename": "Label"
      },
      {
        "name": "Type: Regression",
        "color": "e11d21",
        "__typename": "Label"
      },
      {
        "name": "Component: Optimizing Compiler",
        "color": "bfdadc",
        "__typename": "Label"
      },
      {
        "name": "CLA Signed",
        "color": "e7e7e7",
        "__typename": "Label"
      },
      {
        "name": "Component: Shallow Renderer",
        "color": "eb6420",
        "__typename": "Label"
      },
      {
        "name": "Type: Big Picture",
        "color": "61dafb",
        "__typename": "Label"
      },
      {
        "name": "HTML",
        "color": "f7c6c7",
        "__typename": "Label"
      },
      {
        "name": "Resolution: Unsolved",
        "color": "fef2c0",
        "__typename": "Label"
      },
      {
        "name": "Status: Reverted",
        "color": "d93f0b",
        "__typename": "Label"
      },
      {
        "name": "Difficulty: medium",
        "color": "fbca04",
        "__typename": "Label"
      },
      {
        "name": "Resolution: Needs More Information",
        "color": "fffde7",
        "__typename": "Label"
      },
      {
        "name": "Component: Server Rendering",
        "color": "d4c5f9",
        "__typename": "Label"
      },
      {
        "name": "Type: Discussion",
        "color": "fef2c0",
        "__typename": "Label"
      },
      {
        "name": "Component: Test Renderer",
        "color": "006b75",
        "__typename": "Label"
      },
      {
        "name": "Component: Developer Tools",
        "color": "fbca04",
        "__typename": "Label"
      },
      {
        "name": "Type: Umbrella",
        "color": "5319e7",
        "__typename": "Label"
      },
      {
        "name": "Type: Needs Investigation",
        "color": "fbca04",
        "__typename": "Label"
      },
      {
        "name": "good first issue",
        "color": "6ce26a",
        "__typename": "Label"
      },
      {
        "name": "good first issue (taken)",
        "color": "b60205",
        "__typename": "Label"
      },
      {
        "name": "Component: Reconciler",
        "color": "f9a798",
        "__typename": "Label"
      },
      {
        "name": "Component: Component API",
        "color": "d4c5f9",
        "__typename": "Label"
      },
      {
        "name": "Difficulty: challenging",
        "color": "f2687c",
        "__typename": "Label"
      },
      {
        "name": "Type: Breaking Change",
        "color": "aa2608",
        "__typename": "Label"
      },
      {
        "name": "â¤ï¸",
        "color": "ffffff",
        "__typename": "Label"
      },
      {
        "name": "Component: ReactIs",
        "color": "1d76db",
        "__typename": "Label"
      },
      {
        "name": "Needs Browser Testing",
        "color": "1EBBEE",
        "__typename": "Label"
      },
      {
        "name": "Component: Suspense",
        "color": "8ffcd6",
        "__typename": "Label"
      },
      {
        "name": "Component: Hooks",
        "color": "c2f27b",
        "__typename": "Label"
      },
      {
        "name": "Component: Scheduler",
        "color": "9de8f9",
        "__typename": "Label"
      },
      {
        "name": "Resolution: Support Redirect",
        "color": "106099",
        "__typename": "Label"
      },
      {
        "name": "Component: Concurrent Mode",
        "color": "ffccd3",
        "__typename": "Label"
      }
    ],
    "__typename": "LabelConnection"
  },
  "languages": {
    "totalSize": 2815166,
    "nodes": [
      {
        "name": "JavaScript",
        "color": "#f1e05a",
        "__typename": "Language"
      },
      {
        "name": "Shell",
        "color": "#89e051",
        "__typename": "Language"
      },
      {
        "name": "CoffeeScript",
        "color": "#244776",
        "__typename": "Language"
      },
      {
        "name": "TypeScript",
        "color": "#2b7489",
        "__typename": "Language"
      },
      {
        "name": "Python",
        "color": "#3572A5",
        "__typename": "Language"
      },
      {
        "name": "C++",
        "color": "#f34b7d",
        "__typename": "Language"
      },
      {
        "name": "C",
        "color": "#555555",
        "__typename": "Language"
      },
      {
        "name": "Makefile",
        "color": "#427819",
        "__typename": "Language"
      },
      {
        "name": "HTML",
        "color": "#e34c26",
        "__typename": "Language"
      },
      {
        "name": "CSS",
        "color": "#563d7c",
        "__typename": "Language"
      }
    ],
    "__typename": "LanguageConnection"
  },
  "diskUsage": 140291,
  "createdAt": "2013-05-24T16:15:54Z",
  "updatedAt": "2019-01-26T06:48:44Z",
  "primaryLanguage": {
    "name": "JavaScript",
    "color": "#f1e05a",
    "__typename": "Language"
  },
  "__typename": "Repository"
};

const resp = {
    "data": {
      ...repository,
    },
};

describe('getRepository()', () => {
  it('gets the data from response', () => {
    const result = getRepository(resp);

    expect(result).toMatchObject(repository);
  });
});

describe('filterTotalCounts', () => {
  it('should get only objects containing totalCount property', () => {
    const result = filterTotalCounts(repository);
    expect(R.keys(result).length).toBe(9);
  });
});
