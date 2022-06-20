import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  constructor(private http: HttpClient) {}

  public getHotels(): Observable<IHotel[]> {
    return this.http
      .get<{ items: IHotel[] }>('assets/static/hotels.json')
      .pipe(map((response) => response.items));
  }
}
