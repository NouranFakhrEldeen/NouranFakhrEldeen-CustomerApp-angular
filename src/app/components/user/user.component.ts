import { Component, OnInit } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoginModel } from "../../models/login_model";
import { RepositoryService } from "../../services/repository.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  public loginForm: FormGroup;
  loginModel: LoginModel;
  loginErrorMSG: string = "";

  constructor(private repository: RepositoryService, private router: Router) {
    this.loginModel = new LoginModel();
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.loginForm.controls[controlName].hasError(errorName);
  };
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required])
    });
  }
  public login() {
    this.repository.post("account/login", this.loginModel).subscribe(
      (res: any) => {
        console.log(res);

        this.router.navigate(["/"]);
        localStorage.setItem("email", res.email);
        localStorage.setItem(
          "token",
          `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo`
        );
      },
      (err: any) => {
        console.log(err);
        this.loginErrorMSG = err.message;
      }
    );
  }
}
