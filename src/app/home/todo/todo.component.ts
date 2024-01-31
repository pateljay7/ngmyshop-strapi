import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from 'src/app/shared/services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todoList: [] = [];
  constructor(
    private todoService: TodoService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {}
  todoForm: FormGroup = this.formBuilder.group({});
  ngOnInit(): void {
    this.fetchTodos();
    this.setInintForm();
  }

  setInintForm() {
    this.todoForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
    });
  }

  fetchTodos() {
    this.todoService.fetchTodos().subscribe({
      next: (res: any) => {
        console.log('dat', res['data']);
        this.todoList = res['data'];
      },
      error: (error) => {
        this.toastrService.error(error.error);
      },
    });
  }

  onClickAddTodo() {
    console.log('data', {
      ...this.todoForm.value,
      dueDate: this.datePipe.transform(
        this.todoForm.value['dueDate'],
        'yyyy-MM-ddTHH:mm:ss.SSSZ'
      ),
    });
    this.todoService.addTodo(this.todoForm.value).subscribe({
      next: (res) => {
        this.fetchTodos();
      },
    });
  }
}
