import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  headername="Angular 14 Tutorial";
  salary=1000;

  isdiabled=true;

  colorname="blue";
  font="40px";

  classname='headclass'

  animals = ["cat", "dog", "rat", "bull", "Giraffe"]

  ngOnInit(): void {
  }
  FunctionClick(name:string){
    alert(name)
  }

}
