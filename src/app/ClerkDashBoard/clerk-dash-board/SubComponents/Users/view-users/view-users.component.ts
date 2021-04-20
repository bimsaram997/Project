import {Component, OnInit, ViewChild} from '@angular/core';
import {AccessService} from "../../../../../service/access.service";
import {MatTableDataSource} from "@angular/material/table";
import UserDTO from "../../../../../dto/UserDTO";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  constructor(private accessService: AccessService) { }
  searchKey: string;
  dataSource: MatTableDataSource<UserDTO>;
  displayedColumns: string[] = ['User Email', 'User Name', 'Works At', 'User NIC', 'User Mobile', 'Role', '#'];
  userArray: UserDTO[] = [];
  loading =  false;
  @ViewChild(MatSort) sort: MatSort;


  ngOnInit(): void {
  }

  private loadAllUsers(){
    this.loading = true;
    this.accessService.getAllUsers().subscribe(resp =>{
      this.userArray = resp;

    })
  }





  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }

}
