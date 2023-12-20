import {readFileSync} from 'fs';

const f = readFileSync('./e2.txt', 'utf-8');
const lines = f.split('\n')
type set = {
    blue?: number
    red?: number
    green?: number
}

const parsed = lines.map(l =>
    l.split(': ')[1].split('; ').map(d => {
        const set = {} as set
        d.split(', ').map(p => {
            const a = p.split(' ')
            set[a[1]] = parseInt(a[0])
        })
        return set
    })
)

let sum = 0
for (let i = 1; i <= parsed.length; i++) {
    const minSet =
        {
            red: Math.max(...parsed[i-1].map(d => d.red || 0)),
            green: Math.max(...parsed[i-1].map(d => d.green || 0)),
            blue: Math.max(...parsed[i-1].map(d => d.blue || 0)),
        }
    const power = minSet.red * minSet.green * minSet.blue;
    sum += power
}

console.log(sum)

