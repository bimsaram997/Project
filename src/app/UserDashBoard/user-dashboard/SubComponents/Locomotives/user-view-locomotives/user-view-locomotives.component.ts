import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import LocoDTO from "../../../../../dto/LocoDTO";
import {MatSort} from "@angular/material/sort";
import {LocomotiveService} from "../../../../../service/locomotive.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-view-locomotives',
  templateUrl: './user-view-locomotives.component.html',
  styleUrls: ['./user-view-locomotives.component.css']
})
export class UserViewLocomotivesComponent implements OnInit {
  isVisible =  false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoDTO>;
  displayedColumns: string[] = ['Category', 'Number', 'Power', 'Availability', 'Responsible', 'Update Date', '#'];
  @ViewChild(MatSort) sort: MatSort;
  locoArray: LocoDTO[] = [];
  selectedLoco: LocoDTO = null;
  searchKey: string;

  isVisibleSecond = false;
  statuses: string[] = ['In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];

  changeLocoCatID = '';
  changeLocoPower = '';
  changeLocoAvailability = '';
  changeCustomerNic = '';
  changeLocoDate = '';
  changeLocoOil = '';
  changeLocoFuel = '';
  changeLocoWater = '';
  changeLocoMainGen = '';
  changeLocotracMot = '';
  changeLocoVBreak = '';
  changeLocoDBreak = '';
  changeLocoNote = '';

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

  setStateTwo(){
    this.isVisibleSecond =  !this.isVisibleSecond;
  }

  updateLocomotive(tempLoco: LocoDTO){
    this.selectedLoco = tempLoco;
    this.changeLocoCatID = tempLoco.locoCatId;
    this.changeLocoPower = tempLoco.locoPower + '';
    this.changeLocoAvailability = tempLoco.locoAvailability;
    this.changeCustomerNic = tempLoco.customerNic;
    this.changeLocoDate = tempLoco.locoDate.split(' ').slice(0, 4).join(' ');
    this.changeLocoOil = tempLoco.locoOil + '';
    this.changeLocoFuel = tempLoco.locoFuel + '';
    this.changeLocoWater = tempLoco.locoWater + '';
    this.changeLocoMainGen = tempLoco.locoMainGen;
    this.changeLocotracMot = tempLoco.locoTracMot;
    this.changeLocoVBreak = tempLoco.locoVBreak;
    this.changeLocoDBreak = tempLoco.locoDBreak;
    this.changeLocoNote = tempLoco.locoNote;
    const btn = document.getElementById('btn-pop-up-two') as HTMLElement;
    btn.click();

  }


  updateMyLocomotive() {
    const dto = new LocoDTO(
      this.selectedLoco.locoNumber,
      this.changeLocoCatID,
      Number(this.changeLocoPower),
      this.changeLocoAvailability,
      this.changeCustomerNic,
      this.changeLocoDate,
      Number(this.changeLocoOil),
      Number(this.changeLocoFuel),
      Number(this.changeLocoWater),
      this.changeLocoMainGen,
      this.changeLocotracMot,
      this.changeLocoVBreak,
      this.changeLocoDBreak,
      this.changeLocoNote

    );
    this.locomotiveService.updateLocomotive(dto).subscribe(result => {
      if (result.message === 'updated'){
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
