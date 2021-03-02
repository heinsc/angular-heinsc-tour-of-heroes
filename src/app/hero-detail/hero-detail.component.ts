import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../../services/hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {
    this.findHeroForIdInRoute();
  }
  @Input() hero: Hero;
  
  ngOnInit(): void {
    this.findHeroForIdInRoute();
  }

  findHeroForIdInRoute(): void {
    console.log("HeroDetailComponent#gindHeroForIdInRoute entered.");
    const id = +this.route.snapshot.paramMap.get('id');
    console.log("HeroDetailComponent#gindHeroForIdInRoute, id = " + id);
    this.heroService.getHero(id).subscribe(heroes => {this.hero = heroes[0]});
    console.log("HeroDetailComponent#findHeroForIdInRoute(), found hero = " + this.hero);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {

    this.heroService.updateHero(this.hero)
      .subscribe((result) => {
        alert(`${result} updated.`);
        this.goBack()
      });

  }
}
