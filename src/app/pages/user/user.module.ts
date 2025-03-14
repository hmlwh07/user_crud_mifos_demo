import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateFormComponent } from './user-create-form/user-create-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { ShareModule } from 'src/app/share/share.module';

@NgModule({
  declarations: [
    UserCreateFormComponent,
    UserListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ShareModule
  ],
  exports: [
    UserCreateFormComponent,
    UserListComponent
  ]
})
export class UserModule { }
