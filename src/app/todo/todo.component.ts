
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Todo {
   id: number;
   title: string;
   completed: boolean;
   isEditing: boolean;
}

@Component({
   selector: 'app-todo',
   standalone: true,
   imports: [FormsModule],
   templateUrl: './todo.component.html',
   styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
   newTodoTitle: string = '';
   todos: Todo[] = [];
   filteredTodos: Todo[] = [];
   filter: 'all' | 'active' | 'completed' = 'all';

   saveTodo() {
      if (this.newTodoTitle.trim()) {
         const newTodo: Todo = {
         id: Date.now(),
         title: this.newTodoTitle.trim(),
         completed: false,
         isEditing: false,
         };
         this.todos.push(newTodo);
         this.filterTodos(this.filter);
         this.newTodoTitle = '';
      }
      console.log(this.todos);
   }

   toggleEditTodo(id: number, isEditing: boolean): void {
      const todo = this.todos.find((todo: Todo) => todo.id === id);
      if (todo) {
         todo.isEditing = !isEditing;
      }
   }

   deleteTodo(id: number): void {
      this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
      this.filterTodos(this.filter);
   }

   filterTodos(filter: 'all' | 'active' | 'completed'): void {
      this.filter = filter;
      if (filter === 'all') {
         this.filteredTodos = this.todos;
      } else if (filter === 'active') {
         this.filteredTodos = this.todos.filter(
         (todo): todo is Todo => !todo.completed
         );
      } else if (filter === 'completed') {
         this.filteredTodos = this.todos.filter(
         (todo): todo is Todo => todo.completed
         );
      }
   }

   toggleTodoCompletion(id: number): void {
      const todo = this.todos.find((todo: Todo) => todo.id === id);
      if (todo) {
         todo.completed = !todo.completed;
         this.filterTodos(this.filter);
      }
   }

   // Getter para obtener el número de tareas completadas
   get completedCount(): number {
      // Filtra las tareas completadas y devuelve la longitud del arreglo resultante
      return this.todos.filter((todo: Todo) => todo.completed).length;
   }

   // Método para alternar el estado de completado de todas las tareas
   toggleAllTodos(): void {
      // Verifica si todas las tareas están completadas
      const allCompleted = this.todos.every((todo: Todo) => todo.completed);
      // Si todas están completadas, las marca como no completadas; de lo contrario, las marca como completadas
      this.todos.forEach((todo: Todo) => (todo.completed = !allCompleted));
      // Aplica el filtro actual para actualizar la lista de tareas mostradas
      this.filterTodos(this.filter);
   }

   // Método para eliminar todas las tareas completadas
   clearCompletedTodos(): void {
      // Filtra las tareas para eliminar aquellas que están completadas
      this.todos = this.todos.filter((todo): todo is Todo => !todo.completed);
      // Aplica el filtro actual para actualizar la lista de tareas mostradas
      this.filterTodos(this.filter);
   }
}
