import * as  R from 'ramda'

export const filterTotalCounts = R.filter(R.has('totalCount'));
export const getRepository = R.pathOr({}, ['data', 'data', 'repository']);
// TODO: recursively get nested totals
export const getTotalCounts: (obj: object) => any = R.pipe(getRepository as any, filterTotalCounts);
