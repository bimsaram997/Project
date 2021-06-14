import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ScheduleService} from "../../../../../../service/schedule.service";
export interface  DialogData{

  id:string

}
@Component({
  selector: 'app-send-progress',
  templateUrl: './send-progress.component.html',
  styleUrls: ['./send-progress.component.css']
})
export class SendProgressComponent implements OnInit {

  ReportGroup: FormGroup;
  Data: Array<any> = [
    { name: 'Main Motors', value: 'mainMotorName' },
    { name: 'Track Motor', value: 'trackMotorName' },
    { name: 'Loco Body', value: 'locoBodyName' },
    { name: 'Electric Control Unit', value: 'electricCUnitName' },
    { name: 'Electric Mechanical', value: 'eMechanicalName' },
    { name: 'Electric Switches', value: ' eSwitchName' }
  ];
  checkLength:any[] = [];
  checkArrayNew: any[] = [];
  constructor(private formBuilder: FormBuilder ,
              @Inject(MAT_DIALOG_DATA) public data: any, private scheduleService: ScheduleService) { }

  ngOnInit(): void {

    // this.data.id = ev.target.value;

    //alert(this.data.id)


    this.ReportGroup = this.formBuilder.group({
      scheduleNo: ['', [Validators.required]],
      progressReportNumber: ['', [Validators.required]],
      locoCatId: ['', [Validators.required]],
      locoNumber: ['', [Validators.required]],
      supervisorNic: ['', [Validators.required]],
      supervisorName: ['', [Validators.required]],
      managerName: ['', [Validators.required]],
      managerEmail: ['', [Validators.required]],
      progressDate: ['', [Validators.required]],
      checkArray: new FormArray([])

    });

    ///backend call karala me id ekata adala data tika load karaganna harithaee
    //ita passe e ena data object eka ara formgrop eke values walta assign karaganna harithe
   this.scheduleService.getOneSchedule(this.data.id).subscribe(resp =>{
     console.log(resp);
     if(resp != undefined){
       this.ReportGroup.controls['scheduleNo'].setValue(resp.scheduleNo);
       //this.ReportGroup.controls['mReportNumber'].setValue(resp.mReportNumber);
       this.ReportGroup.controls['locoCatId'].setValue(resp.locoCatId);
       this.ReportGroup.controls['locoNumber'].setValue(resp.locoNumber);
       this.ReportGroup.controls['supervisorNic'].setValue(resp.supervisorNic);
       this.ReportGroup.controls['supervisorName'].setValue(resp.supervisorName);
       this.ReportGroup.controls['managerName'].setValue(resp.managerName);
       this.ReportGroup.controls['managerEmail'].setValue(resp.managerEmail);
     }
   })






  }

  get getFm(){
    return this.ReportGroup.controls;
  }
  onSubmit(){
    this.logic();
    console.log(this.ReportGroup.value);
  }

  logic() {
    const presentage = [20 , 30 , 45 , 60, 75,90, 100];

    this.checkArrayNew = this.checkLength;

    const checkPresent = this.checkArrayNew.filter(pr => pr.value !== '');
    if(checkPresent.length > 0){
      console.log(presentage[checkPresent.length])
    }else{
      console.log('Porgress is 0')
    }
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.ReportGroup.get('checkArray') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
      console.log(checkArray)
      this.checkLength = checkArray.value;
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }

  }

}
