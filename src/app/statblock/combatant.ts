import { Action } from "./action"

interface CombatantConstructorArgs {
    name: string
    ac?: number
    hp?: number
    actions?: Action[]
    traits?: string[]
    isPlayer?: boolean
}
export class Combatant {
    name: string
    ac: number
    currentHP: number
    maxHP: number
    actions: Action[]
    traits: string[]
    isPlayer: boolean

    constructor({
        name,
        ac = 0,
        hp = 0,
        actions,
        traits,
        isPlayer = false,
    }: CombatantConstructorArgs) {
        this.name = name
        this.ac = ac
        this.currentHP = this.maxHP = hp
        this.actions = actions ?? []
        this.traits = traits ?? []
        this.isPlayer = isPlayer
    }

    public toString(): string {
        const sections = [this.name + ":"]
        if (this.ac > 0) {
            sections.push(`AC: ${this.ac}`)
        }
        if (this.maxHP > 0) {
            sections.push(`HP: ${this.currentHP} / ${this.maxHP}`)
        }
        return sections.join(" ")
    }

    public damage(damage: number) {
        this.currentHP -= damage
        this.currentHP = Math.max(this.currentHP, 0)
        this.currentHP = Math.min(this.currentHP, this.maxHP)
    }
}
