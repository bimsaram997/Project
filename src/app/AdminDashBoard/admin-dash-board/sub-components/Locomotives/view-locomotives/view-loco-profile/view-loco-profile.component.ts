import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-view-loco-profile',
  templateUrl: './view-loco-profile.component.html',
  styleUrls: ['./view-loco-profile.component.css']
})
export class ViewLocoProfileComponent implements OnInit {
  viewLocoGroup: FormGroup;
  myControl = new FormControl();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.viewLocoGroup = this.formBuilder.group({})
  }

}
