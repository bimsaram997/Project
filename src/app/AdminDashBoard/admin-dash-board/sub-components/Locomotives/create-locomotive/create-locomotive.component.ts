import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../../service/customer.service';
import CustomerDTO from '../../../../../dto/CustomerDTO';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LocomotiveService} from '../../../../../service/locomotive.service';
import LocoDTO from '../../../../../dto/LocoDTO';
import {ToastrService} from "ngx-toastr";
import {AccessService} from "../../../../../service/access.service";
import UserDTO from "../../../../../dto/UserDTO";
import {ImageService} from "../../../../../service/image.service";
import swal from 'sweetalert';
import {first} from "rxjs/operators";
@Component({
  selector: 'app-create-locomotive',
  templateUrl: './create-locomotive.component.html',
  styleUrls: ['./create-locomotive.component.css']
})
export class CreateLocomotiveComponent implements OnInit {
  LocoGroup: FormGroup;
  myControl = new FormControl();
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  loading =  false;
  public selectedIndex: number = 0;
  userList: UserDTO[] = [];
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  /*locoCatId = '';
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
  locoNote = '';*/
  searchKey: string;

  filesToUpload: Array<File> = [];
  urls = new Array<string>();


  constructor(private formBuilder: FormBuilder, private imageService: ImageService, private accessService: AccessService, private locomotiveService: LocomotiveService, private toastr: ToastrService) { }


  statuses: string[] = ['In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];
  isVisble = true;
  val = '';

  val2: string[] = [];
  private val1: string[] = [];

  ngOnInit(): void {
    this.LocoGroup = this.formBuilder.group({
      locoCatId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      locoPower: ['', [Validators.required, Validators.minLength(5),  Validators.pattern('^[0-9]*$')]],
      locoMileage: ['', [Validators.required, Validators.minLength(10),  Validators.pattern('^[0-9]*$')]],
      locoDate: ['', [Validators.required]],
      userNic: ['', [Validators.required]],
      locoAvailability: ['', [Validators.required]],
      locoMotors: new FormArray ([]),
      locoBreaks: new FormArray([]),
      locoFluids: new FormArray([]),
      locoNote: ['', [Validators.required, Validators.maxLength(1000),  Validators.pattern('^[0-9]*$')]],
      image: [''],
      mtrType: ['', Validators.required],
      brkType: ['', Validators.required],
      fldType: ['', Validators.required]
    });
    this.loadAllIds();

  }
  get getFm(){
    return this.LocoGroup.controls;
  }
  get mtrArray(){
    return this.getFm.locoMotors as FormArray;
  }
  get brkArray(){
    return this.getFm.locoBreaks as FormArray;
  }
  get fluidArray(){
    return this.getFm.locoFluids as FormArray;
  }
  onSubmit() {
    console.log(this.LocoGroup.value);

    // if(this.filesToUpload.)




      this.locomotiveService.saveLocomotive(this.LocoGroup.value)
        .pipe(first()).subscribe(
        res => {
          console.log(res)
          if (res.isSaved) {
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
        },

        error => {
          console.log(error)
        },
        () => {
          console.log('dss')
        }
      )




  }
  onClickMotor() {
    if (this.getFm.mtrType.value !== ''){
      this.mtrArray.push(this.formBuilder.group({
        Name: [this.getFm.mtrType.value],
        working: [true],
        notWorking: [false],

      }));
    }

  }
  onClickremoveField(index = null, value) {

    switch(value) {
      case 'main':
        while (this.mtrArray.length !== 0) {
          this.mtrArray.removeAt(0);
        }
        break;
      case 'sub':
        this.mtrArray.removeAt(index);
        break;
    }
  }
  onClickremoveBreakField(index = null, value) {

    switch (value) {
      case 'main':
        while (this.brkArray.length !== 0) {
          this.brkArray.removeAt(0);
        }
        break;
      case 'sub':
        this.brkArray.removeAt(index);
        break;
    }
  }
  onClickremoveFluidField(index = null, value) {

    switch (value) {
      case 'main':
        while (this.fluidArray.length !== 0) {
          this.fluidArray.removeAt(0);
        }
        break;
      case 'sub':
        this.fluidArray.removeAt(index);
        break;
    }
  }

  onClickBreaks() {
    if (this.getFm.brkType.value !== ''){
      this.brkArray.push(this.formBuilder.group({
        bName: [this.getFm.brkType.value],
        working: [true],
        notWorking: [false]


      }))
    }
    this.val = this.getFm.brkType.value;

  }
  onClickFluids(){
    if (this.getFm.fldType.value !== ''){
      this.fluidArray.push(this.formBuilder.group({
        fName: [this.getFm.fldType.value],
        fluids: [''],
      }))
    }
    this.val2 = this.getFm.fldType.value;
  }

  private loadAllIds() {
    this.loading = true;
    this.accessService.getAllUsers().subscribe(result => {
      this.userList = result;
      this.loading = true;
    });
  }
/*
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
  }*/

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

  onSearchClear() {
    this.searchKey = '';

  }



}
