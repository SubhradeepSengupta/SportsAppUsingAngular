import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private _userService : UserService, private _route : ActivatedRoute, private _router :Router) { }

  ngOnInit() {
    this._userService.getUserById(+this._route.snapshot.paramMap.get('id'));
  }

  editUser(form : NgForm){
    this._userService.updateUser().subscribe(
      _res => {
        this._router.navigate(['/user-list']);
      },
      err => {
        console.log(err);
      }
    )
  }
}
