import { parseDamageString, roll } from "./damage-parser"

type time = "action" | "bonus" | "reaction"

interface ActionConstructorParameters {
    name: string
    description: string
    economy?: time
    damage?: string
    hitBonus?: number
    dc?: string
    recharge?: number
}

export class Action {
    readonly name: string
    readonly description: string
    readonly economy: time

    readonly damage?: string
    readonly hitBonus?: number
    readonly dc?: string

    constructor({
        name,
        description,
        economy = "action",
        damage,
        hitBonus,
        dc,
    }: ActionConstructorParameters) {
        this.name = name
        this.description = description
        this.economy = economy
        this.damage = damage
        this.hitBonus = hitBonus
        this.dc = dc
    }

    private makeOutput(toHit?: number, damage?: string) {
        const sections = [
            `<b>${this.name}:</b>`,
            (toHit && `${toHit} to hit`) || "",
            this.dc || "",
            damage || "",
        ]
        return sections.join(" ")
    }

    public roll(): string {
        const toHit = this.hitBonus ? roll(20) + this.hitBonus : undefined
        const damage = this.damage ? parseDamageString(this.damage) : undefined
        return this.makeOutput(toHit, damage)
    }
}
