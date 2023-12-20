// @ts-ignore
import {readFileSync} from 'fs';

// const f = readFileSync('./e18.txt', 'utf-8');
const f = readFileSync('./e18-real.txt', 'utf-8');
// const f2 = readFileSync('./e18-real3.txt', 'utf-8');
// let a = f2.split('\n').map(r => r.split(''))
// let notdot = a.map(r => r.filter(c => c !== '.')).map(a => a.length)
// console.log(a.length, a[0].length, a.length * a[0].length, notdot.join(' '))

const dictionary = {
    '0': 'R',
    '1': 'D',
    '2': 'L',
    '3': 'U'
}
const list = f.split('\n').map(r => r.split(' ')).map(r => {
    // return {direction: r[0], steps: parseInt(r[1]), color: r[2].substring(2, r[2].length - 1)}
    return {direction: dictionary[r[2][r[2].length - 2]], steps: parseInt(r[2].substring(2, r[2].length - 2), 16)}
})
// console.log(list)

let map = {}
let x = 0, y = 0
for (let s of list) {
    if (s.direction === 'R') {
        if (!(x in map)) map[x] = []
        map[x].push({start: y, end: y + s.steps})
        y += s.steps
    } else if (s.direction === 'L') {
        if (!(x in map)) map[x] = []
        y -= s.steps
        map[x].push({start: y, end: y + s.steps})
    } else if (s.direction === 'D')
        x += s.steps
    else if (s.direction === 'U')
        x -= s.steps
    // console.log(x, y, s, map[x])
}
const keys = Object.keys(map).sort((a, b) => parseInt(a) - parseInt(b))
// keys.forEach(k => console.log(k, map[k]))
let ranges = []
let sum = 0
let lastK = parseInt(keys[0])
let q = []

for (let k of keys) {
    let kInt = parseInt(k)
    sum += ranges.reduce((a, b) => a + (b.end - b.start + 1) * (kInt - lastK), 0)
    let kLine = getKLine(k)
    // if (kInt - lastK === 0) console.log(ranges, map[k], kLine)
    sum += kLine.reduce((a, b) => a + (b.end - b.start + 1), 0)
    if (kInt > lastK) {
        for (let i = lastK; i < kInt; i++) {
            q.push(ranges.reduce((a, b) => a + (b.end - b.start + 1), 0))
        }
    }
    q.push(kLine.reduce((a, b) => a + (b.end - b.start + 1), 0))
    // if (ranges.reduce((a, b) => a + (b.end - b.start + 1), 0) === 239) console.log(k, lastK, ranges)
    // console.log(kInt)
    let all = [...map[k], ...ranges]
        .map(v => [v.start, v.end])
        .flat()
        .sort((a, b) => a - b)
    // console.log(kInt + 1, all)
    let i = 0
    while (i < all.length - 1) {
        if (all[i] === all[i + 1]) all.splice(i, 2)
        else i++
    }
    let newRanges = []
    for (let i = 0; i < all.length; i += 2) {
        if (all[i] === all[i + 1]) continue
        newRanges.push({start: all[i], end: all[i + 1]})
    }
    // if (kInt >= 136 && kInt <= 137) {
    //     // console.log(kInt, kInt - lastK, ranges.reduce((a, b) => a + (b.end - b.start + 1), 0), sum)
    //     console.log(kInt, 1, kLine.reduce((a, b) => a + (b.end - b.start + 1), 0), sum)
    //     // console.log('map', map[k].map(x => [x.start, x.end]))
    //     console.log('kline', kLine.map(x => [x.start, x.end]))
    //     // console.log('ranges', ranges.map(x => [x.start, x.end]))
    //     // console.log('newRanges', newRanges.map(x => [x.start, x.end]))
    // }

    ranges = newRanges
    lastK = kInt + 1
}
// console.log(q.join(' '))
// console.log('end', ranges)
console.log(sum)

function getKLine(k: string) {
    let all = [...ranges, ...map[k]]
        .sort((a, b) => a.start === b.start ? a.end - b.end : a.start - b.start)
        .flatMap(v => [v.start, v.end])
        .flat()
    let i = 1
    while (i < all.length - 2) {
        if (all[i] === all[i + 1]) all.splice(i, 2)
        else i++
    }
    i = 0
    while (i < all.length - 1) {
        if (all[i] === all[i + 2]) all.splice(i, 2)
        else i++
    }
    let kLine = []
    i = 0
    while (i < all.length - 1) {
        kLine.push({start: all[i], end: all[i + 1]})
        i += 2
    }
    i = 1
    while (i < kLine.length) {
        if (kLine[i - 1].start <= kLine[i].start && kLine[i - 1].end >= kLine[i].end) kLine.splice(i, 1)
        else i++
    }
    return kLine
}
