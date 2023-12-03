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

function hasSymbolAround(a: string[][], i: number, j: number) {
    let hasNB = false
    NB.forEach(([di, dj]) => {
        const ii = i + di
        const jj = j + dj
        if (ii >= 0 && ii < a.length && jj >= 0 && jj < a[0].length &&
            !isNumber(a[ii][jj]) && a[ii][jj] !== '.')
            hasNB = true
    })

    return hasNB;
}

let sum = 0

for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
        if (isNumber(a[i][j])) {
            let num = parseInt(a[i][j])
            let k = j + 1
            while (k < n && isNumber(a[i][k])) {
                num *= 10
                num += parseInt(a[i][k])
                k++
            }
            let hasSymbol = false
            for (let x = j; x < k; x++) {
                hasSymbol ||= hasSymbolAround(a, i, x)
            }
            if (hasSymbol) sum += num
            j = k - 1
            console.log(num, hasSymbol)
        }
    }
}

console.log(sum)