import * as R from 'ramda';

const mergeLanguages = (repository, languageSizes) => R.evolve(
  {
    languages: R.pipe(
      R.prop('nodes'),
      R.reduce((acc, { name, color }: { name: string, color: string }) => {
        if (acc[name]) {
          acc[name].color = color;
          acc[name].size = languageSizes[name];
        } else {
          acc[name] = {};
          acc[name].color = color;
          acc[name].size = languageSizes[name];
        }
        return acc;
      }, {}),
    ),
  }
)(repository);

export { mergeLanguages };
