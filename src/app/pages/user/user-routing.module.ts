import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateFormComponent } from './user-create-form/user-create-form.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'user-form',
    component: UserCreateFormComponent,
  },
  {
    path: 'user-list',
    component: UserListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
