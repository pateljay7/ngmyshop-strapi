import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFilterBarComponent } from './todo-filter-bar.component';

describe('TodoFilterBarComponent', () => {
  let component: TodoFilterBarComponent;
  let fixture: ComponentFixture<TodoFilterBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoFilterBarComponent]
    });
    fixture = TestBed.createComponent(TodoFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
