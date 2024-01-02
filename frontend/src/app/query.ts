import { Injectable } from '@angular/core';
import { Todo, TodoStore, TodoState } from './store';
import { Observable } from 'rxjs';
import { Query } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class TodoQuery extends Query<TodoState> {
    constructor(protected override store: TodoStore) {
        super(store);
    }

    selectTodos(): Observable<Todo[]> {
        return this.select(state => state.todos);
    }
}
