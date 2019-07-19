import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  FormData: User;
  URl = 'http://localhost:50923/api/';
  UserList: User[];

  headers: HttpHeaders;
  constructor(private _http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Accept', 'application/json');

  }

  getUser() {
    // converting observable to promise and returning the list of data as Model array
    return this._http.get(this.URl + 'User').toPromise()
    .then(res => 
      this.UserList = res as User[]
      );
  }

  createUser() {
    return this._http.post(this.URl + 'User', this.FormData);
  }

  updateUser() {
    return this._http.put(this.URl + 'User/' + this.FormData.id, this.FormData);
  }

  deleteUser(id : number) {
    return this._http.delete(this.URl + 'User/' + id);
  }
}
