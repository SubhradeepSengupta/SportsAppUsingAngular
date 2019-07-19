import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  user : User[];
  constructor(private _userService : UserService) { }

  ngOnInit() {
    this._userService.getUser();
  }

  deleteUser(id : number){
    if(confirm("Are you sure?")) {
      this._userService.deleteUser(id).subscribe(
        res => {
          this._userService.getUser();
        },
        err => {
          console.log(err);
        }
      )
    }
  }
}
