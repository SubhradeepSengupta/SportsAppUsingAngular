import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/test.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-athlete',
  templateUrl: './edit-athlete.component.html',
  styleUrls: ['./edit-athlete.component.css']
})
export class EditAthleteComponent implements OnInit {

  TestId : number;
  AthleteId : number;
  Athlete : any;
  toDisplay: boolean;

  constructor(private _testService : TestService, private _route: ActivatedRoute, private _router : Router) { 
    this.toDisplay = false;
  }

  ngOnInit() {
    this.TestId = +this._route.snapshot.paramMap.get('testId');
    this.AthleteId = +this._route.snapshot.paramMap.get('userId');
    
    this._testService.getUserByTestId(this.TestId, this.AthleteId).then(
      res => {
        this.Athlete = res;
        this.toDisplay = true;
        console.log(this.Athlete);
      }
    );
  }

  editAthlete() {
    this._testService.editAthlete(this.TestId, this.AthleteId, this.Athlete).subscribe(
      res => {
        this._router.navigate(['/test-details/', this.TestId]);
      }, 
      err => {
        console.log(err);
      }
    )
  }

  deleteAthlete() {
    if(confirm("Are you sure?")) { 
      this._testService.deteleAthlete(this.TestId, this.AthleteId).subscribe(
        res => {
          this._router.navigate(['/test-details/', this.TestId]);
        }, 
        err => {
          console.log(err);
        }
      )
    }
  }
}
