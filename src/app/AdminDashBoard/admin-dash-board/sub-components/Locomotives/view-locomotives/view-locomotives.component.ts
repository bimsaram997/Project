import {Component, OnInit, ViewChild} from '@angular/core';
import LocoDTO from '../../../../../dto/LocoDTO';
import {MatTableDataSource} from '@angular/material/table';
import {LocomotiveService} from '../../../../../service/locomotive.service';
import {MatPaginator} from '@angular/material/paginator';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatSort} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import CustomerDTO from '../../../../../dto/CustomerDTO';
import {CustomerService} from '../../../../../service/customer.service';
import UserDTO from '../../../../../dto/UserDTO';
import {AccessService} from '../../../../../service/access.service';
import {ImageService} from '../../../../../service/image.service';
import {ViewLocoComponent} from "../../../../../UserDashBoard/user-dashboard/SubComponents/Locomotives/user-view-locomotives/view-loco/view-loco.component";
import {MatDialog} from "@angular/material/dialog";
import {AdminEditLocomotiveComponent} from "./admin-edit-locomotive/admin-edit-locomotive.component";
import swal from 'sweetalert';
@Component({
  selector: 'app-view-locomotives',
  templateUrl: './view-locomotives.component.html',
  styleUrls: ['./view-locomotives.component.css']
})
export class ViewLocomotivesComponent implements OnInit {



  constructor(public dialog: MatDialog, private imageService: ImageService, private locomotiveService: LocomotiveService,  private router: Router,  private toastr: ToastrService, private accessService: AccessService) {
    this.loadAll();
  }

  isVisible =  false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<LocoDTO>;
  displayedColumns: string[] = ['Category', 'Number', 'Power', 'Mileage', 'Availability', 'Responsible', 'Update Date', 'Image', '#'];
  @ViewChild(MatSort) sort: MatSort;
  locoArray: LocoDTO[] = [];
  selectedLoco: LocoDTO = null;
  searchKey: string;
  isVisibleSecond = false;
  myControl = new FormControl();
  options: string[] = ['M2', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'];
  loading =  false;
  userList: UserDTO[] = [];

  statuses: string[] = ['In', 'Out'];
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
  changeLocoImage = [];
  changeCustomerNic = '';


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
  OpenEdit(tempLoco: LocoDTO){
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
    this.changeLocoImage =  Array(tempLoco.image);
    const dialogRef = this.dialog.open(AdminEditLocomotiveComponent,{data: {EditCatId: this.changeLocoCatID, EditId: this.selectedLoco,
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
        EditImage: this.changeLocoImage
      }});
    dialogRef.afterClosed().subscribe(result =>{
      console.log(`Dialog: ${result}`);
      this.loadAll();
    });
  }

  setStateTwo(){
    this.isVisible = false;
    this.isVisibleSecond =  !this.isVisibleSecond;
  }


  view(tempLoco: LocoDTO) {
    this.selectedLoco = tempLoco;

    const btn = document.getElementById('btn-pop-up') as HTMLElement;
    btn.click();
  }

  deleteLoco(locoNumber: string) {

    if (confirm('Are You Sure, whether You want to delete this Locomotive ?')){
      this.locomotiveService.deleteLoco(locoNumber).subscribe(result => {
        if (result.message === 'deleted'){
          swal('Record was deleted', {
            icon: 'success',
          });
        } else{
          swal('Record was deleted', {
            icon: 'error',
          });
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




  updateMyLocomotive() {
      const dto = new LocoDTO(
        this.selectedLoco.locoNumber,
        this.changeLocoCatID,
        Number(this.changeLocoPower),
        Number(this.changeLocoMileage),
        this.changeLocoAvailability,
        this.changeuserNic,
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
