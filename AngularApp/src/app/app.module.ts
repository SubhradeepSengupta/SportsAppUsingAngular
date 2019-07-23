import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { RouterModule } from '@angular/router';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserService } from './user/shared/user.service';
import { TestListComponent } from './test/test-list/test-list.component';
import { CreateTestComponent } from './test/create-test/create-test.component';
import { TestDetailsComponent } from './test/test-details/test-details.component';
import { AddAthleteComponent } from './test/add-athlete/add-athlete.component';
import { EditAthleteComponent } from './test/edit-athlete/edit-athlete.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    TestModule,
    RouterModule.forRoot([
      { 
        path : '', 
        component: TestListComponent, 
        pathMatch: 'full'
      },
      { 
        path : 'user-list', 
        component: UserListComponent, 
        pathMatch: 'full'
      },
      { 
        path : 'create-user', 
        component: UserCreateComponent
      },
      { 
        path : 'edit-user/:id',
        component: UserEditComponent
      },
      {
        path: 'test-list',
        component: TestListComponent
      },
      {
        path: 'create-test',
        component: CreateTestComponent
      },
      {
        path: 'test-details/:id',
        component: TestDetailsComponent
      },
      {
        path: 'test-details/:id/add-athlete',
        component: AddAthleteComponent
      },
      {
        path: 'edit-athlete/:testId/:userId',
        component: EditAthleteComponent
      },
    ])
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
