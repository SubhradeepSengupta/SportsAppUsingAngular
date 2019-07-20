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
        component: UserListComponent, 
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
    ])
  ],
  providers: [ UserService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
