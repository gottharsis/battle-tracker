import { Injectable } from "@angular/core"
import { Subject } from "rxjs"
import { parseDamageString } from "./statblock/damage-parser"

/**
 * Service to send messages of rolls
 */
@Injectable({
    providedIn: "root",
})
export class RollerService {
    readonly subject: Subject<string> = new Subject()
    constructor() {}

    public rollDice(diceString: string) {
        const result = parseDamageString(diceString)
        this.subject.next(result)
    }
}
