import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {Router} from "@angular/router";
import {AccessService} from "../../../service/access.service";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();
  constructor(private router: Router,
              private accessService: AccessService,
              private toastr: ToastrService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  onToogleSlidenav() {
    this.sidenavToggle.emit();
  }
  logOut(){

    if (confirm('Do You want to log out? ?')){
      this.onSucess('You are log out!');
      this.cookieService.remove('adminData');
      this.router.navigate(['/'])
    }
  }

  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
}
