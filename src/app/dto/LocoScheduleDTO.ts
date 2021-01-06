export default class LocoScheduleDTO {

  constructor(scheduleNo: string, scheduleUpdate: string, locoCatId: string, locoNumber: number, customerNic: string, customerName: string, customerEmail: string, scheduleStatus: string, scheduleTrackMotors: string[], scheduleLocoBody: string[], scheduleElCuUnit: string[], scheduleEMechanical: string[], scheduleMach: string[], scheduleRemark: string) {
    this._scheduleNo = scheduleNo;
    this._scheduleUpdate = scheduleUpdate;
    this._locoCatId = locoCatId;
    this._locoNumber = locoNumber;
    this._customerNic = customerNic;
    this._customerName = customerName;
    this._customerEmail = customerEmail;
    this._scheduleStatus = scheduleStatus;

    this._scheduleTrackMotors = scheduleTrackMotors;
    this._scheduleLocoBody = scheduleLocoBody;
    this._scheduleElCuUnit = scheduleElCuUnit;
    this._scheduleEMechanical = scheduleEMechanical;
    this._scheduleMach = scheduleMach;
    this._scheduleRemark = scheduleRemark;
  }
  get scheduleNo(): string {
    return this._scheduleNo;
  }

  set scheduleNo(value: string) {
    this._scheduleNo = value;
  }

  get scheduleUpdate(): string {
    return this._scheduleUpdate;
  }

  set scheduleUpdate(value: string) {
    this._scheduleUpdate = value;
  }

  get locoCatId(): string {
    return this._locoCatId;
  }

  set locoCatId(value: string) {
    this._locoCatId = value;
  }

  get locoNumber(): number {
    return this._locoNumber;
  }

  set locoNumber(value: number) {
    this._locoNumber = value;
  }

  get customerNic(): string {
    return this._customerNic;
  }

  set customerNic(value: string) {
    this._customerNic = value;
  }

  get customerName(): string {
    return this._customerName;
  }

  set customerName(value: string) {
    this._customerName = value;
  }

  get customerEmail(): string {
    return this._customerEmail;
  }

  set customerEmail(value: string) {
    this._customerEmail = value;
  }

  get scheduleStatus(): string {
    return this._scheduleStatus;
  }

  set scheduleStatus(value: string) {
    this._scheduleStatus = value;
  }



  get scheduleTrackMotors(): string[] {
    return this._scheduleTrackMotors;
  }

  set scheduleTrackMotors(value: string[]) {
    this._scheduleTrackMotors = value;
  }

  get scheduleLocoBody(): string[] {
    return this._scheduleLocoBody;
  }

  set scheduleLocoBody(value: string[]) {
    this._scheduleLocoBody = value;
  }

  get scheduleElCuUnit(): string[] {
    return this._scheduleElCuUnit;
  }

  set scheduleElCuUnit(value: string[]) {
    this._scheduleElCuUnit = value;
  }

  get scheduleEMechanical(): string[] {
    return this._scheduleEMechanical;
  }

  set scheduleEMechanical(value: string[]) {
    this._scheduleEMechanical = value;
  }


  get scheduleMach(): string[] {
    return this._scheduleMach;
  }

  set scheduleMach(value: string[]) {
    this._scheduleMach = value;
  }

  set scheduleRemark(value: string) {
    this._scheduleRemark = value;
  }
  get scheduleRemark(): string {
    return this._scheduleRemark;
  }
  private _scheduleNo: string;
  private _scheduleUpdate: string;
  private _locoCatId: string;
  private _locoNumber: number;
  private _customerNic: string;
  private _customerName: string;
  private _customerEmail: string;
  private _scheduleStatus: string;
  private _scheduleTrackMotors: string[] = [];
  private _scheduleLocoBody: string[] = [];
  private _scheduleElCuUnit: string[] = [];
  private _scheduleEMechanical: string[] = [];
  private _scheduleMach: string[] = [];
  private _scheduleRemark: string;




}
