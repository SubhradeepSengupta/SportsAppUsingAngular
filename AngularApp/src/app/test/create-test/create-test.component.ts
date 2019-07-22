import { Component, OnInit } from '@angular/core';
import { TestService } from '../shared/test.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  constructor(private _testService : TestService, private _route : Router) { }

  ngOnInit() {
    this.reserForm();
    this._testService.getTestType();
  }

  reserForm(form? : NgForm) {
    if (!form == null)
      form.resetForm();
    this._testService.FormData = {
      id: 0,
      date : null,
      testtype : ''
    }
  }

  onSubmit(form) {
    this._testService.createTest().subscribe(
      _res => {
        this.reserForm(form);
        this._route.navigate(['/test-list']);
      },
      err => {
        console.log(err);
      }
    )
  }
}
