import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AccessService} from "../../../../service/access.service";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie";



@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  @Input() public resultGridList = '';
  data = '';
  private loginEmail: any;
  constructor(private router: Router,
              private accessService: AccessService,
              private toastr: ToastrService,
              private cookieService: CookieService,
              ) { }

  ngOnInit(): void {
    this.display();
  }
  onToogleSlidenav() {
    this.sidenavToggle.emit();
  }
  logOut(){

    if (confirm('Do want to log out? ?')){
      this.onSucess('You are log out!');
      this.cookieService.remove('userData');
      this.router.navigate(['/'])
    }
  }

  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
  public display(){
    this.data =  this.loginEmail + '';
    console.log(this.data)
}

}
