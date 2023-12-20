import {readFileSync} from 'fs';

// const f = readFileSync('./e8b.txt', 'utf-8');
const f = readFileSync('./e8-real.txt', 'utf-8');

const lines = f.split('\n')
let lastTime = Date.now()
const lr = lines[0]
const map = {}
let curr = []
for (let i = 2; i < lines.length; i++) {
    const parts = lines[i].split(' = ')
    const directions = parts[1].split(', ')
    if (parts[0][parts[0].length - 1] === 'A') curr.push(parts[0])
    map[parts[0]] =
        {
            left: directions[0].substring(1),
            right: directions[1].substring(0, directions[1].length - 1)
        }
}

// console.log(lr, map)

let loops = []
let lastZ = []
let found = 0
let count = 0
// curr = [curr[3], curr[4], curr[5]]
// while (found < curr.length) {
while(count < 47634422309) {
    let countZ= 0
    for (let i = 0 ; i < curr.length ; i++) {
        if (curr[i].endsWith('Z')) {
            // let oldLoops = loops[i]
            loops[i] = count - lastZ[i]
            lastZ[i] = count
            // if (oldLoops !== loops[i])
            //     console.log(i, count, curr, lastZ, loops)
            countZ++
        }
    }
    const d = lr[count % lr.length]
    if (d === 'L') {
        for (let i = 0; i < curr.length; i++) {
            curr[i] = map[curr[i]].left
        }
    } else {
        for (let i = 0; i < curr.length; i++) {
            curr[i] = map[curr[i]].right
        }
    }
    count++
    if (count % 100000000 === 0) {
        let lastNow = lastTime
        lastTime = Date.now()
        console.log( count * 100 / 47634422309, (lastTime - lastNow) / 1000)
    }
}
console.log(count, curr, loops)
let res = BigInt(1)
for (let l of loops)
    res *= BigInt(l)
// console.log(res)