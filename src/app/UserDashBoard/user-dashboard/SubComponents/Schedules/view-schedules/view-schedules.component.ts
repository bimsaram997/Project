import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import LocoDTO from "../../../../../dto/LocoDTO";
import {MatSort} from "@angular/material/sort";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ScheduleService} from "../../../../../service/schedule.service";
import LocoScheduleDTO from "../../../../../dto/LocoScheduleDTO";

@Component({
  selector: 'app-view-schedules',
  templateUrl: './view-schedules.component.html',
  styleUrls: ['./view-schedules.component.css']
})
export class ViewSchedulesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoScheduleDTO>;
  displayedColumns: string[] = ['Schedule No', 'Date', 'Loco Category', 'Loco Number', 'Supervisor NIC', 'Supervisor Email', 'Schedule Status', '#'];
  @ViewChild(MatSort) sort: MatSort;
  scheduleArray: LocoScheduleDTO[] = [];

  searchKey: string;
  constructor(private schedulesService: ScheduleService ,private router: Router,  private toastr: ToastrService) {
    this.loadAll();
  }

  ngOnInit(): void {
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

}
