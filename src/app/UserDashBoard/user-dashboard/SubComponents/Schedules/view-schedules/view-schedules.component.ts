import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import LocoDTO from "../../../../../dto/LocoDTO";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ScheduleService} from "../../../../../service/schedule.service";
import LocoScheduleDTO from "../../../../../dto/LocoScheduleDTO";
import {FormControl} from "@angular/forms";
import {MatTableExporterModule} from "mat-table-exporter";


@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.css']
})
export class ViewSchedulesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoScheduleDTO>;
  displayedColumns: string[] = ['Schedule No', 'Date', 'Loco Category', 'Loco Number', 'Supervisor NIC', 'Supervisor Email', 'Schedule Status', 'Body loco', 'Motors', 'ELUCU', 'Traction', 'Mechanical', '#'];
  @ViewChild(MatSort) sort: MatSort;
  scheduleArray: LocoScheduleDTO[] = [];
  selectedSchedule: LocoScheduleDTO = null;
  isVisible =  false;
  isVisibleSecond = false;
  searchKey: string;
  bgColor = 'grey';
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
  count: number;
  constructor(private schedulesService: ScheduleService ,private router: Router,  private toastr: ToastrService) {
    this.loadAll();
    this.loadCount();
  }

  ngOnInit(): void {

  }

  loadAll() {
    this.schedulesService.getAllSchedules().subscribe(resp => {
      this.scheduleArray = resp;
      this.dataSource = new MatTableDataSource<LocoScheduleDTO>(this.scheduleArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }
  loadCount(){
    this.schedulesService.getDraftCount().subscribe(resp => {
      if(resp >= 0){
        console.log(resp);
      }
    });
  }

  deleteSchedule(scheduleNo: string) {
    if (confirm('Are You Sure, whether You want to delete this Customer ?')){
      this.schedulesService.deleteSchedule(scheduleNo).subscribe(result => {
        if (result.message === 'deleted'){
          this.onSucess('Deleted!');
          this.loadAll();
        } else{
          this.onWarning('Try Again');
        }
      });
    }
  }


  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  onWarning(message: string){
    this.toastr.warning(message, 'Warning');
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  setState(){
    this.isVisibleSecond = false;
    this.isVisible = !this.isVisible;

  }

  view(tempSchedule: LocoScheduleDTO) {
    this.selectedSchedule = tempSchedule;
    const btn = document.getElementById('btn-pop-up') as HTMLElement;
    this.bgColor = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
    btn.click();


  }
  setStateTwo(){
    this.isVisible = false;
    this.isVisibleSecond = !this.isVisibleSecond;

  }
  changeUpdate = '';
  changeStatus = '';
  changeScheduleCom = '';
  changeCatId= '';
  changeLocoNumber = '';
  changeuserNIC = '';
  changeEmail = '';
  changeName = '';
  changeTrack = '';
  changeBody = '';
  changeELCU = '';
  changeEMech = '';
  changeMach = '';
  changeReamark = '';


  updateSchedule(tempSchedule: LocoScheduleDTO) {
    this.selectedSchedule = tempSchedule;
    this.changeUpdate =  tempSchedule.scheduleUpdate;
    this.changeCatId = tempSchedule.locoCatId;
    this.changeLocoNumber = tempSchedule.locoNumber + '';
    this.changeuserNIC = tempSchedule.userNic;
    this.changeName = tempSchedule.userName;
    this.changeEmail = tempSchedule.userEmail;
    this.changeStatus = tempSchedule.scheduleStatus;
    this.changeScheduleCom = tempSchedule.scheduleCom;
    this.changeTrack = tempSchedule.scheduleTrackMotors + '';
    this.changeBody = tempSchedule.scheduleLocoBody + '';
    this.changeELCU = tempSchedule.scheduleElCuUnit + '';
    this.changeEMech = tempSchedule.scheduleEMechanical + '';
    this.changeMach = tempSchedule.scheduleMach + '';
    this.changeReamark =  tempSchedule.scheduleRemark;
    const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
    btn.click();
  }

  updateMySchedule() {

    const dto = new LocoScheduleDTO(
      this.selectedSchedule.scheduleNo,
      this.changeUpdate,
      this.changeCatId,
      Number(this.changeLocoNumber),
      this.changeuserNIC,
      this.changeName,
      this.changeEmail,
      this.changeStatus,
      this.changeScheduleCom,
      Array(this.changeTrack),
      Array(this.changeBody),
      Array(this.changeELCU),
      Array(this.changeEMech),
      Array(this.changeMach),
      this.changeReamark,
    );

    this.schedulesService.updateSchedule(dto).subscribe(result => {
      if (result.message === 'updated'){
        console.log(this.changeStatus);
        this.onSucess('Updated');
        this.loadAll();

        const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
        btn.click();

      }else {
        this.onWarning('Try Again');

        const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
        btn.click();

      }
    });

  }
}
