import {readFileSync} from 'fs';
const V ={
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 1, 'Q': 12, 'K': 13, 'A': 14}



// const f = readFileSync('./e7.txt', 'utf-8');
const f = readFileSync('./e7-real.txt', 'utf-8');

const hands = f.split('\n').map(l => {
    const w = l.split(' ')
    const hand = w[0].trim()
    const bid = parseInt(w[1].trim())
    return {hand, bid}
})


hands.sort((a, b) => {
    const aMap = {}
    const bMap = {}
    for (let i = 0 ; i < 5 ;i ++){
        const ca = a.hand[i]
        const cb = b.hand[i]
        if (!(ca in aMap)) aMap[ca] = 0
        if (!(cb in bMap)) bMap[cb] = 0
        aMap[ca]++
        bMap[cb]++
    }
    let aj = 0
    if (aMap['J'] > 0 && aMap['J'] < 5) {
        aj = aMap['J']
        delete aMap['J']
    }
    let bj = 0
    if (bMap['J'] > 0 && bMap['J'] < 5) {
        bj = bMap['J']
        delete bMap['J']
    }
    // @ts-ignore
    const aValues: number[] = Object.values(aMap).sort((aa,bb)=> bb-aa)
    // @ts-ignore
    const bValues: number[] =  Object.values(bMap).sort((aa,bb)=> bb-aa)
    aValues[0] += aj
    bValues[0] += bj
    // console.log(aValues, bValues, a.hand, b.hand)
    if (aValues[0] === bValues[0]) {
        if (aValues[1] !== bValues[1])
            return aValues[1] - bValues[1]
    }
    else return aValues[0] - bValues[0]
    const aa = a.hand
    const bb = b.hand

    // console.log('same', aa, bb, aValues, bValues)

    if (aa[0] === bb[0])
        if (aa[1] === bb[1])
            if (aa[2] === bb[2])
                if (aa[3] === bb[3])
                    return V[aa[4]] - V[bb[4]]
                else return V[aa[3]] - V[bb[3]]
            else return V[aa[2]] - V[bb[2]]
        else return V[aa[1]] - V[bb[1]]
    else return V[aa[0]] - V[bb[0]]
})


let score = 1
let sum = 0
for (const h of hands) {
    console.log(score, h.bid, h.hand)
    sum += h.bid * score++
}
console.log(sum)
