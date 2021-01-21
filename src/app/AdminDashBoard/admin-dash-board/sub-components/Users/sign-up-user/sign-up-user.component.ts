import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {AccessService} from "../../../../../service/access.service";
import {Router} from "@angular/router";
import UserDTO from "../../../../../dto/UserDTO";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import LocoDTO from "../../../../../dto/LocoDTO";
import {MatSort} from "@angular/material/sort";
import {ToastrService} from "ngx-toastr";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {ErrorStateMatcher} from "@angular/material/core";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class SignUpUserComponent implements OnInit {

  userEmail: any;
  userPassword: any;
  displayedColumns: string[] = ['Email', 'Password'];
  userArray: UserDTO[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<UserDTO>;
  @ViewChild(MatSort) sort: MatSort;
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  email = new FormControl('',[
    Validators.required,
    Validators.email
  ]);



  constructor(private accessService: AccessService, private router: Router, private toastr: ToastrService) {
    this.loadAll();
  }

  ngOnInit(): void {

  }


  signUp() {
    this.accessService.register(
      this.userEmail.toString().trim(),
      this.userPassword.toString().trim()
    ).subscribe( result =>{
      if(result.message === true){
        this.refresh()
        this.onSucess('Account Created');
      }else{
        this.onError('Try Again');
        this.refresh()
      }
    });
  }

  loadAll(){
    this.accessService.getAllUsers().subscribe(resp => {
      this.userArray = resp;
      this.dataSource = new MatTableDataSource<UserDTO>(this.userArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  onError(message: string){
    this.toastr.error(message, 'Warning');
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
  handleClear(){
    this.userPassword = '';
    this.userEmail = '';
  }
  refresh(): void {
    window.location.reload();
  }
}
