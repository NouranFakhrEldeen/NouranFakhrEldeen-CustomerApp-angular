import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { ModifiersComponent } from "./components/modifiers/modifiers.component";
const routes: Routes = [
  { path: "", component: UserComponent },
  { path: "Modifier", component: ModifiersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
