import { parseDamageString, extractDice, parseDice } from "./damage-parser"

describe("Damage Parser", () => {
    describe("Pattern Extractor", () => {
        it("should parse a solo pattern", () => {
            const exp = "8d6"
            const result = extractDice(exp)
            expect(result.dice).toBeTruthy()
            expect(result.dice.length).toEqual(1)
            expect(result.dice[0]).toEqual("8d6")
        })

        it("should parse solo pattern with multiple digits", () => {
            const exp = "22d34"
            const result = extractDice(exp)
            expect(result.dice).toBeTruthy()
            expect(result.dice.length).toEqual(1)
            expect(result.dice).toEqual([exp])
        })

        it("should work for multiple dice groups", () => {
            const exp = "3d6 4d8"
            const result = extractDice(exp)

            expect(result.dice).toBeTruthy()
            expect(result.dice).toHaveSize(2)
            expect(result.dice).toEqual(["3d6", "4d8"])
        })

        it("should correctly extract text with one pattern", () => {
            const exp = "beginning 3d6 ending"
            const result = extractDice(exp)
            expect(result.text).toBeTruthy()
            expect(result.text).toHaveSize(2)
            expect(result.text).toEqual(["beginning", "ending"])
        })

        it("should extract text with no pattern", () => {
            const result = extractDice("bonjour")
            expect(result.dice).toHaveSize(0)
            expect(result.text).toHaveSize(1)
        })

        it("should handle arithmetic expressions", () => {
            const exp = "8d6+4d8+7-4 monkey"
            const result = extractDice(exp)
            expect(result.dice).toHaveSize(1)
            expect(result.dice[0]).toEqual("8d6+4d8+7-4")
        })
    })

    describe("dice parser", () => {
        it("should handle a lone dice expressoin", () => {
            const result = parseDice("8d6")
            expect(result).toEqual([{ count: 8, die: 6 }])
        })

        it("should handle positive and negative numbers", () => {
            const result = parseDice("+6-7")
            expect(result).toEqual([6, -7])
        })

        it("should handle dice of the form 'd6'", () => {
            const result = parseDice("d6")
            expect(result).toEqual([{ count: 1, die: 6 }])
        })

        it("should handle multiple dice", () => {
            const result = parseDice("1d4+2d6")
            expect(result).toEqual([
                { count: 1, die: 4 },
                { count: 2, die: 6 },
            ])
        })

        it("should handle dice and modifiers", () => {
            const result = parseDice("2d10+5")
            expect(result).toEqual([{ count: 2, die: 10 }, 5])
        })
    })

    describe("overall test", () => {
        it("should work overall", () => {
            const expr = "8d6 fire"
            const result = parseDamageString(expr)

            expect(expr.split(" ")).toHaveSize(2)
            const [damageText, _] = expr.split(" ")
            const damage = parseInt(damageText)
            expect(damage).toBeLessThanOrEqual(48)
            expect(damage).toBeGreaterThanOrEqual(8)

            expect(result).toMatch(/\d{1,2} fire/)
        })

        it("should work with multiple damage types", () => {
            const expr = "6 fire + 3d6 lightning"
            const result = parseDamageString(expr)

            expect(result).toMatch(
                /^6 fire \+ \d{1,2} lightning \(\d{1,2} total\)/
            )
        })

        it("should work with multiple dice/modifiers of the same type", () => {
            const expr = "3d6+4d12+7 force"
            const result = parseDamageString(expr)

            expect(result).toMatch(/^\d{1,2} force$/)
        })
    })
})
