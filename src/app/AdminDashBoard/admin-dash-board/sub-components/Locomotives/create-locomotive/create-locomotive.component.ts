import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../../service/customer.service';
import CustomerDTO from '../../../../../dto/CustomerDTO';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocomotiveService} from '../../../../../service/locomotive.service';
import LocoDTO from '../../../../../dto/LocoDTO';
import {ToastrService} from "ngx-toastr";
import {AccessService} from "../../../../../service/access.service";
import UserDTO from "../../../../../dto/UserDTO";
import {ImageService} from "../../../../../service/image.service";
import swal from 'sweetalert';
@Component({
  selector: 'app-create-locomotive',
  templateUrl: './create-locomotive.component.html',
  styleUrls: ['./create-locomotive.component.css']
})
export class CreateLocomotiveComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  loading =  false;
  public selectedIndex: number = 0;
  userList: UserDTO[] = [];

  locoCatId = '';
  locoPower = '';
  locoNumber = '';
  locoMileage = '';
  locoAvailability = '';
  userNic = '';
  locoDate = '';
  locoOil = '';
  locoFuel = '';
  locoWater = '';
  locoMainGen = '';
  locoTracMot = '';
  locoVBreak = '';
  locoDBreak = '';
  locoNote = '';

  filesToUpload: Array<File> = [];
  urls = new Array<string>();


  constructor(private imageService: ImageService, private accessService: AccessService, private locomotiveService: LocomotiveService, private toastr: ToastrService) { }


  statuses: string[] = ['In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];
  isVisble = true;
  ngOnInit(): void {
    this.loadAllIds();

  }

  private loadAllIds() {
    this.loading = true;
    this.accessService.getAllUsers().subscribe(result => {
      this.userList = result;
      this.loading = true;
    });
  }

  saveLocoOnAction() {
    this.imageService.uploadImage(this.filesToUpload).subscribe(resp => {
      console.log(resp);
      const dto = new LocoDTO (
        this.locoNumber.trim(),
        this.locoCatId.trim(),
        Number(this.locoPower.trim()),
        Number(this.locoMileage.trim()),
        this.locoAvailability.trim(),
        this.userNic.trim(),
        this.locoDate.toString().trim(),
        Number(this.locoOil.trim()),
        Number(this.locoFuel.trim()),
        Number(this.locoWater.trim()),
        this.locoMainGen.trim(),
        this.locoTracMot.trim(),
        this.locoVBreak.trim(),
        this.locoDBreak.trim(),
        this.locoNote.trim(),
        resp.locationArray[0]
      );
      this.locomotiveService.saveLoco(dto).subscribe( response => {
        console.log(resp);
        if (response.isSaved){
          swal({
            title: 'Record Saved!',
            text: 'Please Click OK',
            icon: 'success',
          });
          setTimeout(() => {
            this.refresh();
          }, 3000);

        } else {
          swal({
            title: 'Record already Exits',
            text: 'Please Click OK',
            icon: 'error',
          });
          setTimeout(() => {
            this.refresh();
          }, 3000);
        }
      });
    }, error => {
      console.log(error);
    });
  }



  onWarning(message: string){
    this.toastr.warning(message, 'Warning');
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
  handleClear(){
    this.locoCatId = '';
    this.locoPower = '';
    this.locoNumber = '';
    this.locoMileage = '';
    this.locoAvailability = '';
    this.userNic = '';
    this.locoDate = '';
    this.locoOil = '';
    this.locoFuel = '';
    this.locoWater = '';
    this.locoMainGen = '';
    this.locoTracMot = '';
    this.locoVBreak = '';
    this.locoDBreak = '';
    this.locoNote = '';
  }

  public nextStep() {
    this.selectedIndex += 1;
  }

  public previousStep() {
    this.selectedIndex -= 1;
  }
  refresh(): void {
    window.location.reload();
  }

  changeFiles(event) {
    this.isVisble = !this.isVisble;
    this.filesToUpload = event.target.files as Array<File>;
    this.urls = [];
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') {
            if (Number(e.total) > 2e+6) {
              alert('Please make sure that you entered image size is less than 2MB');
              this.filesToUpload = [];
              return;
            } else {
              this.urls.push(e.target.result);
            }
          } else {
            alert('Supported formats: .JPEG .JPG .PNG');
            this.filesToUpload = [];
            return;
          }


        };
        reader.readAsDataURL(file);
      }
    }
    console.log(this.filesToUpload);
  }

}
