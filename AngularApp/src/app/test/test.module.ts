import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestListComponent } from './test-list/test-list.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { TestDetailsComponent } from './test-details/test-details.component';
import { TestService } from './shared/test.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AddAthleteComponent } from './add-athlete/add-athlete.component';
import { EditAthleteComponent } from './edit-athlete/edit-athlete.component';

@NgModule({
  declarations: [TestListComponent, CreateTestComponent, TestDetailsComponent, AddAthleteComponent, EditAthleteComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports : [
    CreateTestComponent,
    TestDetailsComponent,
    TestListComponent,
    AddAthleteComponent,
    EditAthleteComponent
  ],
  providers: [ TestService ]
})
export class TestModule { }
