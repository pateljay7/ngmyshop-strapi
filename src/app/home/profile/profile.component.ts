import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dataStorageService: DataStorageService
  ) {}
  profileForm: FormGroup | null = null;
  stateList: string[] = [];
  cityList: string[] = [];
  ngOnInit(): void {
    this.fetchAllStates();
    this.authService.userMe().subscribe({
      next: (res) => {
        if (res) {
          this.profileForm = this.formBuilder.group({
            username: new FormControl(res.username, [Validators.required]),
            email: new FormControl(res.email, [Validators.required]),
            mobile: new FormControl(res.mobile, [Validators.required]),
            createdAt: new FormControl(res.createdAt, [Validators.required]),
            updatedAt: new FormControl(res.updatedAt, [Validators.required]),
            address: new FormGroup({
              addressLine1: new FormControl(res.address.addressLine1 || '', [
                Validators.required,
              ]),
              addressLine2: new FormControl(res.address.addressLine2 || '', [
                Validators.required,
              ]),
              landmark: new FormControl(res.address.landmark || '', [
                Validators.required,
              ]),
              State: new FormControl(res.address.State || '', [
                Validators.required,
              ]),
              City: new FormControl(res.address.City || '', [
                Validators.required,
              ]),
              Pincode: new FormControl(res.address.Pincode || '', [
                Validators.required,
              ]),
            }),
          });
          this.fetchAllCities(res.address.State);
        }
      },
    });
  }

  fetchAllStates() {
    this.dataStorageService.fetchStatesByCountry('India').subscribe({
      next: (data) => {
        this.stateList = data;
      },
    });
  }

  fetchAllCities(state: any) {
    this.dataStorageService.fetchCityByState('India', state).subscribe({
      next: (data) => {
        this.cityList = data;
      },
    });
  }
}
