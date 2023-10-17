import { Component } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { faUsersViewfinder } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {

  constructor(private employeeService: EmployeeService, private http: HttpClient, private fb: FormBuilder) {}

  employeeForm!: FormGroup;

  public postRepos() {
    const formData = this.employeeForm.value; 
    return this.http.post<any>("http://localhost:3000/employees", formData)
      .subscribe(
        (response) => {                          
          console.log('response received');
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'New Employee Details Added',
            showConfirmButton: false,
            timer: 1500  
          });
        },
        (error) => {                          
          console.error('Request failed with error');
          alert(error);
        },
        () => {                               
          console.log('Request completed');
        });
  }

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      id: ['', Validators.required],
      first_name: ['', Validators.required], 
      last_name: ['', Validators.required],  
      email: ['', Validators.required],  
      dob: ['', Validators.required]    
    });
  }
}
