import { Component, OnInit } from '@angular/core';
import {ScheduleService} from "../../../../../service/schedule.service";
import {Router} from "@angular/router";
import {LocomotiveService} from "../../../../../service/locomotive.service";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  draftScheduleCount: number;
  acceptScheduleCount: number;
  inLocoCount: number;
  outLocoCount: number;
  constructor(private schedulesService: ScheduleService , private router: Router, private locomotiveService: LocomotiveService) {
    this.DraftScheduleCount();
    this.AcceptScheduleCount();
    this.InLocoCount();
    this.OutLocoCount();
  }

  ngOnInit(): void {
  }
  DraftScheduleCount(){
    this.schedulesService.getDraftCount().subscribe(resp => {
      if(resp >= 0){
        this.draftScheduleCount = resp;
      }
    });
  }
  AcceptScheduleCount(){
    this.schedulesService.getAcceptCount().subscribe(resp => {
      if(resp >= 0){
        this.acceptScheduleCount = resp;
      }
    });
  }

  InLocoCount(){
    this.locomotiveService.getInCount().subscribe(resp => {
      if (resp >= 0){
        this.inLocoCount = resp;
      }
    });
  }

  OutLocoCount(){
    this.locomotiveService.getOutCount().subscribe(resp => {
      if (resp >= 0){
        this.outLocoCount = resp;
      }
    });
  }
}
