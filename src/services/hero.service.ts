import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../app/hero';
import { HEROES } from '../app/mock-heroes';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService: MessageService) { 
    this.messageService.add("HeroService initialized.");
  }

  getHeroes(): Observable<Hero[]> {
    const tempHeroes = of(HEROES);
    this.messageService.add("List of heroes requested.")
    return tempHeroes;
  }

  getHero(id): Observable<Hero> {
    const tempHero = HEROES.find(hero => hero.id === id);
    this.messageService.add("Single hero " + tempHero.name + " requested.");
    return of(tempHero);
  }
}
