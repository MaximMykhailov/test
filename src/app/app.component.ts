import { Component, OnInit } from '@angular/core';
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
  public activeHotelPosition!: { lat: number, lng: number };
  public showModal = false;
  public hotelToBook!: IHotel;

  constructor(
    private hotelsService: HotelsService,
  ) {}

  ngOnInit(): void {
    this.getHotels();
  }

  private getHotels() {
    this.hotelsService.getHotels().subscribe((hotels) => {
      this.hotels = hotels.map((hotel, index) => ({ ...hotel, id: index, active: false }));
    });
  }

  public onMarkerClick(markerHotelData: IHotel): void {
    this.setHotelActive(markerHotelData);
    this.goToMarker(markerHotelData);
  }

  public setHotelActive(markerHotelData: IHotel): void {
    if (!markerHotelData) {
      return;
    }

    this.hotels = this.hotels.map((hotel) => hotel.id === markerHotelData.id ? { ...hotel, active: true } : { ...hotel, active: false });
    this.activeHotelPosition = markerHotelData.position;
  }

  private goToMarker(markerHotelData: IHotel): void {
    const list = document.querySelector('.hotels-list');
    const element = document.getElementById(`hotelCard-${markerHotelData.id}`);

    if (element && list) {
      list.scrollLeft = element.offsetLeft - 10;
    }
  }

  public onBookHotel(hotel: IHotel): void {
    this.openModal();
    this.hotelToBook = hotel;
  }

  public openModal(): void {
    this.showModal = true;
  }

  public closeModal(): void {
    this.showModal = false;
  }

}
