import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {Router} from "@angular/router";
import {AccessService} from "../../service/access.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login-and-signup',
  templateUrl: './login-and-signup.component.html',
  styleUrls: ['./login-and-signup.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => *', [
        style({transform: 'translateY(-100%)'}),
        animate('0.5s')
      ]),
      transition('* => void', [
        animate('0.5s', style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class LoginAndSignupComponent implements OnInit {
  slider = false;
  hide = true;
  email = '';
  password = '';

  constructor(private router: Router,
              private accessService: AccessService, private http: HttpClient) { }

  ngOnInit(): void {
  }

  toogleSlider() {
    if (this.slider){
      this.slider = false;
    }else {
      this.slider = true;
    }
  }

  login() {
    this.router.navigate(['/userDashboard']).then(resp =>{
      location.reload();
    }).catch( error => {
      alert('Something Went Wrong');
    });
  }

  handleLoginClick() {
    if(this.email && this.password){
      this.authenticateUser(this.email);
    } else {
      alert('enter uEmail');
    }
  }
  authenticateUser(email){
    if(email === 'admin'){
      this.router.navigate(['/adminDashboard']);
    }else if (email === 'user'){
      this.router.navigate(['/userDashboard']);
    }
  }
}
