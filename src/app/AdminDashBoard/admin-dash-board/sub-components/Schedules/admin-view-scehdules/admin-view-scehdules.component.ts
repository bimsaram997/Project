import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import LocoScheduleDTO from "../../../../../dto/LocoScheduleDTO";
import {MatSort} from "@angular/material/sort";
import {ScheduleService} from "../../../../../service/schedule.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import LocoDTO from "../../../../../dto/LocoDTO";
import {LocomotiveService} from "../../../../../service/locomotive.service";

@Component({
  selector: 'app-admin-view-scehdules',
  templateUrl: './admin-view-scehdules.component.html',
  styleUrls: ['./admin-view-scehdules.component.css'],
  providers: [
    { provide: Window, useValue: window }
  ],
})
export class AdminViewScehdulesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoScheduleDTO>;
  displayedColumns: string[] = ['Schedule No', 'Date', 'Loco Category', 'Loco Number', 'Supervisor NIC', 'Supervisor Email', 'Schedule Status', 'Body loco', 'Motors', 'ELUCU', 'Traction', 'Mechanical', '#'];
  statuses: string[] = ['Accepted', 'Reject'];
  @ViewChild(MatSort) sort: MatSort;
  scheduleArray: LocoScheduleDTO[] = [];
  selectedSchedule: LocoScheduleDTO = null;
  new: LocoScheduleDTO = null;
  isVisible =  false;



  searchKey: string;
  isVisibleSecond = false;
  locoList: LocoDTO[] = [];
  loading =  false;
  ScheduleStatus: string[] = [ 'Draft', 'Accept'];


  constructor(private schedulesService: ScheduleService ,private router: Router,  private toastr: ToastrService, private locomotiveService: LocomotiveService) {
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAllLoconumbers();
  }
  private loadAllLoconumbers(){
    this.loading = true;
    this.locomotiveService.getAllLocosSelect().subscribe( result => {
      this.locoList = result;
      this.loading = true;
    })
  }
  loadAll(){
    this.schedulesService.getAllSchedules().subscribe(resp => {
      this.scheduleArray = resp;
      this.dataSource = new MatTableDataSource<LocoScheduleDTO>(this.scheduleArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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

    this.isVisible = !this.isVisible;
   this.isVisibleSecond = false;

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

  view(tempSchedule: LocoScheduleDTO) {

    this.selectedSchedule = tempSchedule;
    const btn = document.getElementById('btn-pop-up') as HTMLElement;
    btn.click();


  }

  setStateTwo(){

    this.isVisible = false;
    this.isVisibleSecond = !this.isVisibleSecond;

  }




  updateStatus(tempSchedule: LocoScheduleDTO) {

    this.selectedSchedule = tempSchedule;
    this.changeUpdate =  tempSchedule.scheduleUpdate;
    this.changeCatId = tempSchedule.locoCatId;
    this.changeLocoNumber = tempSchedule.locoNumber + '';
    this.changeuserNIC = tempSchedule.userNic;
    this.changeName = tempSchedule.userName;
    this.changeStatus = tempSchedule.scheduleStatus;
    this.changeScheduleCom = tempSchedule.scheduleCom;
    this.changeTrack = tempSchedule.scheduleTrackMotors + '';
    this.changeBody = tempSchedule.scheduleLocoBody + '';
    this.changeELCU = tempSchedule.scheduleElCuUnit + '';
    this.changeEMech = tempSchedule.scheduleEMechanical + '';
    this.changeMach = tempSchedule.scheduleMach + '';
    this.changeReamark =  tempSchedule.scheduleRemark;


    console.log(this.changeStatus);
    const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
    btn.click();
  }




  updateSchedule() {

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
        if(this.changeStatus === 'Accept'){
          this.onSucess('Updated Accepted');
          this.loadAll();
          this.getSMS();

        } else if( this.changeStatus === 'draft'){
          this.onSucess('Updated Draft');
          this.loadAll();

        }


        const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
        btn.click();

      }else {
        this.onWarning('Try Again');

        const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
        btn.click();

      }
    });

  }
  getSMS(){
    this.schedulesService.getSMS().subscribe();
  }
}
