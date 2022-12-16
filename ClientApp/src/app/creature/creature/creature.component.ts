import { CreatureModel } from './../../models/creature-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-creature',
  templateUrl: './creature.component.html',
  styleUrls: ['./creature.component.css']
})
export class CreatureComponent implements OnInit {
  @Input() isPlayerCreature: boolean;
  @Input() creature: CreatureModel;
  @Output() playerChoseOption = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
   console.log(this.creature);
  }

  chooseBtn(choice: string){
    this.playerChoseOption.emit(choice)
    console.log(this.creature);
    
  }
}
