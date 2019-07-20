import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor(private _userService: UserService, private _route : Router) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (!form == null)
      form.resetForm();
    this._userService.FormData = {
      id: 0,
      name: '',
      role: 0,
      userrole: '',
      userTestMappers: null
    }
  }

  userSubmit(form) {
    this._userService.createUser().subscribe(
      _res => {
        this.resetForm(form);
        this._route.navigate(['/user-list']);
      },
      err => {
        console.log(err);
      }
    )
  }
}
