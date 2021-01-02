import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  onToogleSlidenav() {
    this.sidenavToggle.emit();
  }

}
