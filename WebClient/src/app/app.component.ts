import { Component } from '@angular/core';
import { IUzivatel } from './shared/models/uzivatel.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})

export class AppComponent {
  public currentUser : IUzivatel;

  title = 'WebClient';
}
