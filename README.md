# Github Dashboard

Some statistics aquired from githubs graphQL api.

Features include:
1. Total numbers of some metrics.
2. Language vizualization
3. Labels and their usage for issues and prs
4. Last 100 commit additions/deletions and files modified graph.

## Tech used

* Aws Lambda for querying the github api.
* typescript, both lamdbas and react. Prefer use Ts to reduce the number of tests needed.
* Styled-components for component styling.
* Ramda - functional utility library for data manipulation.
* React-router
* Chartjs

## Possible improvements

1. Loading the content for the route only not the all in one go.
3. Using oAuth to authorize user for private repos and using their limits.
4. Paginating through the data like commit history.
5. Some more tests.
6. Proxying the github graphql api with limited subset of schema.
7. Better handling of error messages, there none pretty much.