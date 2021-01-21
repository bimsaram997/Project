import { Injectable } from '@angular/core';
import LocoScheduleDTO from '../dto/LocoScheduleDTO';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  myUrl = environment.baseUrlTwo;
  constructor(private http: HttpClient) { }
  public saveSchedule(dto: LocoScheduleDTO): Observable<any>{
    return this.http.post(this.myUrl + 'scheduleRoute/saveSchedule',{
      scheduleNo: dto.scheduleNo,
      scheduleUpdate: dto.scheduleUpdate,
      locoCatId: dto.locoCatId,
      locoNumber: dto.locoNumber,
      customerNic: dto.customerNic,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      scheduleStatus: dto. scheduleStatus,
      scheduleTrackMotors: dto.scheduleTrackMotors,
      scheduleLocoBody: dto.scheduleLocoBody,
      scheduleElCuUnit: dto.scheduleElCuUnit,
      scheduleEMechanical: dto.scheduleEMechanical,
      scheduleMach: dto.scheduleMach,
      scheduleRemark: dto.scheduleRemark
    });
  }

  public getAllSchedules(): Observable<any> {
    return this.http.get(this.myUrl + 'scheduleRoute/getAllSchedules');
  }
  public deleteSchedule(id: string): Observable<any> {
    return this.http.delete( this.myUrl + 'scheduleRoute/deleteSchedule', {headers: {id}});

  }
  public updateSchedule(dto: LocoScheduleDTO): Observable<any> {
    return this.http.put( this.myUrl + 'scheduleRoute/updateSchedule', {
      scheduleNo: dto.scheduleNo,
      scheduleUpdate: dto.scheduleUpdate,
      locoCatId: dto.locoCatId,
      locoNumber: dto.locoNumber,
      customerNic: dto.customerNic,
      customerName: dto.customerName,
      customerEmail: dto.customerEmail,
      scheduleStatus: dto. scheduleStatus,
      scheduleTrackMotors: dto.scheduleTrackMotors,
      scheduleLocoBody: dto.scheduleLocoBody,
      scheduleElCuUnit: dto.scheduleElCuUnit,
      scheduleEMechanical: dto.scheduleEMechanical,
      scheduleMach: dto.scheduleMach,
      scheduleRemark: dto.scheduleRemark
    });

  }
  public getSchedule(customerNic: string): Observable<LocoScheduleDTO>
  {
    return this.http.get<LocoScheduleDTO>(this.myUrl + 'scheduleRoute/getSchedule/: id',{headers: {customerNic}})
  }
}
