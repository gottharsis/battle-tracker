import { Component, OnInit } from "@angular/core"
import { RollerService } from "../roller.service"

@Component({
    selector: "app-roller",
    templateUrl: "./roller.component.html",
    styleUrls: ["./roller.component.scss"],
})
export class RollerComponent implements OnInit {
    history: string[]
    query: string

    constructor(private rollerService: RollerService) {
        this.history = ["Monkey 1", "Monkey 2", "40 fire and 3 lightning"]
        this.rollerService.subject.subscribe((result) => {
            this.onDieRoll(result)
        })
        this.query = ""
    }

    onDieRoll(dieResult: string) {
        // this.history.push(dieResult)
        this.history.unshift(dieResult)
    }

    roll() {
        if (!this.query) return
        this.rollerService.rollDice(this.query)
        this.query = ""
    }

    ngOnInit(): void {}
}
