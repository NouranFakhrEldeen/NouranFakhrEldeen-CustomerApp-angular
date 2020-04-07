import { Component, OnInit, TemplateRef } from "@angular/core";
import { RepositoryService } from "../../services/repository.service";
import { Router } from "@angular/router";
import { CategoryModel } from "../../models/category.model";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"]
})
export class CategoryComponent implements OnInit {
  Categories: CategoryModel[];
  modalRef: BsModalRef;
  CategoryForm: FormGroup;
  CategoryModel: CategoryModel;

  constructor(
    private repository: RepositoryService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.CategoryModel = new CategoryModel();
  }

  ngOnInit() {
    this.getModifer();
    debugger;
    this.CategoryForm = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("", [Validators.required])
    });
  }
  getModifer() {
    this.repository.get("Category").subscribe(
      (data: any[]) => {
        this.Categories = data as any[];
        console.log(this.Categories);
      },
      err => {},
      () => {}
    );
  }
  openCategoryModel(template: TemplateRef<any>) {
    this.CategoryForm;

    debugger;
    this.modalRef = this.modalService.show(template);
  }

  Reset() {
    this.CategoryForm.reset();
  }
  addCategory() {
    debugger;
    this.repository.post("Category", this.CategoryForm.value).subscribe(
      (res: any) => {
        this.Reset();
        this.toastr.success(
          "Success",
          "New Item added successfully to Categorys"
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
    // this.CategoryForm = item;
    // this.CategoryModel = this.CategoryForm.value;
    // console.log(item);
    this.CategoryModel = Object.assign({}, item);
    debugger;
    this.modalRef = this.modalService.show(template);
    this.modalRef.content = this.CategoryModel;
  }
  editCategory(item: any) {
    debugger;
    this.repository.put("Category", item).subscribe(
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

  remove(item: any) {
    debugger;

    this.repository.delete(`Category/${item._id}`, item._id).subscribe(
      (res: any) => {
        this.Categories.splice(item.id, 1);
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

    if (this.CategoryForm.value._id != null)
      this.editCategory(this.CategoryForm);
    else this.addCategory();
  }
}
