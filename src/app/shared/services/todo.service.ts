import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  URL = 'http://localhost:1337';
  constructor(private http: HttpClient) {}

  fetchTodos(params?: any) {
    return this.http.get(`${this.URL}/api/todos`, {
      params,
    });
  }

  addTodo(data: { title: string; description: string; dueDate: Date }) {
    return this.http.post(`${this.URL}/api/todos`, { data });
  }
  deleteTodo(id: any) {
    return this.http.delete(`${this.URL}/api/todos/${id}`);
  }
  updateTodo(
    id: any,
    data: { title: string; description: string; dueDate: Date }
  ) {
    return this.http.put(`${this.URL}/api/todos/${id}`, { data });
  }
}
