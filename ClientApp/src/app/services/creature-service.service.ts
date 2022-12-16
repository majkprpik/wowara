import { CreatureModel } from './../models/creature-model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatureService{
  creatureList: CreatureModel[]=[];
  creature: CreatureModel;
  baseUrl: string;

  constructor(private http: HttpClient,@Inject('BASE_URL') baseUrl: string) {
    this.baseUrl=baseUrl;

     }

  getAllCreatures(){ 
      return this.http.get<CreatureModel[]>(
        this.baseUrl + 'api/Creature/GetAll'
      ).subscribe(data=>{
        this.creatureList= data
        
      })
      
    }

  getRandomCreature(): CreatureModel{
   let randomIndex= Math.floor(Math.random()*this.creatureList.length)
 
   let creature= this.creatureList.splice(randomIndex,1)[0]
   console.log(this.creatureList);
   return creature
   
   
  }

  }
  

