import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {

  constructor(private employeeService:EmployeeService, private http:HttpClient, private fb:FormBuilder){}
  updateForm!: FormGroup;
  showHeader:boolean=true;
  employeeData:any;
  employeeId: string='';
  filteredEmployee: any;
  newEmployeeId: string='';
  newEmployeeFirstName: string='';
  newEmployeeLastName: string='';
  newEmployeeEmail: string='';

  public confirmDelete(employeeId: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteIt(employeeId);
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
      } else {
        Swal.fire('Cancelled', 'Your file is safe :)', 'info');
      }
    });
  }
  

showDetails: boolean = false;
selectedEmployee: any;
showTable:boolean = true;

filterElementById(id: string) {
  this.http.get<any>("http://localhost:3000/employees/" + id)
    .subscribe(
      (response) => {
        console.log('response received');
        this.selectedEmployee = response;
        this.showDetails = true;
        this.showTable = false;
      },
      (error) => {
        console.error('Request failed with error');
        alert(error);
      },
      () => {
        console.log('Request completed');
      }
    );
}

closeDetails(){
  this.showDetails = false;
  this.showTable=true;
  this.showHeader=true;
  this.showForm=false;
}


  public getEmployeeData() {
    return this.http.get<any[]>("http://localhost:3000/employees") 
      .subscribe(
        (response) => {                           
          console.log('response received')
          console.log(response);
          this.employeeData = response;
          console.log(this.employeeData); 
        },
        (error) => {                             
          console.error('Request failed with error')
          alert(error);
        },
        () => {                                  
          console.log('Request completed')
        }
      );
  }

  public deleteIt(id: string) {
    return this.http.delete<any>("http://localhost:3000/employees/" + id)
      .subscribe(
        () => {
          console.log('Delete request successful');
          this.getEmployeeData();
        },
        (error) => {
          console.error('Delete request failed with error', error);
          alert(error);
        },
        () => {
          console.log('Delete request completed');
        }
      );
  }

  
  showForm:boolean=false;

  openUpdateForm(employee: any) {
    this.showForm = true;
    this.showTable = false;
    this.showHeader = false;
    this.updateForm = this.fb.group({
      id: [employee.id, Validators.required],
      first_name: [employee.first_name, Validators.required], 
      last_name: [employee.last_name, Validators.required],  
      email: [employee.email, Validators.required],  
      dob: [employee.dob, Validators.required]    
    });
  }

  public updateIt(id:string) {

    let data: { id: string; first_name: string; last_name: string; email: string; dob: string;} = {
      id: this.updateForm.value.id,
      first_name: this.updateForm.value.first_name,
      last_name: this.updateForm.value.last_name,
      email: this.updateForm.value.email,
      dob: this.updateForm.value.dob
    };
 
    return this.http.patch<any>("http://localhost:3000/employees/"+id,data)
      .subscribe(
        (response) => {                          
          console.log('response received')
          console.log(response);
          this.employeeData = response; 
          this.showHeader=true;
          this.showTable=true;
          this.showForm=false;
          this.getEmployeeData();
          Swal.fire({
            icon: 'success',
            title: 'Employee details updated',
            showConfirmButton: false,
            timer: 1500  
          });
        },
        (error) => {                             
          console.error('Request failed with error')
          alert(error);
        },
        () => {                                  
          console.log('Request completed')
        })
  }

  // public patch(id:string) {

  //   let data: { id: string; first_name: string; last_name: string; email: string } = {
  //     id: this.newEmployeeId,
  //     first_name: this.newEmployeeFirstName,
  //     last_name: this.newEmployeeLastName,
  //     email: this.newEmployeeEmail
  //   };
 
  //   return this.http.patch<any>("http://localhost:3000/employees/"+id,data)
  //     .subscribe(
  //       (response) => {                          
  //         console.log('response received')
  //         console.log(response);
  //         this.employeeData = response; 

  //       },
  //       (error) => {                          
  //         console.error('Request failed with error')
  //         alert(error);
  //       },
  //       () => {                             
  //         console.log('Request completed')
  //       })
  // }
  

  ngOnInit() {
    this.getEmployeeData();
  }

}
