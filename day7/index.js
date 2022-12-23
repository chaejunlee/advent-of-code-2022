const data = require('./data.js').data;

// cd * ls => everything in the current directory
// cd .. can be ignored?

function cleanse(data) {
  const directory = {};

  const lines = data.split("\n").map(line => line.trim());

  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('$ cd ..')) continue;
    if (lines[i].startsWith('$ cd')) {
      const path = lines[i].split(' ')[2];
      // console.log(path)
      if (directory[path]) {
        console.log(path);
        continue;
      }
      directory[path] = [];
      for (let j = i + 1; j < lines.length; j++) {
        if (lines[j].startsWith('$ ls')) continue;
        if (lines[j].startsWith('$ cd')) {
          i = j - 1;
          break;
        }
        directory[path].push(lines[j]);
      }
    }
  }
  return directory;
}

const lists = cleanse(data);
const sizes = {};

let totalSize = 0;

function dfs(path) {
  if (sizes[path]) return sizes[path];
  let size = 0;
  for (const item of lists[path]) {
    const line = item.split(' ');
    if (line[0] === "dir")
      size += dfs(line[1]);
    else
      size += Number(line[0]);
  }
  sizes[path] = size;
  // console.log(lists[path], size);
  return size;
}

dfs("/");

console.log(Object.keys(sizes).length)

for (const path in lists) {
  if (dfs(path) <= 100_000) {
    totalSize += sizes[path];
  }
}

console.log(Object.keys(sizes).length)

console.log(totalSize);

// not 585395
// not 1028106