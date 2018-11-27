import { Component } from '@angular/core';
import { IUzivatel } from './shared/models/uzivatel.model';
import { SessionStorageService } from './shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private uzivatel : IUzivatel;
  title = 'WebClient';

  constructor(private sessionStorageService: SessionStorageService)
  { }

  currentUser(): IUzivatel {
    if(this.uzivatel == null){
      this.uzivatel = this.sessionStorageService.GetCurrentUser();
    }
    return this.uzivatel;
  }
}
