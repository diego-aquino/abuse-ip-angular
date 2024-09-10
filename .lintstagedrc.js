const ignoredFilenamesWithoutExtension = ['.lintstagedrc', 'postcss.config', 'tailwind.config'];

module.exports = {
  '*': ['pnpm style:format'],
  [`**/!(${ignoredFilenamesWithoutExtension.join('|')})*.(j|t)s(x|)`]: ['pnpm lint'],
};
