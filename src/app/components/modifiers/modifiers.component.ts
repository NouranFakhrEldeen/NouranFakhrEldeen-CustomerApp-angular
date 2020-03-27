import { Component, OnInit, TemplateRef } from "@angular/core";
import { RepositoryService } from "../../services/repository.service";
import { Router } from "@angular/router";
import { ModifierModel } from "../../models/modifier.model";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-modifiers",
  templateUrl: "./modifiers.component.html",
  styleUrls: ["./modifiers.component.css"]
})
export class ModifiersComponent implements OnInit {
  constructor(
    private repository: RepositoryService,
    private router: Router,
    private modalService: BsModalService
  ) {}
  Modifier: ModifierModel[];
  modalRef: BsModalRef;
  ModifierForm: FormGroup;
  ModifierModel: ModifierModel;
  IsChecked: boolean;
  ngOnInit() {
    this.getModifer();
  }
  getModifer() {
    this.repository.get("Modifier").subscribe(
      (data: any[]) => {
        this.Modifier = data as any[];
        console.log(this.Modifier);
      },
      err => {},
      () => {}
    );
  }
  openModifierModel(template: TemplateRef<any>) {
    this.addForm();
    this.modalRef = this.modalService.show(template);
  }

  addForm() {
    this.ModifierForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      maxpicks: new FormControl("", [Validators.required]),
      multiselect: new FormControl("", [Validators.required])
    });
  }
  Reset() {
    this.ModifierForm.reset();
  }
  addModifier() {
    debugger;
    this.repository.post("Modifier", this.ModifierForm.value).subscribe(
      (res: any) => {
        this.Reset();
        alert("New Item added successfully agenda");
        this.modalRef.hide();
        this.getModifer();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }
  OnChange($event) {
    console.log($event);
    // if (this.IsChecked == true)
    //  this.IsChecked = true;
  }
}
