import { CreatureModel } from './../models/creature-model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatureService{
  creatureList: CreatureModel[]=[];
  creaturePlayingList: CreatureModel[]=[]
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
        this.creaturePlayingList=this.creatureList
      })
      
    }

  getRandomCreature(): CreatureModel{
   let randomIndex= Math.floor(Math.random()*this.creatureList.length)

   let creature=this.creaturePlayingList[0];
 
   if(this.creaturePlayingList.length > 1){
     creature= this.creaturePlayingList.splice(randomIndex,1)[0]
     //console.log(this.creatureList);
     
    }
    return creature
   
  }
  resetCreatureList(){
    this.creaturePlayingList=this.creatureList;
  }

  }
  

