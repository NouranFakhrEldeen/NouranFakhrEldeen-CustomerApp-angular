import { Component, OnInit, TemplateRef } from "@angular/core";
import { RepositoryService } from "../../services/repository.service";
import { Router } from "@angular/router";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { ProductModel } from "../../models/product.model";
import { isNgTemplate } from "@angular/compiler";
import { ModifierModel } from "../../models/modifier.model";
@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  Products: ProductModel[];
  allProduct: any[];
  modalRef: BsModalRef;
  ProductForm: FormGroup;
  ProductModel: ProductModel;
  IsChecked: false;
  allModifiers: ModifierModel[];
  Modifiername: any[];
  constructor(
    private repository: RepositoryService,
    private router: Router,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.ProductModel = new ProductModel();
  }

  ngOnInit() {
    this.getProduct();

    this.ProductForm = new FormGroup({
      _id: new FormControl(""),
      name: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      comment: new FormControl("", [Validators.required]),
      store: new FormControl("", [Validators.required]),
      ModifierId: new FormControl("", [Validators.required])
    });
    this.getModifier();
  }
  getModifier() {
    this.repository.get("Modifier").subscribe(
      (res: any) => {
        this.allModifiers = res;
      },
      (err: any) => {
        this.toastr.error(err.error.message, "Error");
      }
    );
  }
  getProduct() {
    this.repository.get("Product").subscribe(
      (data: any[]) => {
        this.Products = data as any[];
        let test = this.Products.map(a => a.Modifier);
        this.Modifiername = this.Products.map(a => a.Modifiername);
        let obj = {};

        console.log("name", this.Modifiername);
        test.forEach(element => {
          this.repository.get(`Modifier/${element}`, element).subscribe(
            (res: any) => {
              this.Modifiername.push(res.name);

              console.log("name", this.Modifiername);
            },

            (err: any) => {
              this.toastr.error(err.error.message, "Error");
            }
          );
        });

        console.log(test);
        console.log("product", this.Products);
      },
      err => {},
      () => {}
    );
  }
  getModifierById(item: any) {
    this.repository.get(`Modifier/${item}`, item).subscribe(
      (res: any) => {
        // this.Products.map(function(res) {
        //   var name = Object.assign({}, res);
        //   name.name = res.name;
        //   return name;
        // });

        this.Modifiername = res.name;
        console.log("name", this.Modifiername);
      },
      (err: any) => {
        this.toastr.error(err.error.message, "Error");
      }
    );
  }
  openProductModel(template: TemplateRef<any>) {
    this.ProductForm;

    debugger;
    this.modalRef = this.modalService.show(template);
  }

  Reset() {
    this.ProductForm.reset();
  }
  addProduct() {
    debugger;
    this.repository.post("Product", this.ProductForm.value).subscribe(
      (res: any) => {
        this.Reset();
        this.toastr.success(
          "Success",
          "New Item added successfully to Products"
        );
        this.modalRef.hide();
        this.getProduct();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }

  openEditModal(template: TemplateRef<any>, item: any) {
    // this.ProductForm = item;
    // this.ProductModel = this.ProductForm.value;
    // console.log(item);
    this.ProductModel = Object.assign({}, item);
    debugger;
    this.modalRef = this.modalService.show(template);
    this.modalRef.content = this.ProductModel;
  }
  editProduct(item: any) {
    debugger;
    this.repository.put("Product", item).subscribe(
      (res: any) => {
        this.toastr.success("Success", "This item deleted successfully");
        this.modalRef.hide();
        this.getProduct();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
  }

  remove(item: any) {
    debugger;

    this.repository.delete(`Product/${item._id}`, item._id).subscribe(
      (res: any) => {
        this.Products.splice(item.id, 1);
        this.toastr.success("Success", "This item deleted successfully");

        this.getProduct();
      },
      (err: any) => {
        console.log(err.message);
      }
    );
    this.getProduct();
  }
  onSave() {
    debugger;

    this.editProduct(this.ProductForm);
  }
}
