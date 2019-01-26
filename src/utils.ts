import * as  R from 'ramda'

export const filterTotalCounts = R.filter(R.has('totalCount'));
export const getRepository = R.pathOr({}, ['data', 'data', 'repository']);