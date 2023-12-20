// @ts-ignore
import {readFileSync} from 'fs';

// const f = readFileSync('./e17.txt', 'utf-8');
const f = readFileSync('./e17-real.txt', 'utf-8');

const m = f.split('\n').map(r => r.split('').map(s => parseInt(s)))
type ij = { i: number, j: number }
const STEPS_FROM = 4
const STEPS_TO = 10
let mm = m.length;
let nn = m[0].length;
const dp = []
for (let i = 0; i < mm; i++) {
    for (let j = 0; j < nn; j++) {
        if (!dp[i]) dp[i] = []
        dp[i][j] = {ew: [], ns: [], minNS: Infinity, minEW: Infinity, min: Infinity}
    }
}
m[0][0] = 0
dp[mm - 1][nn - 1].minEW = m[mm - 1][nn - 1]
dp[mm - 1][nn - 1].minNS = m[mm - 1][nn - 1]
dp[mm - 1][nn - 1].min = m[mm - 1][nn - 1]
let dp00 = dp[0][0].min
let prevDp00 = undefined
while (true) {
    for (let i = mm - 1; i >= 0; i--)
        for (let j = nn - 1; j >= 0; j--) {
            fillEW(i, j)
            fillNS(i, j)
        }
    // dp.forEach(r => console.log(r.map(c => c.min).join(',')))
    prevDp00 = dp00
    dp00 = dp[0][0].min
    console.log(dp00, prevDp00)
}

function fillEW(i: number, j: number) {
    let min = dp[i][j].minEW
    for (let k = STEPS_FROM; k <= STEPS_TO && j + k < nn; k++)
        min = Math.min(min, dp[i][j + k].minNS + m[i].slice(j, j + k).reduce((a, b) => a + b, 0))
    for (let k = STEPS_FROM; k <= STEPS_TO && j - k >= 0; k++)
        min = Math.min(min, dp[i][j - k].minNS + m[i].slice(j - k + 1, j + 1).reduce((a, b) => a + b, 0))
    dp[i][j].minEW = min
    dp[i][j].min = Math.min(min, dp[i][j].minNS)
}

function fillNS(i: number, j: number) {
    let min = dp[i][j].minNS
    for (let k = STEPS_FROM; k <= STEPS_TO && i + k < mm; k++)
        min = Math.min(min, dp[i + k][j].minEW + m.map(r => r[j]).slice(i, i + k).reduce((a, b) => a + b, 0))
    for (let k = STEPS_FROM; k <= STEPS_TO && i - k >= 0; k++)
        min = Math.min(min, dp[i - k][j].minEW + m.map(r => r[j]).slice(i - k + 1, i + 1).reduce((a, b) => a + b, 0))
    dp[i][j].minNS = min
    dp[i][j].min = Math.min(min, dp[i][j].minEW)
}
