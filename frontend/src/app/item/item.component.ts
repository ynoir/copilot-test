import { Component, Input, OnInit } from '@angular/core';
import { Todo, TodoStore } from '../store';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() todo!: Todo;

  constructor(private todoStore: TodoStore) { }

  onToggle(todo: Todo): void {
    this.todoStore.update(state => {
      return {
        todos: state.todos.map(item => {
          if (item.title === todo.title) {
            return {
              ...item,
              done: !item.done,
            };
          }
          return item;
        }),
      };
    });
  }

  onEdit(todo: Todo) {
    const newTitle = prompt('Edit todo', todo.title);
    if (newTitle) {
      this.todoStore.update(state => {
        return {
          todos: state.todos.map(item => {
            if (item.title === todo.title) {
              return {
                ...item,
                title: newTitle,
              };
            }
            return item;
          }),
        };
      });
    }
  }

  onDelete(todo: Todo): void {
    this.todoStore.update(state => {
      return {
        todos: state.todos.filter(item => item !== todo),
      };
    });
  }

}
