import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  baseUrl: string;
  highestScores = new BehaviorSubject<Score[]>([]);
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { 
    this.baseUrl = baseUrl;
  }

  getScore() {
    return this.http.get(this.baseUrl + 'api/HighestScore/getall').subscribe((data: any) => {
      this.highestScores.next(data);
    });
  }
}


export interface Score {
  id: number;
  name: string;
  score: number;
}