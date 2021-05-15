import { Component, OnInit } from "@angular/core"
import { RollerService } from "../roller.service"
import { Combatant } from "../statblock/combatant"

@Component({
    selector: "app-dashboard",
    templateUrl: "./dashboard.component.html",
    styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
    combatants: Combatant[]

    constructor(private rollerService: RollerService) {
        this.combatants = [
            new Combatant({
                name: "Test1",
                ac: 10,
                hp: 20,
            }),
            new Combatant({
                name: "Monkey",
                ac: 14,
                hp: 30,
                traits: [
                    "Elven Accuarcy - triple advantage when not using STR",
                ],
            }),
        ]
    }

    roll() {
        this.rollerService.rollDice("3d6")
    }

    ngOnInit(): void {}
}
