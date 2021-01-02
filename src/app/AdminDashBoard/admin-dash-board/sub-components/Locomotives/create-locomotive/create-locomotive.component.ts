import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../../service/customer.service';
import CustomerDTO from '../../../../../dto/CustomerDTO';
import {FormControl} from '@angular/forms';
import {LocomotiveService} from '../../../../../service/locomotive.service';
import LocoDTO from '../../../../../dto/LocoDTO';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-locomotive',
  templateUrl: './create-locomotive.component.html',
  styleUrls: ['./create-locomotive.component.css']
})
export class CreateLocomotiveComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  loading =  false;
  customerId = '';
  customerList: CustomerDTO[] = [];
  formatLabel(value: number) {
    if (value >= 50000) {
      return Math.floor(value / 100 ) + 'L';
    }

    return value;
  }

  locoCatId = '';
  locoPower = '';
  locoNumber = '';
  locoAvailability = '';
  customerNic = '';
  locoDate = '';
  locoOil = '';
  locoFuel = '';
  locoWater = '';
  locoMainGen = '';
  locoTracMot = '';
  locoVBreak = '';
  locoDBreak = '';
  locoNote = '';

  constructor(private customerService: CustomerService, private locomotiveService: LocomotiveService, private toastr: ToastrService) { }


  statuses: string[] = ['In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];
  ngOnInit(): void {
    this.loadAllIds();

  }
  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
  private loadAllIds() {
    this.loading = true;
    this.customerService.getAllCustomersSelect().subscribe(result => {
      this.customerList = result;
      this.loading = true;
    });
  }

  saveLocoOnAction() {
    const dto = new LocoDTO (
      this.locoCatId.trim(),
      Number(this.locoPower.trim()),
      this.locoNumber.trim(),
      this.locoAvailability.trim(),
      this.customerNic.trim(),
      this.locoDate.toString().trim(),
      Number(this.locoOil.trim()),
      Number(this.locoFuel.trim()),
      Number(this.locoWater.trim()),
      this.locoMainGen.trim(),
      this.locoTracMot.trim(),
      this.locoVBreak.trim(),
      this.locoDBreak.trim(),
      this.locoNote.trim()
    );
    this.locomotiveService.saveLoco(dto).subscribe( resp => {
      if (resp.isSaved){
        this.onSucess('Saved');
        this.handleClear();
      } else {
        this.onWarning('Already Exists');
        this.handleClear();
      }
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
    this.locoAvailability = '';
    this.customerNic = '';
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
}
