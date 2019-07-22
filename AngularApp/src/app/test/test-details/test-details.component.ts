import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/test.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css']
})
export class TestDetailsComponent implements OnInit {

  constructor(private _testService : TestService, private _route : ActivatedRoute, private _router : Router) { }

  ngOnInit() {
    this._testService.getTestById(+this._route.snapshot.paramMap.get('id'));
  }

  deleteTest(id : number) {
    if(confirm("Are You Sure?")) {
      this._testService.deleteTest(id).subscribe(
        res => {
          this._router.navigate(['/test-list']);
        },
        err => {
          console.log(err);        }
      )
    }
  }
}
