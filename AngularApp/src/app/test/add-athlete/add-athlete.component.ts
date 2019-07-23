import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/test.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-athlete',
  templateUrl: './add-athlete.component.html',
  styleUrls: ['./add-athlete.component.css']
})
export class AddAthleteComponent implements OnInit {

  TestId : number;

  constructor(private _testService : TestService, private _route : ActivatedRoute, private _router : Router) { }

  ngOnInit() {
    this.TestId = this._route.snapshot.params['id'];
    this._testService.getAthlete();
    this._testService.getTestById(this.TestId);
    this._testService.AthleteAddFormData = {
      name : '',
      distance : 0,
      time : 0
    }
  }

  userSubmit(id : number) {
    this._testService.createAthlete(id).subscribe(
      res => {
        debugger
        this._router.navigate(['/']);
      }, 
      err => {
        console.log(err);
      }
    )
  }
}
