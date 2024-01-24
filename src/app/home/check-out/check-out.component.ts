import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}
  checkOutForm:FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    this.setForm();
  }

  setForm() {
    this.checkOutForm = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      address: new FormControl('', [Validators.required]),
    });
  }

  onCheckOutSubmit() {
    console.log('Form', this.checkOutForm.value);
  }
}
