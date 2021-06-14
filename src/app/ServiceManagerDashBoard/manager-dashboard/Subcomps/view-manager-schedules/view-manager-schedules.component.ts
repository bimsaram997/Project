import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {ScheduleService} from "../../../../service/schedule.service";
import swal from "sweetalert";

@Component({
  selector: 'app-view-manager-schedules',
  templateUrl: './view-manager-schedules.component.html',
  styleUrls: ['./view-manager-schedules.component.css']
})
export class ViewManagerSchedulesComponent implements OnInit {
  searchKey: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['Schedule No', 'Report No', 'Loco Category', 'Loco Number', 'Supervisor inCharge', 'Request Date', 'To be Complete', 'Progress', 'status', '#'];
  scheduleList: any[] = [];
  scheduleStatus: any;
  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    this.loadAllSchedule();
  }

  private loadAllSchedule(){
    this.scheduleService.getAllSchedules().subscribe(resp =>{
     this.scheduleList = resp;
     this.dataSource =  new MatTableDataSource<any>(this.scheduleList);
     setTimeout(() => {
       this.dataSource.paginator =  this.paginator;
       this.dataSource.sort = this.sort;
     })
    })
  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

  statusBinder(scheduleStatus){
    if (scheduleStatus === 1){
      return 'pending_actions'
        ;
    }else if (scheduleStatus === 2){
      return 'flag';
    }else if (scheduleStatus === 4){
      return 'dangerous'
    }
  }

  deleteSchedule(scheduleNo: string) {
    if (confirm('Are You Sure, whether You want to delete this Locomotive ?')) {
      this.scheduleService.deleteSchedule(scheduleNo).subscribe(result => {
        if (result.message === 'deleted') {
          swal('Record was deleted', {
            icon: 'success',
          });
          this.loadAllSchedule()
        } else {
          swal('Record was deleted', {
            icon: 'error',
          });
        }
      });
    }
  }
}
