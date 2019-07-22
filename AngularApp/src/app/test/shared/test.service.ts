import { Injectable } from '@angular/core';
import { TestTypeMapperModel, TestType, TestViewModel, UserTestViewModel } from './testmodel.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  Url = 'http://localhost:50923/api/';
  TestList: TestTypeMapperModel[];
  TestTypeList: TestType[];
  FormData: TestViewModel;
  AthleteAddFormData: UserTestViewModel;
  AthleteList: any[];

  constructor(private _http: HttpClient) { }

  getTestList() {
    this._http.get(this.Url + 'Test').toPromise()
      .then(res => {
        this.TestList = res as TestTypeMapperModel[];
        console.log(res);
      },
        err => {
          console.log(err);
        })
  }

  getTestById(id: number) {
    this._http.get(this.Url + 'Test/' + id).toPromise()
      .then(res => {
        this.TestList = res as TestTypeMapperModel[];
        console.log(this.TestList);
      })
  }

  getTestType() {
    this._http.get(this.Url + 'Test/GetTestType').toPromise()
      .then(res => {
        this.TestTypeList = res as TestType[];
      })
  }

  createTest() {
    return this._http.post(this.Url + 'Test', this.FormData);
  }

  deleteTest(id: number) {
    debugger
    return this._http.delete(this.Url + 'Test/' + id);
  }

  getAthlete() {
    this._http.get(this.Url + 'User/Athlete').toPromise()
      .then(res => {
        this.AthleteList = res as any[];
        console.log(this.AthleteList);
     })
  }

  createAthlete(id : number) {
    return this._http.post(this.Url + 'Test/' + id, this.AthleteAddFormData);
  }
}
