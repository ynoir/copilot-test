import { Component, OnInit } from '@angular/core';
import { TodoQuery } from '../query';
import { Todo, TodoStore } from '../store';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  protected todos: Todo[] = [];
  protected showDone = false;
  protected newTodo: string = '';

  constructor(
    private todoQuery: TodoQuery,
    private todoStore: TodoStore,
  ) { }

  ngOnInit(): void {

    this.todoQuery.selectTodos().subscribe(todos => {
      this.todos = todos;
    });

  }

  getDoneTodos(): Todo[] {
    return this.todos.filter(todo => todo.done);
  }

  getNotDoneTodos(): Todo[] {
    return this.todos.filter(todo => !todo.done);
  }

  addTodo(): void {
    const existingTodo = this.todos.find(todo => todo.title === this.newTodo);
    if (existingTodo) {
      alert('Todo with the same title already exists');
      return;
    }

    this.todoStore.update(state => {
      return {
        todos: [
          ...state.todos,
          {
            title: this.newTodo,
            done: false,
          },
        ],
      };
    });
    this.newTodo = '';
  }

  getCompletedTodosCount(): number {
    return this.todos.filter(todo => todo.done).length;
  }

  clearCompleted(): void {
    this.todoStore.update(state => {
      return {
        todos: state.todos.filter(todo => !todo.done),
      };
    });
  }

}
