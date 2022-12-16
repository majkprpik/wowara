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
  public score: number=0;
  public youLost=false;
  public playAgainScreen:boolean=false;
  
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
    if(choice==='stronger' && this.creaturePlayer.attack < this.creatureOpponent.attack){
      this.score += 1;
    } else if(choice==='weaker' && this.creaturePlayer.attack > this.creatureOpponent.attack){
      this.score += 1;
    }
    else{
      this.gameLost()
      return
    }
    this.creaturePlayer=this.creatureOpponent
    this.creatureOpponent=this.creatureService.getRandomCreature()
  }
  gameLost(){
    this.creatureService.resetCreatureList();
    this.youLost=true;

  }

}
