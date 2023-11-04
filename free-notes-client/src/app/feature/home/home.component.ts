import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/common-service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    getSubject:any=[];
    fields:any = [];
    documents:any=[];
    getField: FormGroup;
    constructor(private apiService:ApiService, private formBuilder:FormBuilder) { 
      this.getField = this.formBuilder.group({
        id: ['', Validators.required]
      });
    }
  ngOnInit(): void {
   this.apiService.get('/get-fields').subscribe((res:any)=>{
     console.log(res);
     this.fields=res;
   })
  }
  searchSubject(){
    const id:string=this.getField.value
  
    this.apiService.get('/get-subjects',id).subscribe((res:any)=>{
    
        res.subjects.forEach((element: any) => {
          this.getSubject.push(element);
        });
      
      console.log(this.getSubject)
    })
  }

  loadDocuments(id:string){
    console.log(id)
    this.apiService.get(`/subject-document/${id}`).subscribe((res:any)=>{
      this.documents=res.documents;
      console.log(this.documents)
    });
  }
   
}
