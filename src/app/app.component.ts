import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FundListComponent } from './fund-list/fund-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FundListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-test';
}
