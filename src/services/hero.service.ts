import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from '../app/hero';
import { MessageService } from './message.service';
import  { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private messageService: MessageService
    , private httpClient: HttpClient
  ) { 
    this.messageService.add("HeroService initialized.");
  }

  getHeroes(): Observable<Hero[]> {
    this.log("getHeroes() entered.");
    const tempHeroes = this
      .httpClient
      .get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(paramOfTap => this.log(`heroes fetched - ${paramOfTap}` ))
        ,catchError(
          this.handleError<Hero[]>(
            'getHeroes()'
            , [
              { id: 11, name: 'Error requesting heroes (1)' },
              { id: 12, name: 'Error requesting heroes (2)' }
            ]
          )
        )
      );
    this.log("getHeroes() - Heroes found: " + tempHeroes);
    this.messageService.add("List of heroes requested.")
    return tempHeroes;
  }
handleError<T>(operation = "operation", result?: T)
  : (err: any,caught: Observable<T>) => import("rxjs")      .ObservableInput<T>
{
  return (err: any, caught: Observable<T>) => {
    // TODO: send the error to remote logging infrastructure
    console.error(`Error: ${err}, Caught: ${caught}`); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`getHeroes: ${operation} failed: ${err.message}`);

    // Let the app keep running by returning an empty result.
    return of (result as T);
  }
}

  getHero(id): Observable<Hero[]> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.httpClient.get<Hero[]>(url)      
    .pipe(
        tap(paramOfTap => this.log(`heroe fetched - ${paramOfTap}` ))
        ,catchError(
          this.handleError<Hero[]>(
            'getHeroes()'
            , [
              { id: 11, name: 'Error requesting hero' }
            ]
          )
        )
      );
  }
  updateHero(hero: Hero) : Observable<Hero[]> { 
    const localHeroesURL = this.heroesUrl + `/${hero.id}`;
    return this.httpClient.put(
      localHeroesURL, hero, this.httpOptions
    ).pipe(
      tap(
        paramOfTap => this.log(
          `updated hero id=${hero.id}, ${paramOfTap}`
        )
      ),  catchError(this.handleError<any>('updateHero'))
    );
  }
  addHero(hero: Hero) : Observable <Hero[]>{
    this.httpClient.post(this.heroesUrl, hero, this.httpOptions)
    .pipe(
      tap(
        paramOfTap => this.log(
          `inserted hero id=${hero.id}, ${paramOfTap}`
        )
      ), catchError(this.handleError<any>('insertHero'))
    )
    throw new Error('Method not implemented.');
  }
  log(message: String) {
    this.messageService.add(`HeroService: ${message}`);
    console.log(`HeroService: ${message}`);
    
  }
}
