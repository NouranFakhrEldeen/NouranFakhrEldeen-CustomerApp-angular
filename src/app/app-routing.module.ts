import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./components/user/user.component";
import { ModifiersComponent } from "./components/modifiers/modifiers.component";
import { ProductComponent } from "./components/product/product.component";
import { CategoryComponent } from "./components/category/category.component";
const routes: Routes = [
  { path: "", component: UserComponent },
  { path: "Modifier", component: ModifiersComponent },
  { path: "Product", component: ProductComponent },
  { path: "Category", component: CategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
