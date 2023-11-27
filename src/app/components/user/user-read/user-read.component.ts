import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-read',
  templateUrl: './user-read.component.html',
  styleUrls: ['./user-read.component.css'],
})
export class UserReadComponent implements OnInit {
  dataSource: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'gender', 'email', 'status', 'action'];
  searchValue: string = '';

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.usersService.read().subscribe((users) => {
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(): void {
    this.dataSource.filter = this.searchValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
