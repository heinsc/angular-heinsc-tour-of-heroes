import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  
  constructor(
    private heroService: HeroService
  ) {
    this.findHeroes();
  }

  findHeroes() : void {
    this.heroService.getHeroes().subscribe(heroes => {this.heroes = heroes});
      console.log("HeroesComponent#findHeroes(), found heroes = " + this.heroes);
  }
  deleteHero(hero : Hero) : void {
    return this.heroService.delete(hero)
     .subscribe(hero => {
        alert(`Hero ${hero} deleted.`);
  
    }
  ngOnInit() {
    this.findHeroes();
  }

}