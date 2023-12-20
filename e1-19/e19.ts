// @ts-ignore
import {readFileSync} from 'fs'


const fullRange: partRange = {
    x: [1, 4000],
    m: [1, 4000],
    a: [1, 4000],
    s: [1, 4000]
}

const KEYS = ['x', 'm', 'a', 's']

type partRange = {
    x: number[],
    m: number[],
    a: number[],
    s: number[]
}

// const f = readFileSync('./e19.txt', 'utf-8')
// const f = readFileSync('./e19c.txt', 'utf-8')

const f = readFileSync('./e19-real.txt', 'utf-8')

const lines = f.split('\n').filter(l => l.length > 0 && l[0] !== '{')
const {accepted, rejected} = parseRules(lines)
let acceptedSum = accepted.map(calc).reduce((a, b) => a + b, 0)
let rejectedSum = rejected.map(calc).reduce((a, b) => a + b, 0)
console.log('accepted', acceptedSum)
console.log('rejected', rejectedSum)
console.log('total', acceptedSum + rejectedSum)


function parseRule(line: string, unmatched) {
    const [name, ruleString] = line.slice(0, line.length - 1).split('{')
    let conditions = ruleString.split(',')
    let paths = []
    for (let condition of conditions) {
        let dest, char, num, isGT
        let map = {}
        if (condition.includes(':')) {
            dest = condition.split(':')[1]
            isGT = condition.includes('>')
            char = condition.split(isGT ? '>' : '<')[0]
            num = parseInt(condition.split(isGT ? '>' : '<')[1])
            let included = isGT ? [num + 1, 4000] : [0, num - 1]
            let excluded = isGT ? [1, num] : [num, 4000]
            let path = {...unmatched}
            path[char] = [Math.max(path[char][0], included[0]), Math.min(path[char][1], included[1])]
            paths.push({dest, path})
            unmatched[char] = [Math.max(unmatched[char][0], excluded[0]), Math.min(unmatched[char][1], excluded[1])]
        } else {
            let path = {...unmatched}
            paths.push({dest: condition, path})
        }
    }
    return paths
}

function calc(options) {
    let mult = 1
    for (let key of KEYS) {
        mult *= (options[key][1] - options[key][0] + 1)
    }
    return mult
}

// function parseRulesAndParts(lines: string[]): { rules: rule[], parts: part[] } {
function parseRules(lines: string[]) {
    const linesMap = {}
    for (let i = 0; i < lines.length; i++) {
        linesMap[lines[i].split('{')[0]] = lines[i]
    }
    let curr = [{name: 'in', soFar: {...fullRange}}]
    const accepted = []
    const rejected = []
    while (curr.length > 0) {
        let next = []
        for (let e of curr) {
            let paths = parseRule(linesMap[e.name], e.soFar)
            for (let p of paths) {
                if (p.dest === 'R') rejected.push(p.path)
                else if (p.dest === 'A') accepted.push(p.path)
                else next.push({name: p.dest, soFar: p.path})
            }
        }
        curr = next
    }
    return {accepted, rejected}
}