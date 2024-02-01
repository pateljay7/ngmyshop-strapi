import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todo-filter-bar',
  templateUrl: './todo-filter-bar.component.html',
  styleUrls: ['./todo-filter-bar.component.css'],
})
export class TodoFilterBarComponent implements OnInit {
  @Output() filterCalled = new EventEmitter();
  filterMapping = [
    { text: 'Equal', value: '$eq' },
    { text: 'Equal (case-insensitive)', value: '$eqi' },
    { text: 'Not equal', value: '$ne' },
    { text: 'Not equal (case-insensitive)', value: '$nei' },
    { text: 'Less than', value: '$lt' },
    { text: 'Less than or equal to', value: '$lte' },
    { text: 'Greater than', value: '$gt' },
    { text: 'Greater than or equal to', value: '$gte' },
    { text: 'Included in an array', value: '$in' },
    { text: 'Not included in an array', value: '$notIn' },
    { text: 'Contains', value: '$contains' },
    { text: 'Does not contain', value: '$notContains' },
    { text: 'Contains (case-insensitive)', value: '$containsi' },
    { text: 'Does not contain (case-insensitive)', value: '$notContainsi' },
    { text: 'Is null', value: '$null' },
    { text: 'Is not null', value: '$notNull' },
    { text: 'Is between', value: '$between' },
    { text: 'Starts with', value: '$startsWith' },
    { text: 'Starts with (case-insensitive)', value: '$startsWithi' },
    { text: 'Ends with', value: '$endsWith' },
    { text: 'Ends with (case-insensitive)', value: '$endsWithi' },
    { text: 'Joins the filters in an "or" expression', value: '$or' },
    { text: 'Joins the filters in an "and" expression', value: '$and' },
    { text: 'Joins the filters in a "not" expression', value: '$not' },
  ];
  constructor(private formBuilder: FormBuilder) {}
  filterForm: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.setInitForm();
  }
  setInitForm() {
    this.filterForm = this.formBuilder.group({
      title: new FormGroup({
        value: new FormControl(''),
        opt: new FormControl('$eqi'),
      }),
      description: new FormGroup({
        value: new FormControl(''),
        opt: new FormControl('$eqi'),
      }),
      Status: new FormGroup({
        value: new FormControl(''),
        opt: new FormControl('$eqi'),
      }),
      Priority: new FormGroup({
        value: new FormControl(''),
        opt: new FormControl('$eqi'),
      }),
    });
  }
  onApplyFilter() {
    let f: any = {};
    for (const key in this.filterForm.value) {
      let v = this.filterForm.value;
      if (v[key].value && v[key].opt) {
        f[`filters[${key}][${v[key].opt}]`] = v[key].value;
      }
    }
    this.filterCalled.emit(f);
  }
  onResetFilter() {
    this.filterCalled.emit({});
    this.setInitForm();
  }
}
