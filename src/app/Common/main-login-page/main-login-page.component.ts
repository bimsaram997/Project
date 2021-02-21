import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AccessService} from "../../service/access.service";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-main-login-page',
  templateUrl: './main-login-page.component.html',
  styleUrls: ['./main-login-page.component.css']
})
export class MainLoginPageComponent implements OnInit {
  email = '';
  password = '';
  loginEmail: any;
  loginPassword: any;
  hide = true;

  constructor(private router: Router,
              private accessService: AccessService,
              private toastrService: ToastrService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
    this.isLoggedUser();
    this.isLoggedAdmin();
    this.isLoggedClerk();
  }
  login(){
    if(this.loginEmail === 'admin' && this.loginPassword === '123'){
      this.cookieService.putObject('adminData', this.loginEmail);
      this.router.navigate(['adminDashboard/adminDashContent']);
    }else if(this.loginEmail === 'clerk' && this.loginPassword === '123'){
      this.cookieService.putObject('clerkData', this.loginEmail);
      this.router.navigate(['clerkDashBoard/clerkDashContent']);
    }else {
      this.accessService.login(this.loginEmail.toString(), this.loginPassword.toString()).subscribe(result => {
        if (result.message === 'Success!'){

          this.cookieService.putObject('userData', result.userData);
          this.router.navigate(['userDashboard/userDashContent']).then();
        }else {
          this.onError(result.message);
        }
      });
    }
  }



  private isLoggedUser(){
    const temp = this.cookieService.get('userData');
    if (temp !== undefined){
      this.router.navigate(['userDashboard/userDashContent']).then();
    }else {

    }
  }

  private isLoggedAdmin(){
    const temp = this.cookieService.get('adminData');
    if (temp !== undefined){
      this.router.navigate(['adminDashboard/adminDashContent']).then();
    }else {

    }
  }
  private isLoggedClerk(){
    const temp = this.cookieService.get('clerkData');
    if (temp !== undefined){
      this.router.navigate(['clerkDashBoard/clerkDashContent']).then();
    }else {

    }
  }

  onError(message){
    this.toastrService.error(message, 'Try Again!');
  }

}
