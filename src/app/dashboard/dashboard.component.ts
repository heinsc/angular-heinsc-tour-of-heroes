import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.findHeroes();
  }

  findHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));
    console.log("DashboardComponent#getHeroes(), found heroes = " + this.heroes);

  }
}