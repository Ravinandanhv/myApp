import { Component, Inject, Input } from '@angular/core';
import { AppService } from './app.service';
import { ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinValidator } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';
  sel=4;
  selectors=[1,2,3,4,5];
  post:any;
  arr:any=[];
  showEditPanel:boolean=false;
  form:FormGroup;
  inputValue:any;
  // form1: FormGroup;
  constructor(private service:AppService,
    private fb:FormBuilder, private elRef:ElementRef){
      this.form=this.fb.group({
        name:[null,[Validators.required]],
        age:[null,[Validators.required, Validators.min(1), Validators.max(150)]],
        email:[null, [Validators.required,
          Validators.email
        ]],
        gender:[null]
      })
    }


  ngOnInit(){
    this.getUsers();
  }

  gen(event:any){
    if(event.target.checked){
      this.form.value.gender=event.target.id;
    }else{
      this.form.value.gender=null;
    }
    console.log(document.getElementById("Female"))
  }

  getUsers(){
    this.service.getUsers().subscribe(res=>{
      this.post=res;
      this.post=this.post.map((ele: any) => {
        ele.checked=false;
        return ele;
      })
      console.log(this.post)
    })
  }

  createUser(){
    console.log("Submitted",this.form.value);
    this.service.post(this.form.value).subscribe(res=>{
      console.log(res)
      this.getUsers();
    }) 
  }

  onChange(event:any, po:any){
    if(event.target.checked){
      this.arr.push(po.name);
    }else{
      for(var i=0 ; i < this.post.length; i++) {
        if(this.arr[i] == po.name) {
          this.arr.splice(i,1);
       }
     }
    }
    console.log(this.arr)
  }

  edit(){
    this.showEditPanel=!this.showEditPanel
  }

  selectAll(event:any){
    if(event.target.checked){
      for(var i=0;i<this.post.length;i++){
        this.post[i].checked=true;
        this.arr.push(this.post[i].name);
      }
    }else{
      for(var i=0;i<this.post.length;i++){
        this.post[i].checked=false;
      }
      this.arr=[];
    }
    console.log(this.arr)
  }

  deleteAll(){
    this.service.del(this.arr).subscribe(res=>{
      console.log(res)
      this.arr=[];
      this.getUsers();
    })
  }

  delete(name:any){
    name=[name];
    this.service.del(name).subscribe(res=>{
      console.log(res)
      this.getUsers();
    })
  }
}
