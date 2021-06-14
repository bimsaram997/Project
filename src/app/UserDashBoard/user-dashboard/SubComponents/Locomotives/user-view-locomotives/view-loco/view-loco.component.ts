import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import LocoDTO from "../../../../../../dto/LocoDTO";

@Component({
  selector: 'app-edit-loco',
  templateUrl: './view-loco.component.html',
  styleUrls: ['./view-loco.component.css']
})
export class ViewLocoComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
