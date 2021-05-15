import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core"
import { Combatant } from "src/app/statblock/combatant"

@Component({
    selector: "combatant-detail",
    templateUrl: "./combatant-detail.component.html",
    styleUrls: ["./combatant-detail.component.scss"],
})
export class CombatantDetailComponent implements OnInit {
    @Input() combatant?: Combatant
    @Output() changeCombatant = new EventEmitter<Combatant>()
    editMode = false
    constructor() {}

    enterEditMode() {
        if (!this.combatant) return
        this.editMode = true
    }

    exitEditMode() {
        if (!this.combatant) return
        this.editMode = false
        this.changeCombatant.emit(this.combatant)
    }

    ngOnInit(): void {}
}
