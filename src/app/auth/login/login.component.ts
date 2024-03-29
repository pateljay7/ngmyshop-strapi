import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  loginForm: FormGroup = this.formBuilder.group({});

  ngOnInit(): void {
    if (this.authService.isValidUser()) {
      this.router.navigate(['../']);
      return;
    }
    this.loginForm = this.formBuilder.group({
      identifier: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLoginSubmit() {
    console.log('Login', this.loginForm.value);
    this.authService.userLogin(this.loginForm.value).subscribe({
      next: (data) => {
        this.toastrService.success('Welcome back !');
        this.router.navigate(['']);
      },
      error: (error) => {
        console.log(error);

        this.toastrService.error(error.error.error.message);
      },
    });
  }
}
