import * as  R from 'ramda'

export const notEmpty = R.pipe(R.isEmpty, R.not);
const notNil = R.pipe(R.isNil, R.not);
export const filterTotalCounts = R.filter(R.allPass([notNil, notEmpty, R.has('totalCount')]));
export const getRepository = R.propOr({}, 'data');
