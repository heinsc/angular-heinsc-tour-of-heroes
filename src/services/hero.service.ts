import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../app/hero';
import { HEROES } from '../app/mock-heroes';
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
    const tempHeroes = this.httpClient.get<Hero[]>(this.heroesUrl);
    this.messageService.add("List of heroes requested.")
    return tempHeroes;
  }

  getHero(id): Observable<Hero> {
    let tempHeroes: Hero[];
    this.getHeroes().subscribe(heroes => { tempHeroes =  heroes});
    const tempHero = tempHeroes.find(hero => hero.id === id);
    this.messageService.add("Single hero " + tempHero.name + " requested.");
    return of(tempHero);
  }
}
