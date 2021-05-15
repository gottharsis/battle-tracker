import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppRoutingModule } from "./app-routing.module"
import { AppComponent } from "./app.component"
import { DashboardComponent } from "./dashboard/dashboard.component"
import { CombatantDetailComponent } from "./dashboard/combatant-detail/combatant-detail.component"
import { FormsModule } from "@angular/forms"

@NgModule({
    declarations: [AppComponent, DashboardComponent, CombatantDetailComponent],
    imports: [BrowserModule, AppRoutingModule, FormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
