import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
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
) {}
  @Input() hero: Hero;

  ngOnInit(): void {
  }

}
