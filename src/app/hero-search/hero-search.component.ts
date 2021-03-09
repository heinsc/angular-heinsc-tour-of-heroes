import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes: Hero[];

  constructor(private heroService: HeroService) { }

  search(searchString: String): void{

  }

  ngOnInit(): void {
  }

}
