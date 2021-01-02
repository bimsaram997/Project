import {Component, OnInit, ViewChild} from '@angular/core';
import LocoDTO from '../../../../../dto/LocoDTO';
import {MatTableDataSource} from '@angular/material/table';
import {LocomotiveService} from '../../../../../service/locomotive.service';
import {MatPaginator} from "@angular/material/paginator";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-view-locomotives',
  templateUrl: './view-locomotives.component.html',
  styleUrls: ['./view-locomotives.component.css']
})
export class ViewLocomotivesComponent implements OnInit {
  isVisible =  false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoDTO>;
  displayedColumns: string[] = ['Category', 'Number', 'Power', 'Availability', 'Responsible', 'Update Date', '#'];
  @ViewChild(MatSort) sort: MatSort;
  locoArray: LocoDTO[] = [];
  selectedLoco: LocoDTO = null;
  searchKey: string


  constructor(private locomotiveService: LocomotiveService,  private router: Router,  private toastr: ToastrService) {
    this.loadAll();
  }

  ngOnInit(): void {
  }
 loadAll(){
    this.locomotiveService.getAllLocomotives().subscribe(resp => {
      this.locoArray = resp;
      this.dataSource = new MatTableDataSource<LocoDTO>(this.locoArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  setState(){
    this.isVisible = !this.isVisible;
  }

  view(tempLoco: LocoDTO) {
    this.selectedLoco = tempLoco;

    const btn = document.getElementById('btn-pop-up') as HTMLElement;
    btn.click();
  }

  deleteLoco(locoNumber: string) {
    if (confirm('Are You Sure, whether You want to delete this Customer ?')){
      this.locomotiveService.deleteLoco(locoNumber).subscribe(result => {
        if (result.message === 'deleted'){
          this.onSucess('Deleted!');
          this.loadAll();
        } else{
          this.onWarning('Try Again');
        }
      });
    }
  }

  onWarning(message: string){
    this.toastr.warning(message, 'Warning');
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
}
