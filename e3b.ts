import {readFileSync} from 'fs';

const f = readFileSync('./e3.txt', 'utf-8');
const a = f.split('\n').map(l => l.split(''))
const m = a.length
const n = a[0].length

function isNumber(char) {
    return char >= '0' && char <= '9';
}

const NB = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], [0, 1],
    [1, -1], [1, 0], [1, 1]
]

function getDigitsAround(a: string[][], i: number, j: number) {
    let digitNBs = []
    NB.forEach(([di, dj]) => {
        const ii = i + di
        const jj = j + dj
        if (ii >= 0 && ii < a.length && jj >= 0 && jj < a[0].length &&
            isNumber(a[ii][jj]))
            digitNBs.push([ii, jj])
    })
    return digitNBs;
}

let sum = 0

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if ((a[i][j]) === '*') {
            const digits = getDigitsAround(a, i, j)
            if (digits.length < 2) continue
            for (let k = 0 ; k < digits.length; k++) {

            }
        }
    }
}

console.log(sum)