import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {LocomotiveService} from "../../../../../service/locomotive.service";
import LocoDTO from "../../../../../dto/LocoDTO";
import {CustomerService} from "../../../../../service/customer.service";
import CustomerDTO from "../../../../../dto/CustomerDTO";


import {MatCheckbox} from "@angular/material/checkbox";
import LocoScheduleDTO from "../../../../../dto/LocoScheduleDTO";
import {ScheduleService} from "../../../../../service/schedule.service";
import {ToastrService} from "ngx-toastr";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  locoList: LocoDTO[] = [];
  customerList: CustomerDTO[] = [];
  loading =  false;
  ScheduleStatus: string[] = [ 'Draft', 'Accept'];
  bodyLoco = new FormControl();
  bodyLocoList: string[] = [ 'Axle', 'Body Plates', 'Wheels', 'Truck Frames'];
  electricControl = new FormControl();
  electricControlList: string[] = ['Control Desk', 'Main Generators', 'Lights', 'Electric Controls', 'Battery'];
  mainMotor = new FormControl();
  mainMotorList: string[] = ['Main Generator', 'Main Alternator', 'Auxiliary Alternator', 'Fuel Blower Motor', 'Air baths'];
  tMotors = new FormControl();
  tMotorsList: string[] = [ 'Traction Motors', 'Axle Generators', 'Pinion & Gear'];
  eMechanical = new FormControl();
  eMechanicalMaList: string[] = [ 'Turbo Charger', 'Gear Box', 'Radiator', 'Drive Shaft'];
  top = new FormControl();
  topList: string[] = ['sdsd', 'asas'];

  scheduleNo = '';
  scheduleUpdate = '';
  locoCatId = '';
  locoNumber = '';
  customerNic = '';
  customerName = '';
  customerEmail = '';
  scheduleStatus = '';
  scheduleTrackMotors: string[] = [];
  scheduleLocoBody: string[] = [];
  scheduleElCuUnit: string[] = [];
  scheduleEMechanical: string[] = [];
  scheduleMach: string[] = [];
  scheduleRemark = '';
  public selectedIndex: number = 0;
  showSpinner = true;




  constructor(private locomotiveService: LocomotiveService, private  customerService: CustomerService,
              private scheduleService: ScheduleService,
              private toastr: ToastrService
              ) { this.loadAllIds(); }

  ngOnInit(): void {
    this.loadAllLoconumbers();
    this.loadAllIds();
  }
  loadSpinner(){
    this.showSpinner =true;
    setTimeout(() => {
      this.showSpinner = false;
    }, 500);
  }
  private loadAllLoconumbers(){
    this.loading = true;
    this.locomotiveService.getAllLocosSelect().subscribe( result => {
      this.locoList = result;
      this.loading = true;
    })
  }


  public nextStep() {
    this.selectedIndex += 1;
  }

  public previousStep() {
    this.selectedIndex -= 1;
  }
  private loadAllIds() {
    this.loading = true;
    this.customerService.getAllCustomersSelect().subscribe(result => {
      this.customerList = result;
      this.loading = true;
    });
  }

  saveSchedule() {
    const dto = new LocoScheduleDTO(
      this.scheduleNo.trim(),
      this.scheduleUpdate.toString().trim(),
      this.locoCatId.trim(),
      Number(this.locoNumber.trim()),
      this.customerNic.trim(),
      this.customerName.trim(),
      this.customerEmail.trim(),
      this.scheduleStatus.trim(),

      Array(this.scheduleTrackMotors.toString()),
      Array(this.scheduleLocoBody.toString()),
      Array(this.scheduleElCuUnit.toString()),
      Array(this.scheduleEMechanical.toString()),
      Array(this.scheduleMach.toString()),
      this.scheduleRemark.trim()

    );
    this.scheduleService.saveSchedule(dto).subscribe(resp => {
      if (resp.isSaved){
        this.onSucess('Saved');
        this.refresh();

      } else {
        this.onWarning('Already Exists');

      }
    });
  }
  onWarning(message: string){
    this.toastr.warning(message, 'Warning');
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }
  refresh(): void {
    window.location.reload();
  }
}
