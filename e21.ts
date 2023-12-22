// @ts-ignore
import {readFileSync} from 'fs'
import modulo from 'just-modulo'

const NB = [[-1, 0], [0, 1], [1, 0], [0, -1]]
const f = readFileSync('./e21.txt', 'utf-8')
// const f = readFileSync('./e21-real.txt', 'utf-8')

let garden = (f.split('\n').map((l: string) => l.split('')))
const si = garden.findIndex((l: string[]) => l.includes('S'))
const sj = garden[si].findIndex((c: string) => c === 'S')
garden[si][sj] = '.'
const m = garden.length, n = garden[0].length
const rowProgress = []
for (let i = 0; i < m * 2; i++) {
    rowProgress[i] = new Array(m * 2).fill(0)
}
let last = [[si, sj]]
for (let i = 1; i <= 44; i++) {
    const curr = []
    for (let [pi, pj] of last)
        for (let [di, dj] of NB) {
            let nextI = (pi + di)
            let nextJ = (pj + dj)
            if (garden[modulo(nextI, m)][modulo(nextJ, n)] === '.' && !curr.find(([i, j]) => i === nextI && j === nextJ)) {
                if (nextI < rowProgress.length && nextI < rowProgress.length && i >= 0 && nextI >= 0)
                    rowProgress[i][nextI]++
                curr.push([nextI, nextJ])
            }
        }
    last = curr
}
let newGarden = garden.map((l: string[]) => l.map((c: string) => c))
newGarden = [...newGarden, ...newGarden, ...newGarden, ...newGarden, ...newGarden]
for (let i = 0; i < newGarden.length; i++)
    newGarden[i] = [...newGarden[i], ...newGarden[i], ...newGarden[i], ...newGarden[i], ...newGarden[i]]
for (let [i, j] of last) {
    if (i < newGarden.length && j < newGarden[0].length && i >= 0 && j >= 0)
        newGarden[i][j] = 'O'
}
let a22 = []
for (let i = 0; i < newGarden.length; i++) {
    let count = 0
    for (let j = 0; j < 22; j++)
        if (newGarden[i][j] === 'O')
            count++
    a22[i] = count
}
console.log(newGarden[0].join('').slice(0, 22), newGarden[0].join('').slice(22, 44), newGarden[0].join('').slice(44))
let sum = 0
let limit = 50
for (let row = 0; row < 50; row++) {
    let a = Math.floor((50 - row) / 22)
    let b = modulo(row, 22)
    sum += a * a22[b] + a22[22 + b]
    console.log(row, a, b, a * a22[b], newGarden[row].filter((c: string) => c === 'O').length)
}

// newGarden.map((l: string[]) => console.log(l.join('')))

// console.log(last.length)