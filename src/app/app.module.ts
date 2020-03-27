import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserComponent } from "./components/user/user.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { RepositoryService } from "./services/repository.service";
import { HttpClientModule } from "@angular/common/HTTP";
import { ModifiersComponent } from "./components/modifiers/modifiers.component";
import { ToastrModule } from "ngx-toastr";
import { ModalModule } from "ngx-bootstrap/modal";

@NgModule({
  declarations: [AppComponent, UserComponent, ModifiersComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [RepositoryService],
  bootstrap: [AppComponent]
})
export class AppModule {}
