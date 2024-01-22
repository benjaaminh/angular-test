import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FundListComponent } from './fund-list/fund-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FundListComponent],//import the fundList component
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Fund display';
}
