import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../app/hero';
import { MessageService } from './message.service';
import  { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes';  // URL to web api

  constructor(
    private messageService: MessageService
    , private httpClient: HttpClient
  ) { 
    this.messageService.add("HeroService initialized.");
  }

  getHeroes(): Observable<Hero[]> {
    this.log("getHeroes() entered.");
    const tempHeroes = this.httpClient.get<Hero[]>(this.heroesUrl);
    this.log("getHeroes() - Heroes found: " + tempHeroes);
    this.messageService.add("List of heroes requested.")
    return tempHeroes;
  }

  getHero(id): Observable<Hero[]> {
    const url = `${this.heroesUrl}/?id=${id}`;
    const tempHeroesObservable = this.httpClient.get<Hero[]>(url);
    this.log("getHeroe() - Heroes found: " + tempHeroesObservable);
    return tempHeroesObservable;
  }

  log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
    console.log(`HeroService: ${message}`);
    
  }
}
