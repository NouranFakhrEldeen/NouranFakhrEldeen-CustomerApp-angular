import { Component, OnInit, TemplateRef } from "@angular/core";
import { RepositoryService } from "../../services/repository.service";
import { Router } from "@angular/router";
import { ModifierModel } from "../../models/modifier.model";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-modifiers",
  templateUrl: "./modifiers.component.html",
  styleUrls: ["./modifiers.component.css"]
})
export class ModifiersComponent implements OnInit {
  Modifiers: ModifierModel[];
  modalRef: BsModalRef;
  ModifierForm: FormGroup;
  ModifierModel: ModifierModel;
  IsChecked: false;
  constructor(
    private repository: RepositoryService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.ModifierModel = new ModifierModel();
  }

  ngOnInit() {
    this.getModifer();
    debugger;
    this.ModifierForm = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      maxpicks: new FormControl("", [Validators.required]),
      multiselect: new FormControl("", [Validators.required])
    });
  }
  getModifer() {
    this.repository.get("Modifier").subscribe(
      (data: any[]) => {
        this.Modifiers = data as any[];
        console.log(this.Modifiers);
      },
      err => {},
      () => {}
    );
  }
  openModifierModel(template: TemplateRef<any>) {
    this.ModifierForm;

    debugger;
    this.modalRef = this.modalService.show(template);
  }

  // addForm() {
  //   this.ModifierForm = new FormGroup({
  //     name: new FormControl("", [Validators.required]),
  //     description: new FormControl("", [Validators.required]),
  //     price: new FormControl("", [Validators.required]),
  //     maxpicks: new FormControl("", [Validators.required]),
  //     multiselect: new FormControl("", [Validators.required])
  //   });
  //   debugger;
  // }
  Reset() {
    this.ModifierForm.reset();
  }
  addModifier() {
    debugger;
    this.repository.post("Modifier", this.ModifierForm.value).subscribe(
      (res: any) => {
        this.Reset();
        this.toastr.success(
          "Success",
          "New Item added successfully to modifiers"
        );
        this.modalRef.hide();
        this.getModifer();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }

  openEditModal(template: TemplateRef<any>, item: any) {
    // this.ModifierForm = item;
    // this.ModifierModel = this.ModifierForm.value;
    // console.log(item);
    this.ModifierModel = Object.assign({}, item);
    debugger;
    this.modalRef = this.modalService.show(template);
    this.modalRef.content = this.ModifierModel;
  }
  editModifier(item: any) {
    debugger;
    this.repository.put("Modifier", item).subscribe(
      (res: any) => {
        this.toastr.success("Success", "This item deleted successfully");
        this.modalRef.hide();
        this.getModifer();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }
  OnChange($event) {
    debugger;
    console.log($event);
    this.ModifierModel.multiselect = this.IsChecked;
    // if (this.IsChecked == true)
    //  this.IsChecked = true;
  }

  remove(item: any) {
    debugger;

    this.repository.delete(`Modifier/${item._id}`, item._id).subscribe(
      (res: any) => {
        this.Modifiers.splice(item.id, 1);
        this.toastr.success("Success", "This item deleted successfully");

        this.getModifer();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
    this.getModifer();
  }
  onSave() {
    debugger;

    if (this.ModifierForm.value._id != null)
      this.editModifier(this.ModifierForm);
    else this.addModifier();
  }
}
