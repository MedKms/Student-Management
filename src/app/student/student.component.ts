import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students:Student[]=[];
  public deleteStudent!: Student;
  public editStudent!: Student;
  constructor(private studentService:StudentService) {
   }

  ngOnInit(): void {
    this.getStudents();
  }
  
  public getStudents(){
    this.studentService.getStudents().subscribe(
      (response:Student[])=>{
        this.students=response;
      },
    (error:HttpErrorResponse)=>{
      alert(error.message)
    }
      );
  }
  
  public onOpenModal(student:any,mode:string):void{
    const container= <HTMLDivElement>document.getElementById('main-container');
    const button=document.createElement('button');
    button.type='button';
    button.style.display='none'
    button.setAttribute('data-toggle','modal');
    if(mode === 'add'){
      button.setAttribute('data-target','#addModal');
    }
    if(mode === 'delete'){
      this.deleteStudent=student;
      button.setAttribute('data-target','#deleteModal');
    }
    if(mode === 'edit'){
      this.editStudent=student;
      button.setAttribute('data-target','#editModal');
    }
    container.appendChild(button);
    button.click();
  }

  public onDeleteStudent(studentId:number){
    this.studentService.deleteStudent(studentId).subscribe(
      (response:void) =>{
        console.log(response);
        this.getStudents();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }
  public onAddStudent(addForm:NgForm):void{
    this.studentService.saveStudent(addForm.value).subscribe(
      (respone:Student) => {
        console.log(respone);
        this.getStudents();
      },
      (error:HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}


