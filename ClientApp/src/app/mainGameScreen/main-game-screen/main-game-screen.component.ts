import { CreatureService } from './../../services/creature-service.service';
import { CreatureModel } from './../../models/creature-model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-game-screen',
  templateUrl: './main-game-screen.component.html',
  styleUrls: ['./main-game-screen.component.css']
})
export class MainGameScreenComponent implements OnInit {
  public creatures: CreatureModel[] = [];
  public isPlayersCreature: boolean=false;
  public isPlaying: boolean=false;

  constructor(private creatureServise: CreatureService) { }

  ngOnInit(): void {
  }
  play(){
    this.isPlaying=true;
  }

}
