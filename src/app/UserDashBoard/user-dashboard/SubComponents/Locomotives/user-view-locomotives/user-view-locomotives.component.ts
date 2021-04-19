import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import LocoDTO from "../../../../../dto/LocoDTO";
import {MatSort} from "@angular/material/sort";
import {LocomotiveService} from "../../../../../service/locomotive.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {ViewLocoComponent} from "./view-loco/view-loco.component";
import {MatDialog} from "@angular/material/dialog";
import {EditLocoComponent} from "./edit-loco/edit-loco.component";

@Component({
  selector: 'app-user-view-locomotives',
  templateUrl: './user-view-locomotives.component.html',
  styleUrls: ['./user-view-locomotives.component.css']
})
export class UserViewLocomotivesComponent implements OnInit {
  isVisible =  false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoDTO>;
  displayedColumns: string[] = ['Category', 'Number', 'Power', 'Mileage', 'Availability', 'Responsible', 'Update Date', '#'];
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
  changeLocoMileage = '';
  changeLocoAvailability = '';
  changeuserNic = '';
  changeLocoDate = '';
  changeLocoOil = '';
  changeLocoFuel = '';
  changeLocoWater = '';
  changeLocoMainGen = '';
  changeLocotracMot = '';
  changeLocoVBreak = '';
  changeLocoDBreak = '';
  changeLocoNote = '';


  constructor(public dialog: MatDialog, private locomotiveService: LocomotiveService,  private router: Router,  private toastr: ToastrService) {
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


  openDialog(tempLoco: LocoDTO){
    this.selectedLoco = tempLoco;
    const dialogRef = this.dialog.open(ViewLocoComponent, {data: {ViewLocoOil: this.selectedLoco.locoOil, ViewLocoFuel: this.selectedLoco.locoFuel, ViewLocoWater: this.selectedLoco.locoWater,
        ViewLocoVBreak: this.selectedLoco.locoVBreak,
        ViewLocoDBreak: this.selectedLoco.locoDBreak,
        ViewLocoMainGen: this.selectedLoco.locoMainGen,
        ViewLocoTrack: this.selectedLoco.locoTracMot,
        ViewLocoNote: this.selectedLoco.locoNote}});

    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog: ${result}`);
    });
  }

  OpenEditDialog(tempLoco: LocoDTO){
    this.selectedLoco = tempLoco;
    this.changeLocoCatID = tempLoco.locoCatId;
    this.changeLocoPower = tempLoco.locoPower + '';
    this.changeLocoMileage = tempLoco.locoMileage + '';
    this.changeLocoAvailability = tempLoco.locoAvailability;
    this.changeuserNic = tempLoco.userNic;
    this.changeLocoDate = tempLoco.locoDate.split(' ').slice(0, 4).join(' ');
    this.changeLocoOil = tempLoco.locoOil + '';
    this.changeLocoFuel = tempLoco.locoFuel + '';
    this.changeLocoWater = tempLoco.locoWater + '';
    this.changeLocoMainGen = tempLoco.locoMainGen;
    this.changeLocotracMot = tempLoco.locoTracMot;
    this.changeLocoVBreak = tempLoco.locoVBreak;
    this.changeLocoDBreak = tempLoco.locoDBreak;
    this.changeLocoNote = tempLoco.locoNote;
    const dialogRef = this.dialog.open(EditLocoComponent, {data: {EditCatId: this.changeLocoCatID, EditId: this.selectedLoco,
        EditPower: this.changeLocoPower,
        EditMileage: this.changeLocoMileage,
        EditAvailability: this.changeLocoAvailability,
        EditNic: this.changeuserNic,
        EditDate: this.changeLocoDate,
        EditOil: this.changeLocoOil,
        EditFuel: this.changeLocoFuel,
        EditWater: this.changeLocoWater,
        EditMainGen: this.changeLocoMainGen,
        EditTrack: this.changeLocotracMot,
        EditVBreak: this.changeLocoVBreak,
        EditDBreak: this.changeLocoDBreak,
        EditNote: this.changeLocoNote,
     }});
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog: ${result}`);
      this.loadAll();
    });
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



}
