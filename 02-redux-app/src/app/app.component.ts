import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  counter = 10;

  add(): void {
    this.counter += 1;
  }

  subtract(): void {
    this.counter -= 1;
  }
}
