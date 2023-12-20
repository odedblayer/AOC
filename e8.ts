import {readFileSync} from 'fs';

// const f = readFileSync('./e8.txt', 'utf-8');
const f = readFileSync('./e8-real.txt', 'utf-8');

const lines = f.split('\n')

const lr = lines[0]
const map = {}
for (let i = 2; i < lines.length; i++) {
    const parts = lines[i].split(' = ')
    const directions = parts[1].split(', ')
    map[parts[0]] =
        {
            left: directions[0].substring(1),
            right: directions[1].substring(0, directions[1].length - 1)
        }
}

console.log(lr, map)

let found = false
let count = 0
let current = 'AAA'
while (!found) {
    const d = lr[count % lr.length]
    if (d === 'L')
        current = map[current].left
    else
        current = map[current].right
    if (current === 'ZZZ') found = true
    count++
}
console.log(count)