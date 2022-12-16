import { CreatureModel } from './../../models/creature-model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['./creature.component.css']
})
export class CreatureComponent implements OnInit {
  @Input() isPlayerCreature: boolean;
  @Input() creature: CreatureModel;

  constructor() { }

  ngOnInit(): void {
  }

  chooseBtn(choice: string){
    
  }
}
