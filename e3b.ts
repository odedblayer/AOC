import {readFileSync} from 'fs';

const f = readFileSync('./e3-real.txt', 'utf-8');
console.log(f)
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
            let visited = {}
            let nums = []
            for (let k = 0 ; k < digits.length; k++) {
                let [ii, jj] = digits[k]
                if (`${ii},${jj}` in visited) continue
                let firstDigit = jj - 1
                while (firstDigit >= 0 && isNumber(a[ii][firstDigit])) firstDigit--
                let currDigit = firstDigit + 1
                let num = 0
                while (currDigit < n && isNumber(a[ii][currDigit])) {
                    num *= 10
                    num += parseInt(a[ii][currDigit])
                    visited[`${ii},${currDigit}`] = 1
                    currDigit++
                }
                nums.push(num)
            }
            if (nums.length !== 2) continue
            sum += nums[0] * nums[1]
        }
    }
}

console.log(sum)