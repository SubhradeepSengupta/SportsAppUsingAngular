import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, UserRole } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  FormData: User;
  URl = 'http://localhost:50923/api/';
  UserList: User[];

  UserRoleEnum: any[] = [
    {
      key: UserRole.Coach, value: 'Coach'
    },
    {
      key: UserRole.Athlete, value: 'Athlete'
    }
  ];

  constructor(private _http: HttpClient) {
  }

  getUser() {
    // converting observable to promise and returning the list of data as Model array
    return this._http.get(this.URl + 'User').toPromise()
      .then(res => {
        this.UserList = res as User[];
        this.UserList.forEach(user => {
          user.userrole = this.UserRoleEnum
            .filter(u => u.key == user.role)[0].value;
        })
      }
      )
  }

  getUserById(id: number) {
    return this._http.get(this.URl + 'User/' + id).toPromise()
      .then(res => {
        this.UserList = res as User[];
        this.UserList = res as User[];
        this.UserList.forEach(user => {
          user.userrole = this.UserRoleEnum
            .filter(u => u.key == user.role)[0].value;
        })
        console.log(this.UserList);
      }
      )
  }

  createUser() {
    return this._http.post(this.URl + 'User', this.FormData);
  }

  updateUser() {
    return this._http.put(this.URl + 'User/' + this.FormData.id, this.FormData);
  }

  deleteUser(id: number) {
    return this._http.delete(this.URl + 'User/' + id);
  }
}
