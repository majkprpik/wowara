import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  families = new BehaviorSubject<Family[]>([]);
  creatures = new BehaviorSubject<Creature[]>([]);
  
  private baseUrl: string = '';
  private familyUrl: string =
    'https://us.api.blizzard.com/data/wow/creature-family/index?namespace=static-us&locale=en_US&access_token=EUfURerrbjX0DY02i0B1QZUessOZ9dl4Wq';
  private familiyImageUrl: string =
    'https://us.api.blizzard.com/data/wow/media/creature-family/$$$$?namespace=static-us&locale=en_US&access_token=EUfURerrbjX0DY02i0B1QZUessOZ9dl4Wq';
  private creatureUrl: string =
    'https://eu.api.blizzard.com/data/wow/search/creature?namespace=static-eu&name.en_US=$$$$&orderby=id&_page=1&access_token=EUfURerrbjX0DY02i0B1QZUessOZ9dl4Wq'
  private creatureImageUrl: string =
    'https://us.api.blizzard.com/data/wow/media/creature-display/$$$$?namespace=static-us&locale=en_US&access_token=EUfURerrbjX0DY02i0B1QZUessOZ9dl4Wq'
  
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
    this.initFamilies();
  }

  getAllFamilies() {
    return this.http.get(this.familyUrl);
  }

  getFamilyImage(id: number) {
    return this.http.get(this.familiyImageUrl.replace('$$$$', id.toString()));
  }

  initFamilies() {
    this.getAllFamilies().subscribe((data: any) => {
      this.families.next(data.creature_families);
      for (let index = 0; index < this.families.value.length; index++) {
        this.getFamilyImage(data.creature_families[index].id).subscribe(
          (data: any) => {
            this.families.value[index].imageUrl = data.assets[0].value;
            this.families.next(this.families.value);
          },
          (error: any) => {
            console.log(error);
          }
        );        
      }
    });
  }

  getCreaturesForFamily(name: string) {
    this.http.get(
      this.creatureUrl.replace('$$$$', name.replace(' ', '-'))
    ).subscribe((data: any) => {
      this.creatures.next(data.results.map((c: { data: { id: any; creature_displays: { id: any; }[]; name: { en_GB: any; }; }; }) => {return {id: c.data.id, displayId: c.data.creature_displays[0].id ,  name: c.data.name.en_GB}}));
      for (let index = 0; index < (this.creatures.value.length); index++) {
        this.getCreatureImage(this.creatures.value[index].displayId).subscribe(
          (data: any) => {
            this.creatures.value[index].imageUrl = data.assets[0].value;
            this.creatures.next(this.creatures.value);
          }
        );        
      }
    });
  }

  getCreatureImage(id: number) {
    return this.http.get(this.creatureImageUrl.replace('$$$$', id.toString()));
  }

  addNewCreature(creature: Creature) {
    return this.http.post(this.baseUrl + 'api/creature/create', creature);
  }
}

export interface Family {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Creature {
  id: number;
  displayId: number;
  name: string;
  imageUrl: string;
  attack: number;
}
