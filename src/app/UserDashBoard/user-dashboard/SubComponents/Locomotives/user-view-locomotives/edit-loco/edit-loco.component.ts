import {Component, OnInit, Inject, ViewChild, Output, EventEmitter} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {LocomotiveService} from "../../../../../../service/locomotive.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import LocoDTO from "../../../../../../dto/LocoDTO";
import swal from "sweetalert";

@Component({
  selector: 'app-edit-loco',
  templateUrl: './edit-loco.component.html',
  styleUrls: ['./edit-loco.component.css']
})
export class EditLocoComponent implements OnInit  {



  selectedLoco: LocoDTO = null;
  @Output() myEvent =  new EventEmitter();

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private locomotiveService: LocomotiveService,  private router: Router,  private toastr: ToastrService) {
    this.loadAll();
  }
  locoArray: LocoDTO[] = [];
  statuses: string[] = ['In', 'Out'];
  tMotors: string[] = ['Working', 'Not Working'];
  mainMotors: string[] = ['Working', 'Not Working'];
  vBreaks: string[] = ['Working', 'Not Working'];
  dBreaks: string[] = ['Working', 'Not Working'];
  ngOnInit(): void {
    this.loadAll();
  }
  loadAll(){
    this.locomotiveService.getAllLocomotives().subscribe(resp => {
      this.myEvent.emit(null);
      this.locoArray = resp;
      console.log(this.locoArray);

    });
  }


  updateMyLocomotive() {

    console.log(this.selectedLoco);
    this.selectedLoco = this.data.EditId;

    const dto = new LocoDTO(
      this.selectedLoco.locoNumber,
      this.data.EditCatId,
      Number(this.data.EditPower),
      Number(this.data.EditMileage),
      this.data.EditAvailability,
      this.data.EditNic,
      this.data.EditDate,
      Number(this.data.EditOil),
      Number(this.data.EditFuel),
      Number(this.data.EditWater),
      this.data.EditMainGen,
      this.data.EditTrack,
      this.data.EditVBreak,
      this.data.EditDBreak,
      this.data.EditNote

    );
    this.locomotiveService.updateLocomotive(dto).subscribe(result => {
      if (result.message === 'updated'){
        swal({
          title: 'Record is Updated!',
          text: 'Please Click OK',
          icon: 'success',
        });
        setTimeout(() => {
          this.loadAll();
        }, 3000);


      }else {
        swal({
          title: 'Update Failed!',
          text: 'Please Click OK',
          icon: 'error',
        });
        setTimeout(() => {
          this.loadAll();
        }, 3000);




      }
    });
  }
  onWarning(message: string){
    this.toastr.warning(message, 'Warning');
  }
  onSucess(message: string){
    this.toastr.success(message, 'Success');
  }


}
