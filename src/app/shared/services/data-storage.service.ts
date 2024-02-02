import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient) {}

  fetchStatesByCountry(countryName: string) {
    return this.http
      .post('https://countriesnow.space/api/v0.1/countries/states', {
        country: countryName,
      })
      .pipe(
        map((res: any) => {
          return res.data.states.map((state: any) => state.name);
        })
      );
  }
  fetchCityByState(countryName: string, stateName: string) {
    return this.http
      .post('https://countriesnow.space/api/v0.1/countries/state/cities', {
        country: countryName,
        state: stateName,
      })
      .pipe(
        map((res: any) => {
          return res.data;
        })
      );
  }
}
