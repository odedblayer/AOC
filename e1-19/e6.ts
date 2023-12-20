import {readFileSync} from 'fs';

// const f = readFileSync('./e6.txt', 'utf-8');
const f = readFileSync('./e6-real.txt', 'utf-8');
const v = f.split('\n').map(s => s.split(':')[1].split(' ').filter(x => x !== ''))
const races = []
for (let i = 0; i < v[0].length; i++) {
    races.push({time: v[0][i], distance: v[1][i]})
}
console.log(races)

let total = 1
for (let race of races) {
    let count = 0
    for (let i = 0 ; i < race.time; i++) {
        let speed = i
        let remainingTime = race.time - i
        if (remainingTime * speed > race.distance) count++
    }
    total *= count
}

console.log(total)
