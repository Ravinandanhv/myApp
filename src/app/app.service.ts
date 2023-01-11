import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  i:number=1;
  private url='http://localhost:3000/api/users'

  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(this.url);
  }

  getVeh(){
    return this.http.get('http://localhost:3001/Vehicles')
  }

  post(user:any){
    return this.http.post(this.url, user);
  }

  // del(name:any){
  //   return this.http.delete(this.url+"/"+name, {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json'
  //     })
  //   })
  // }

  del(names:any){
    console.log(names)
    return this.http.post(this.url+'/delete',names);
  }
}