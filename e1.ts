import {readFileSync} from 'fs';

const f = readFileSync('./e1.txt', 'utf-8');
const lines = f.split('\n')
let total = 0
for (const line of lines) {
    let raw = ''
    for (let i = 0; i < line.length; i++) {
        if (parseInt(line[i]) >= 0 && parseInt(line[i]) <= 9)
            raw += line[i]
        else {
            const lineFrom = line.slice(i)
            if (lineFrom.startsWith('one')) {
                raw += '1'
            } else if (lineFrom.startsWith('two')) {
                raw += '2'
            } else if (lineFrom.startsWith('three')) {
                raw += '3'
            } else if (lineFrom.startsWith('four')) {
                raw += '4'
            } else if (lineFrom.startsWith('five')) {
                raw += '5'
            } else if (lineFrom.startsWith('six')) {
                raw += '6'
            } else if (lineFrom.startsWith('seven')) {
                raw += '7'
            } else if (lineFrom.startsWith('eight')) {
                raw += '8'
            } else if (lineFrom.startsWith('nine')) {
                raw += '9'
            } else if (lineFrom.startsWith('zero')) {
                raw += '0'
            }
        }
    }

    const cleanRaw = raw.replace(/(\D+)/g, '')
    const res = `${cleanRaw[0]}${cleanRaw[cleanRaw.length - 1]}`
    console.log(line, raw, cleanRaw, res, parseInt(res))
    total += parseInt(res)
}
console.log(total)