import { Component, OnInit } from '@angular/core';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import validate = WebAssembly.validate;
import {AccessService} from "../../service/access.service";
import {first} from "rxjs/operators";



@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgetPasswordGroup: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder , private accessService: AccessService) { }

  ngOnInit(): void {

    this.forgetPasswordGroup = this.formBuilder.group({
      email:['' , [Validators.required , Validators.email]]
    });
  }

  submitForm () {
    if(this.forgetPasswordGroup.valid){
      this.accessService.requestPassword(this.forgetPasswordGroup.value)
        .pipe(first()).subscribe(
          res => {
            console.log(res);
          }
      )
    }
  }
}
