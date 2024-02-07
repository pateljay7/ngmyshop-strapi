import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  fetchTodos(params?: any) {
    return this.http.get(`${environment.BASE_URL}/api/todos`, {
      params,
    });
  }

  addTodo(data: { title: string; description: string; dueDate: Date }) {
    return this.http.post(`${environment.BASE_URL}/api/todos`, { data });
  }
  deleteTodo(id: any) {
    return this.http.delete(`${environment.BASE_URL}/api/todos/${id}`);
  }
  updateTodo(
    id: any,
    data: { title: string; description: string; dueDate: Date }
  ) {
    return this.http.put(`${environment.BASE_URL}/api/todos/${id}`, { data });
  }
}
