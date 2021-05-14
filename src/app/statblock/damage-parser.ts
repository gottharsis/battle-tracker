interface Die {
    count: number
    die: number
}

type Expr = Die | number

interface ParseResult {
    dice: string[]
    text: string[]
}
/**
 * Rolls a die and returns the result
 * @param dieSize The size of the die
 * @returns The result of the roll
 */
export const roll = (dieSize: number) => 1 + Math.floor(Math.random() * dieSize)

export function rollDice(die: Expr): number {
    if (typeof die === "number") {
        return die
    }
    let result = 0
    for (let i = 0; i < die.count; i++) {
        result += roll(die.die)
    }
    return result
}

export function extractDice(inputString: string): ParseResult {
    const expressionRegex = /\b(?:[+]?\d*d\d+|[+-]?\d+)+/g
    const dice = [...inputString.matchAll(expressionRegex)].map((i) => i[0])
    const text = inputString.split(expressionRegex).map((i) => i.trim())
    return { dice, text }
}

export function parseDice(s: string): Expr[] {
    const makeDiceFromMatch = (match: RegExpMatchArray) => ({
        count: match[1] ? parseInt(match[1]) : 1,
        die: parseInt(match[2]),
    })

    const parseExpression = (expr: string): Expr => {
        const match = expr.match(/(\d*)d(\d+)/)
        if (match) {
            return makeDiceFromMatch(match)
        } else {
            return parseInt(expr)
        }
    }

    const pattern = /[+]?\d*d\d+|[+-]\d+|\b\d+\b/g
    const result = [...s.matchAll(pattern)].map((i) => parseExpression(i[0]))
    return result
}

/**
 * merges two arrays in a zipper format
 *
 * if we have a1, a2, ... and b1, b2, ..., then we get a1, b1, a2, ...
 * @param a the first array
 * @param b the second array
 * @returns the zipped array
 */
function zipper<T>(a: T[], b: T[]): T[] {
    const result = []
    let i
    for (i = 0; i < Math.min(a.length, b.length); i++) {
        result.push(a[i])
        result.push(b[i])
    }
    for (; i < a.length; i++) {
        result.push(a[i])
    }
    for (; i < b.length; i++) {
        result.push(b[i])
    }
    return result
}

export function parseDamageString(damageString: string): string {
    const { dice, text } = extractDice(damageString)

    const dieExpressions = dice.map((i) => parseDice(i))

    const rollAllDice = (exprList: Expr[]) =>
        exprList.map((exp) => rollDice(exp)).reduce((a, b) => a + b, 0)
    const dieResults = dieExpressions.map(rollAllDice)

    const words = zipper(
        text,
        dieResults.map((i) => i.toString())
    )
    if (dieResults.length > 1) {
        const total = dieResults.reduce((a, b) => a + b, 0)
        words.push(`(${total} total)`)
    }
    return words.join(" ").trim()
}
