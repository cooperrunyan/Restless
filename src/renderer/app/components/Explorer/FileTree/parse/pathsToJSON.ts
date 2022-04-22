export function pathsToJSON(paths: { path: string; method?: string; id: string; isRequest?: boolean }[]) {
  return paths.reduce(
    (r, { path, method, id, isRequest }) => {
      let directories = ('root' + (path || '')).split('/');

      directories.reduce((d: any, key) => {
        if (key && !d[key]) {
          d[key] = { _: [] };
          d._.push((d[key].parent = { children: !isRequest ? d[key]._ : null, name: key, id, method, layer: path.split('/').lastIndexOf(key) - 1 }));
        }
        return d[key];
      }, r);
      return r;
    },
    { _: [] },
  )._;
}

// Magic. Source: https://stackoverflow.com/questions/62089566/file-paths-to-json-tree-structure
