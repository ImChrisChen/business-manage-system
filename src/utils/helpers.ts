export const genCacheKey = (...args) => {
  args = ['BusinessManageSystem', ...args]
  return args.join('_')
}

export const listToTree = (
  list: Array<any>,
  fields?: {
    id?: string
    pid?: string
    children?: string
  },
): Array<any> => {
  const map = {}
  const roots: Array<any> = []
  const { id = 'id', pid = 'pid', children = 'children' } = fields

  for (let i = 0; i < list.length; i++) {
    const node = list[i]
    node[children] = []
    map[node[id]] = i // 通过id可以找到node
  }

  for (let i = 0; i < list.length; i++) {
    const node = list[i]
    if (node[pid] === 0) {
      roots.push(node)
    } else {
      list[map[node[pid]]].children.push(node)
    }
  }
  return roots
}
