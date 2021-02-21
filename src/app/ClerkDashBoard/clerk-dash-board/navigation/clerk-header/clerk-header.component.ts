import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {AccessService} from "../../../../service/access.service";
import {ToastrService} from "ngx-toastr";
import {CookieService} from "ngx-cookie";

@Component({
  selector: 'app-clerk-header',
  templateUrl: './clerk-header.component.html',
  styleUrls: ['./clerk-header.component.css']
})
export class ClerkHeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  @Input() public resultGridList = '';
  data = '';
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
      this.cookieService.remove('clerkData');
      this.router.navigate(['/'])
    }
  }

  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
}
