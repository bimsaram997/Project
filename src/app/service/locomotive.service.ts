import { Injectable } from '@angular/core';
import LocoDTO from '../dto/LocoDTO';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocomotiveService {
  myUrl = environment.baseUrlOne;
  constructor(private http: HttpClient) { }

  public saveLoco(dto: LocoDTO): Observable<any>{
    return this.http.post( this.myUrl +  'locoRoute/saveLoco', {
      locoCatId: dto.locoCatId,
      locoPower: dto.locoPower,
      locoNumber: dto.locoNumber,
      locoAvailability: dto.locoAvailability,
      locoMileage: dto.locoMileage,
      userNic: dto.userNic,
      locoDate: dto.locoDate,
      locoOil: dto.locoOil,
      locoFuel: dto.locoFuel,
      locoWater: dto.locoWater,
      locoMainGen: dto.locoMainGen,
      locoTracMot: dto.locoTracMot,
      locoVBreak: dto.locoVBreak,
      locoDBreak: dto.locoDBreak,
      locoNote: dto.locoNote,
      image: dto.image,
    });
  }

  public getAllLocomotives(): Observable<any> {
    return this.http.get( this.myUrl + 'locoRoute/getAllLocomotives');
  }
  public deleteLoco(id: string): Observable<any> {
    return this.http.delete( this.myUrl + 'locoRoute/deleteLoco', {headers: {id}});

  }
  public  getAllLocosSelect(): Observable<any> {
    return this.http.get(this.myUrl + 'locoRoute/getAllLocosSelect');
  }
  public updateLocomotive(dto: LocoDTO): Observable<any>{
    return this.http.put(this.myUrl + 'locoRoute/updateLocomotive', {
      locoCatId: dto.locoCatId,
      locoPower: dto.locoPower,
      locoNumber: dto.locoNumber,
      locoMileage: dto.locoMileage,
      locoAvailability: dto.locoAvailability,
      userNic: dto.userNic,
      locoDate: dto.locoDate,
      locoOil: dto.locoOil,
      locoFuel: dto.locoFuel,
      locoWater: dto.locoWater,
      locoMainGen: dto.locoMainGen,
      locoTracMot: dto.locoTracMot,
      locoVBreak: dto.locoVBreak,
      locoDBreak: dto.locoDBreak,
      locoNote: dto.locoNote
    })
  }
  public getInCount(): Observable<any>{
    return this.http.get(this.myUrl + 'locoRoute/getInCount');
  }
  public getOutCount(): Observable<any>{
    return this.http.get(this.myUrl + 'locoRoute/getOutCount');
  }
}
