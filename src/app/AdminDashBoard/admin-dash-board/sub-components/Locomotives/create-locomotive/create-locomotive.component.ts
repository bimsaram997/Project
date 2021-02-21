import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../../../../service/customer.service';
import CustomerDTO from '../../../../../dto/CustomerDTO';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LocomotiveService} from '../../../../../service/locomotive.service';
import LocoDTO from '../../../../../dto/LocoDTO';
import {ToastrService} from "ngx-toastr";
import {AccessService} from "../../../../../service/access.service";
import UserDTO from "../../../../../dto/UserDTO";

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



  constructor(private accessService: AccessService, private locomotiveService: LocomotiveService, private toastr: ToastrService) { }


  statuses: string[] = ['In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];
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
    const dto = new LocoDTO (
      this.locoNumber.trim(),
      this.locoCatId.trim(),
      Number(this.locoPower.trim()),
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
      this.locoNote.trim()
    );
    console.log(dto)
    this.locomotiveService.saveLoco(dto).subscribe( resp => {
      console.log(resp);
      if (resp.isSaved){

        this.onSucess('Saved');
        this.refresh();
      } else {
        this.onWarning('Already Exists');
        this.refresh();
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
}
