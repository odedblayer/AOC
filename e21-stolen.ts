import {readFileSync} from 'fs'

const getKey = (x: number, y: number, z: number) => (z * 1000 + x) * 1000 + y

const findPlots = (
    map: string[][],
    x: number,
    y: number,
    maxSteps: number,
    visited = new Set<number>(),
    distance = 0
): number => {
    const key = getKey(x, y, distance)

    if (visited.has(key)) return 0
    visited.add(key)

    if (distance === maxSteps) return 1

    let plots = 0

    const neighbors = [
        [x - 1, y],
        [x + 1, y],
        [x, y - 1],
        [x, y + 1],
    ]

    neighbors.forEach(([nx, ny]) => {
        if (nx < 0 || ny < 0 || nx >= map[0].length || ny >= map.length) return

        if (map[ny][nx] === ".") {
            plots += findPlots(map, nx, ny, maxSteps, visited, distance + 1)
        }
    })

    return plots
}

export const getPlotsCount = (input: string, steps = 6) => {
    const map = input.split("\n").map((line) => line.split(""))

    const startY = map.findIndex((line) => line.includes("S"))
    const startX = map[startY].findIndex((char) => char === "S")

    map[startY][startX] = "."

    return findPlots(map, startX, startY, steps)
}

/**
 * Alignment of the repeating gardens:
 *
 * O = Odd garden ( oddGardenPlots )
 * E = Even garden ( evenGardenPlots )
 * S = Small side garden ( NEPlotsSM, SWPlotsSM, NWPlotsSM, SEPlotsSM )
 * L = Large side garden ( NEPlotsLG, SWPlotsLG, NWPlotsLG, SEPlotsLG )
 * C = Center garden (Starting point)
 * North = North garden ( northPlots )
 * East = East garden ( eastPlots )
 * South = South garden ( southPlots )
 * West = West garden ( westPlots )
 *
 *                 North
 *                 S | S
 *               L - E - L
 *             S |   |   | S
 *           L - E - O - E - L
 *         S |   |   |   |   | S
 *    West - E - O - C - O - E - East
 *         S |   |   |   |   | S
 *           L - E - O - E - L
 *             S |   |   | S
 *               L - E - L
 *                 S | S
 *                 South
 */

export const getPlotsCountBig = (input: string, steps: number) => {
    const map = input.split("\n").map((line) => line.split(""))

    const startY = map.findIndex((line) => line.includes("S"))
    const startX = map[startY].findIndex((char) => char === "S")

    map[startY][startX] = "."

    const mapWidth = map.length

    const gardenGridDiameter = ~~(steps / mapWidth) - 1

    const oddGardens = (~~(gardenGridDiameter / 2) * 2 + 1) ** 2
    const evenGardens = (~~((gardenGridDiameter + 1) / 2) * 2) ** 2

    const oddGardenPlots = findPlots(map, startX, startY, mapWidth * 2 + 1)
    const evenGardenPlots = findPlots(map, startX, startY, mapWidth * 2)

    const northPlots = findPlots(map, startX, mapWidth - 1, mapWidth - 1)
    const eastPlots = findPlots(map, 0, startY, mapWidth - 1)
    const southPlots = findPlots(map, startX, 0, mapWidth - 1)
    const westPlots = findPlots(map, mapWidth - 1, startY, mapWidth - 1)

    const smallSteps = ~~(mapWidth / 2) - 1

    const NEPlotsSM = findPlots(map, 0, mapWidth - 1, smallSteps)
    const NWPlotsSM = findPlots(map, mapWidth - 1, mapWidth - 1, smallSteps)
    const SEPlotsSM = findPlots(map, 0, 0, smallSteps)
    const SWPlotsSM = findPlots(map, mapWidth - 1, 0, smallSteps)

    const largeSteps = ~~((mapWidth * 3) / 2) - 1

    const NEPlotsLG = findPlots(map, 0, mapWidth - 1, largeSteps)
    const NWPlotsLG = findPlots(map, mapWidth - 1, mapWidth - 1, largeSteps)
    const SEPlotsLG = findPlots(map, 0, 0, largeSteps)
    const SWPlotsLG = findPlots(map, mapWidth - 1, 0, largeSteps)

    // console.log({ SEPlotsSM, SWPlotsSM, NWPlotsSM, NEPlotsSM });
    // console.log({ SEPlotsLG, SWPlotsLG, NWPlotsLG, NEPlotsLG });
    // console.log({ oddGardenPlots, evenGardenPlots });

    const mainGardenPlots =
        oddGardens * oddGardenPlots + evenGardens * evenGardenPlots

    const smallSidePlots =
        (gardenGridDiameter + 1) * (SEPlotsSM + SWPlotsSM + NWPlotsSM + NEPlotsSM)

    const largeSidePlots =
        gardenGridDiameter * (SEPlotsLG + SWPlotsLG + NWPlotsLG + NEPlotsLG)

    return (
        mainGardenPlots +
        smallSidePlots +
        largeSidePlots +
        northPlots +
        eastPlots +
        southPlots +
        westPlots
    )
}

const f = readFileSync('./e21-real.txt', 'utf-8')

console.log(getPlotsCountBig(f, 26501365))

