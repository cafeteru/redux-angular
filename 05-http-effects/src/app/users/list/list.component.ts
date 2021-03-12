import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users: User[] = [];

  constructor(
    private service: UserService
  ) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe(
      res => this.users = res
    );
  }

}
