import { Component } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.css']
})
export class FinanceComponent {

  financeTabs: Array<{name: string, path: string}> = [
    { name: "Dashboard", path: "dashboard" },
    { name: "Records", path: "records" },
  ];

}
