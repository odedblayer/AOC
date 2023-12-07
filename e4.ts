import {readFileSync} from 'fs';

// const f = readFileSync('./e4.txt', 'utf-8');
const f = readFileSync('./e4-full.txt', 'utf-8');
const cards = f.split('\n')
    .map(l => l.split(': ')[1])
    .map(s => s.split(' | '))
    .map(a => {
        return {
            winning: a[0].split(' ').filter(s => s.trim().length > 0).map(s => parseInt(s)),
            nums: a[1].split(' ').filter(s => s.trim().length > 0).map(s => parseInt(s))
        }
    })

let sum = 0
let i = 1
let histogram = {}
for (let i = 0; i < cards.length; i++) histogram[i + 1] = 1
for (let card of cards) {
    let numWinners = 0
    for (let winner of card.winning)
        if (card.nums.includes(winner)) numWinners++
    for (let k = i + 1; k <= i + numWinners; k++) histogram[k] += histogram[i]
    i++
}
console.log(histogram, Object.values(histogram).reduce((s: number, n: number) => s += n, 0))


