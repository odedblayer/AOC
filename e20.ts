// @ts-ignore
import {readFileSync} from 'fs'

// const f = readFileSync('./e20.txt', 'utf-8')
// const f = readFileSync('./e20b.txt', 'utf-8')
const f = readFileSync('./e20-real.txt', 'utf-8')

const comps = f.split('\n').map(l => l.split(' -> ')).map(l => {
    return {
        type: l[0][0],
        name: l[0].slice(1),
        targets: l[1].split(', '),
        state: l[0][0] === '&' ? {} : false
    }
})
comps
    .filter(c => c.type === '&')
    .forEach(c => comps.filter(c2 => c2.targets.includes(c.name)).map(c2 => c.state[c2.name] = false))
// jq state; gt, vr, nl, lr
// lr depends on ns: &ns -> &lr -> &jq -> rx
const jq = comps.find(c => c.name === 'jq')
// ns state: rb, mf, xv, jz, br, kh, lj
const ns = comps.find(c => c.name === 'ns')
// console.log(jq)
// console.log(ns)

type pulse = {
    isHigh: boolean
    from: string
    to: string
}
let r = {}
let clickCounter = 0
let low = 0, high = 0
for (let i = 0; i < 10000; i++) {
    let {lowCount: l, highCount: h} = click()
    low += l
    high += h
}

console.log(r)

// console.log(low, high, low * high)

function click() {
    clickCounter++
    let queue = [{isHigh: false, from: 'button', to: 'roadcaster'}]
    let highCount = 0, lowCount = 0
    while (queue.length > 0) {
        const signal = queue.shift()
        if (signal.isHigh) highCount++
        else lowCount++
        const comp = comps.find(c => c.name === signal.to)
        if (!comp) continue
        if (comp.type === '%') {
            if (!signal.isHigh) {
                comp.state = !comp.state
                for (let target of comp.targets)
                    queue.push({isHigh: !!comp.state, from: comp.name, to: target})
            }
            // else console.log(comp.name, 'ignoring high')
        } else if (comp.type === '&') {
            comp.state[signal.from] = signal.isHigh
            if (comp.name === 'jq' && Object.values(comp.state).some(Boolean)) console.log(comp.state, clickCounter)
            if (Object.values(comp.state).every(Boolean)) {
                if (!r[comp.name]) {
                    r[comp.name] = {first: clickCounter, last: clickCounter}
                } else {
                    let diff = clickCounter - r[comp.name].last
                    r[comp.name].last = clickCounter
                    if (diff in r[comp.name] && r[comp.name].diff !== diff) console.log('OH NO diff', diff, r[comp.name])
                    r[comp.name].diff = diff
                }
                let trueFields = Object.keys(r).filter(k => Object.values(comps.find(c => c.name === k).state).every(Boolean)).join(', ')
                // if (trueFields != 'vr, lr, nl, gt') console.log(trueFields)
            }
            for (let target of comp.targets)
                queue.push({isHigh: !Object.values(comp.state).every(Boolean), from: comp.name, to: target})
        } else if (comp.type === 'b') {
            for (let target of comp.targets)
                queue.push({isHigh: signal.isHigh, from: comp.name, to: target})
        }
    }
    return {highCount, lowCount}
}



