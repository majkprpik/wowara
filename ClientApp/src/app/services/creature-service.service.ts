import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatureService{
  private baseUrl:string=''

  constructor(private http: HttpClient) { }

  getAllCreatures(){ 
      return this.http.get(
        this.baseUrl
      ); 
    }
  }

