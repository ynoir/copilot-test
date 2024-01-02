import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface Todo {
    title: string;
    done: boolean;
}

export interface TodoState {
    todos: Todo[];
}

export function createInitialState(): TodoState {
    const storedState = localStorage.getItem('todoState');
    if (storedState) {
        return JSON.parse(storedState);
    } else {
        return {
            todos: [],
        };
    }
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todo' })
export class TodoStore extends Store<TodoState> {
    constructor() {
        super(createInitialState());
    }
}
