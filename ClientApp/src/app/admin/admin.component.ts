import { Family, Creature } from './../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  families: Family[] = [];
  creatures: Creature[] = [];
  allCreatures: Creature[] = [];
  newCreature: NewCreature  = {id: 0, displayId: 0, name: '', imageUrl: '', attack: 0};

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.families.subscribe((data: any) => {
      this.families = data;
    });
    this.adminService.creatures.subscribe((data: any) => {
      this.creatures = data;
    }); 
    this.adminService.allCreatures.subscribe((data: any) => {
      this.allCreatures = data;
    });
  }

  selectFamily(familyName: string) {
    this.adminService.getCreaturesForFamily(familyName);
  }

  selectCreature(creatureId: number) {
    let tempCreature = this.creatures.find(c => c.id === creatureId);

    this.newCreature.id = tempCreature?.id ? tempCreature.id : 0;
    this.newCreature.displayId = tempCreature?.displayId ? tempCreature.displayId : 0;
    this.newCreature.name = tempCreature?.name ? tempCreature.name : '';
    this.newCreature.imageUrl = tempCreature?.imageUrl ? tempCreature.imageUrl : '';
    this.newCreature.attack = tempCreature?.attack ? tempCreature.attack : 0;
  }

  addNewCreature() {
    this.adminService.addNewCreature(this.newCreature).subscribe(
      (data: any) => {
        alert('New creature added!');
        this.newCreature = {id: 0, displayId: 0, name: '', imageUrl: '', attack: 0};
      },
      (error: any) => {
        alert("Attack " + this.newCreature.attack + " is already taken!");
      }
    );
  }
}

export interface NewCreature {
  id: number;
  displayId: number;
  name: string;
  imageUrl: string;
  attack: number;
}
