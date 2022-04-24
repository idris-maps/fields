export const init = <T>(arr: T[]): T[] => [...arr].slice(0, -1)

const getParts = (path: string) =>
  path.split('/').filter(d => d !== '' && d !== '.')

const move = (current: string[], path: string[]): string => {
  if (path.length === 0) { return '/' + current.join('/') }
  
  const [next, ...rest] = path
  if (next === '..') {
    return move(init(current), rest)
  } else {
    return move([...current, next], rest)
  }
}

export const getRelativePath = (meta: ImportMeta, path: string) => {
  const dirname = new URL('.', meta.url).pathname;
  return move(getParts(dirname), getParts(path))
}
