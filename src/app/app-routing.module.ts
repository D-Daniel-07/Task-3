import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

const routes: Routes = [
  {path:'',component:EmployeeComponent, data: { reuse: true}},
  {path:'employee-form',component:EmployeeFormComponent, data: { reuse: true}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
