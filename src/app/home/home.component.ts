import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.styl']
})
export class HomeComponent implements OnInit {

  itemsCount: number = 4;

  constructor() { }

  ngOnInit() {
    console.log('init');
  }

  getFeed() {
    console.log('PING');
  }

}
