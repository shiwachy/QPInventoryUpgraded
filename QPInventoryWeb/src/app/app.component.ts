import { Component, OnInit } from '@angular/core';
import { MainService } from './shared/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'QPInventoryWeb';
  constructor(private mainService:MainService){

  }
  ngOnInit(): void {
    this.mainService.getKeywordsList();
  }
}
