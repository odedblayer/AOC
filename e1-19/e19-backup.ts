// // @ts-ignore
// import {readFileSync} from 'fs'
//
//
// const fullRange: partRange = {
//     x: [1, 4000],
//     m: [1, 4000],
//     a: [1, 4000],
//     s: [1, 4000]
// }
//
// const KEYS = ['x', 'm', 'a', 's']
//
// type partRange = {
//     x: number[],
//     m: number[],
//     a: number[],
//     s: number[]
// }
//
// // const f = readFileSync('./e19.txt', 'utf-8')
// const f = readFileSync('./e19c.txt', 'utf-8')
//
// // const f = readFileSync('./e19-real.txt', 'utf-8')
//
// function e19() {
//     const lines = f.split('\n')
//     const rules = parseRules(lines)
//     console.log(rules)
//
//     // let prefixes = ['in']
//     // let accepted = {}
//     // let rejected = {}
//     // while (prefixes.length > 0) {
//     //     let nextPrefixes = []
//     //     for (let prefix of prefixes) {
//     //         let nextRule = prefix[prefix.length - 1]
//     //         for (let key in rules[nextRule]) {
//     //             let nextPrefix = [...prefix, key]
//     //             if (key === 'A') accepted.push(nextPrefix)
//     //             else if (key === 'R') rejected.push(nextPrefix)
//     //             else nextPrefixes.push(nextPrefix)
//     //
//     //         }
//     //     }
//     //     prefixes = nextPrefixes
//     //     // if (prefixes[0] && prefixes[0].length === 7) break
//     // }
//     // let sum = 0
//     // for (let a of prefixes) {
//     //     // console.log(a)
//     //     let combined = {}
//     //     for (let i = 0; i < a.length - 1; i++) {
//     //         let ranges = rules[a[i]][a[i + 1]]
//     //         for (let key in ranges) {
//     //             if (key in combined) {
//     //                 let before = combined[key]
//     //                 combined[key] = [Math.max(combined[key][0], ranges[key][0]), Math.min(combined[key][1],
//     // ranges[key][1])] // console.log('key', key, before, ranges[key], '=', combined[key]) } else combined[key] =
//     // ranges[key] } } // console.log('path', a.join('->'), combined, calcCombined(combined)) sum +=
//     // calcCombined(combined) } console.log('prefixes', sum)  for (let a of accepted) { // console.log(a) let
// combined // = {} for (let i = 0; i < a.length - 1; i++) { let ranges = rules[a[i]][a[i + 1]] for (let key in ranges)
// { if // (key in combined) { let before = combined[key] if (ranges[key].length > 2) { // console.log(ranges[key], //
// combined[key]) combined[key] = [Math.max(combined[key][0], ranges[key][0]), Math.min(combined[key][1], //
// ranges[key][1]), Math.max(combined[key][0], ranges[key][2]), Math.min(combined[key][1], ranges[key][3])] //
// console.log('key', key, before, ranges[key], '=', combined[key]) } else combined[key] = //
// [Math.max(combined[key][0], ranges[key][0]), Math.min(combined[key][1], ranges[key][1])] } else combined[key] = //
// ranges[key] } } // console.log('path', a.join('->'), combined, calcCombined(combined)) sum += //
// calcCombined(combined) } console.log('accepted', sum)  for (let a of rejected) { let combined = {} for (let i = //
// 0; i < a.length - 1; i++) { let ranges = rules[a[i]][a[i + 1]] for (let key in ranges) { if (key in combined) { //
// let before = combined[key] combined[key] = [Math.max(combined[key][0], ranges[key][0]), // Math.min(combined[key][1], ranges[key][1])] // console.log('key', key, before, ranges[key], '=', combined[key]) // if (combined[key][1] <= combined[key][0]) console.log('key', key, before, ranges[key], '=', combined[key]) } // else combined[key] = ranges[key] } } // console.log('path', a.join('->'), combined, calcCombined(combined)) sum // += calcCombined(combined) } console.log('total', sum) console.log('possibilities', calcCombined(fullRange)) }  //140,809,783,868,000 //140,809,783,868,000 //256,000,000,000,000 // function calcCombined(combined) { //     let total = 1 //     let str = '1' //     for (let key of KEYS) { //         if (combined[key]) { //             let s = 0 //             str += '*(' //             for (let i = 0; i < combined[key].length; i += 2) { //                 str += `${combined[key][i + 1] - combined[key][i] + 1}` //                 if (i + 1 < combined[key].length - 1) str += '+' //                 s += (combined[key][i + 1] - combined[key][i] + 1) //             } //             str += ')' //             total *= s //         } else { //             str += `*4000` //             total *= 4000 //         } //     } //     // if (str.includes('+')) console.log('oh no', str) //     // console.log(str, total) //     return total // }  e19()   function parseRule(line: string) { const [name, ruleString] = line.slice(0, line.length - 1).split('{') let conditions = ruleString.split(',') let destToRanges = [] let unmatched = [] let count = 0 for (let condition of conditions) { let dest let char let num let isGT let range if (conditions.includes(':')) { dest = condition.split(':')[1] isGT = condition.includes('>') char = condition.split(isGT ? '>' : '<')[0] num = parseInt(condition.split(isGT ? '>' : '<')[1]) destToRanges.push({dest, char, range: isGT ? [num + 1, 4000] : [0, num - 1]}) unmatched.push({char: isGT ? [1, num] : [num, 4000]}) } } console.log(name, destToRanges)  return }   // function parseRulesAndParts(lines: string[]): { rules: rule[], parts: part[] } { function parseRules(lines: string[]) { const rules = [] let line = lines.shift() while (line) { const {name, destToRanges} = parseRule(line)  rules[name] = destToRanges line = lines.shift() } return rules }  // console.log(rules)  // line = lines.shift() // while (line !== undefined) { //     parts.push(parsePart(line)) //     line = lines.shift() // } // return {rules, parts} // }  // function parsePart(line: string): part { //     let partsStrings = line.slice(1, line.length - 1).split(',') //     return { //         x: parseInt(partsStrings[0].split('=')[1]), //         m: parseInt(partsStrings[1].split('=')[1]), //         a: parseInt(partsStrings[2].split('=')[1]), //         s: parseInt(partsStrings[3].split('=')[1]) //     } // }  // function e19a(parts: part[], rules: rule[]) { //     let sum = 0 //     parts.forEach(p => { //         let nextRule = 'in' //         while (!['A', 'R'].includes(nextRule)) //             nextRule = runRules(p, rules[nextRule]) //         if (nextRule === 'A') sum += sumPart(p) //         console.log(p, nextRule, sumPart(p)) //     }) //     console.log(sum) // } // // // type rule = { //     condition?: string //     result: string // } // // type part = { //     x: number, //     m: number, //     a: number, //     s: number // }   // function sumPart(part) { //     return part.x + part.m + part.a + part.s // }  // function evaluateCondition(p, condition: string) { //     let isGT = condition.includes('>') //     let [leftSide, rightSide] = isGT ? condition.split('>') : condition.split('<') //     return isGT ? p[leftSide] > parseInt(rightSide) : p[leftSide] < parseInt(rightSide) // } // // function runRules(p, rules: rule[]) { //     for (let r of rules) { //         if (!r.condition) return r.result //         if (evaluateCondition(p, r.condition)) return r.result //     } //     return 'Oh No' // }
