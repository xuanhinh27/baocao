import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'; 
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
   
  providers: [ApiService  ],
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {
employeeModelObj:EmployeeModel=new EmployeeModel();


  formValue !: FormGroup;
employeeData!:any;
showAdd!:boolean;
showUpdate!:boolean;


showUpdateTitle!:boolean;
showAddTitle!:boolean;
  constructor(private formBuilder:FormBuilder,private api:ApiService) { 

  }

  addButtonClickFunction(){
    this.formValue.reset();
    this.showUpdate=false;
    this.showAdd=true;
    
    this.showUpdateTitle=false;
    this.showAddTitle=true;
  }



  ngOnInit(): void {

  this.formValue=this.formBuilder.group({

  firstName:[''],
  lastName:[''],
  Email:[''],
  Mobile:[''],
  Salary:[''],
      
    })  
this.getAllEmployee();
}

postEmployeeDetails(){
//alert("fucntion call");
this.employeeModelObj.id=this.formValue.value.id ;

  this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.Email=this.formValue.value.Email;
  this.employeeModelObj.Mobile=this.formValue.value.Mobile;
  this.employeeModelObj.Salary=this.formValue.value.Salary;

  let cancel=document.getElementById("cancel");
  this.api.postData(this.employeeModelObj).subscribe(a=> {

    console.log(a);
    alert("Record inserted successfully");
    cancel?.click();this.formValue.reset();
    this.getAllEmployee();
  })
 }


getAllEmployee(){
  this.api.getData().subscribe(a=>{
    this.employeeData=a;
  })

}
deleteEmployee(row:any){

  this.api.deleteData(row.id).subscribe(a=>{
    alert("Record Deleted Succesfully");
    this.getAllEmployee();
  })

}
updateEmployee(row:any){
  this.showUpdate=true;
  this.showAdd=false;

  this.showUpdateTitle=true;
  this.showAddTitle=false;
  this.employeeModelObj.id=row.id;
  this.formValue.controls['firstName'].setValue(row.firstName);
  this.formValue.controls['lastName'].setValue(row.lastName);
  this.formValue.controls['Email'].setValue(row.Email);
  this.formValue.controls['Mobile'].setValue(row.Mobile);
  this.formValue.controls['Salary'].setValue(row.Salary);

}

updateEmployeeDetails(){

  this.employeeModelObj.firstName=this.formValue.value.firstName;
  this.employeeModelObj.lastName=this.formValue.value.lastName;
  this.employeeModelObj.Email=this.formValue.value.Email;
  this.employeeModelObj.Mobile=this.formValue.value.Mobile;
  this.employeeModelObj.Salary=this.formValue.value.Salary;
  this.api.updateData(this.employeeModelObj,this.employeeModelObj.id).subscribe(a=>{
    alert("Record updated Succesfully");

  let cancel=document.getElementById("cancel");

    cancel?.click();
    this.formValue.reset();
    this.getAllEmployee();
  })
}

}
