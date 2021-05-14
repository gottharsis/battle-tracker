import { Action } from "./action"
export class Combatant {
    name: string
    ac: number
    actions: Action[]
    traits: string[]

    constructor(name: string, ac: number, actions?: Action[], traits?: []) {
        this.name = name
        this.ac = ac
        this.actions = actions ?? []
        this.traits = traits ?? []
    }
}
