import { DatePipe } from '@angular/common';
import {
  Component,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Todo } from 'src/app/shared/components/todo-details/todo-details.component';
import { TodoService } from 'src/app/shared/services/todo.service';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: 'asc',
  '': 'asc',
};

export interface SortEvent {
  column: string;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class NgbdSortableHeader {
  @Input() sortable: string = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  sortColoumn: string = 'title';
  sortDirection: string = 'asc';
  todoList: Todo[] = [];
  sortingParams: any = {};
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

  onSort({ column, direction }: any) {
    this.sortColoumn = column;
    this.sortDirection = direction;
    this.sortingParams['sort'] = `${this.sortColoumn}:${this.sortDirection}`;
    this.fetchTodos(this.sortingParams);
  }

  setInintForm() {
    this.todoForm = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      dueDate: new FormControl('', [Validators.required]),
    });
  }

  fetchTodos(params?:any) {
    this.todoService.fetchTodos(params).subscribe({
      next: (res: any) => {
        this.todoList = res['data'];
      },
      error: (error) => {
        this.toastrService.error(error.error);
      },
    });
  }

  onFilterChange(filter: any) {
    let filterParams = { ...this.sortingParams, ...filter };
    this.fetchTodos(filterParams);

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
