import { Component, OnInit } from '@angular/core';
import { ICoords } from './models/coords.model';
import { IHotel } from './models/hotel.model';
import { HotelsService } from './services/hotels.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'test-task';
  public hotels: IHotel[] = [];
  public coords: ICoords[] = [];

  constructor(
    private hotelsService: HotelsService,
  ) {}

  ngOnInit(): void {
    this.getHotels();
  }

  private getHotels() {
    this.hotelsService.getHotels().subscribe((hotels) => {
      this.hotels = hotels;
      this.setCoords(this.hotels);
    });
  }

  private setCoords(hotels: IHotel[]): void {
    this.coords = hotels.map(hotel => ({
      lat: hotel.position.lat,
      lng: hotel.position.lng,
      active: false
    }))
    this.coords[0].active = true;
  }
}
