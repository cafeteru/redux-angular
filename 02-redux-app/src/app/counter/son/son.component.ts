import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-son',
  templateUrl: './son.component.html',
  styleUrls: ['./son.component.css']
})
export class SonComponent implements OnInit {

  @Input() counter: number;
  @Output() numberEmitter: EventEmitter<number>;

  constructor() {
    this.numberEmitter = new EventEmitter();
  }

  ngOnInit(): void {
  }

  multiply(): void {
    this.counter *= 2;
    this.numberEmitter.emit(this.counter);
  }

  divide(): void {
    this.counter /= 2;
    this.numberEmitter.emit(this.counter);
  }

}
