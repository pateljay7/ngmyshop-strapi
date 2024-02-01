import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
export interface Todo {
  id: number;
  attributes: Attributes;
}
export interface Attributes {
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  Status: string;
  Priority: String;
  user: User;
  counter: number;
}
export interface User {
  data: Data;
}
export interface Data {
  id: number;
  attributes: Attributes1;
}
export interface Attributes1 {
  username: string;
  email: string;
  provider: string;
  password: string;
  resetPasswordToken?: null;
  confirmationToken?: null;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
}

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css'],
})
export class TodoDetailsComponent implements OnChanges {
  @Input('todo') todo: Todo | null = null;
  todoForm: FormGroup = this.formBuilder.group({});
  constructor(
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private todoService: TodoService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.todoForm = this.formBuilder.group({
      title: this.todo?.attributes.title,
      description: this.todo?.attributes.description,
      dueDate: this.todo?.attributes.dueDate,
      isEdit: false,
    });
  }
  toggleEditMode() {
    let mode = this.todoForm.value['isEdit'];
    this.todoForm.patchValue({ isEdit: !mode });
  }

  onClickDeleteTodo() {
    this.todoService.deleteTodo(this.todo?.id).subscribe();
  }

  onClickSaveTodo() {
    this.todoService.updateTodo(this.todo?.id, this.todoForm.value).subscribe({
      next: (res) => {},
    });
  }
}
