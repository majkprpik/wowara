import { CreatureService } from './../../services/creature-service.service';
import { CreatureModel } from './../../models/creature-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-game-screen',
  templateUrl: './main-game-screen.component.html',
  styleUrls: ['./main-game-screen.component.css']
})
export class MainGameScreenComponent implements OnInit {
  public creaturePlayer: CreatureModel;
  public creatureOpponent: CreatureModel;
  public isPlayersCreature: boolean=false;
  public isPlaying: boolean=false;
  public score: number=1000;
  
  constructor(private creatureService: CreatureService) { this.creatureService.getAllCreatures()  }

  ngOnInit() {
    
    
  }
  play(){
    this.isPlaying=true;
    this.creaturePlayer=this.creatureService.getRandomCreature()
    this.creatureOpponent=this.creatureService.getRandomCreature()
  }
  
  checkIfCorrect(choice:string){
    //console.log(choice);
    if(choice==='stronger' && this.creaturePlayer.attack > this.creatureOpponent.attack){
      this.score += 100;
    } else if(choice==='weaker' && this.creaturePlayer.attack < this.creatureOpponent.attack){
      this.score += 100;
    }
    else{
      this.score -= 100;
    }
    this.creaturePlayer=this.creatureOpponent
    this.creatureOpponent=this.creatureService.getRandomCreature()
  }

}
