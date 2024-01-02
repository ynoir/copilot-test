import { Component, OnInit } from '@angular/core';
import { TodoQuery } from './query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  protected selectedTab = 0;

  constructor(private todoQuery: TodoQuery) {}

  ngOnInit() {
    this.todoQuery.select().subscribe(todoState => {
      localStorage.setItem('todoState', JSON.stringify(todoState));
    });
  }

  selectTab(tab: number): void {
    this.selectedTab = tab;
  }

  isTabSelected(tab: number): boolean {
    return this.selectedTab === tab;
  }

}
