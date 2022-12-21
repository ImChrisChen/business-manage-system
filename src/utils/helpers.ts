export const genCacheKey = (...args) => {
  args = ['BusinessManageSystem', ...args]
  return args.join('_')
}
