import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { IHotel } from 'src/app/models/hotel.model';
import { environment } from 'src/environments/environment';

declare let H: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() hotels!: IHotel[];
  @Input() center!: { lat: number, lng: number };

  @Output() markerClick: EventEmitter<IHotel> = new EventEmitter();

  @ViewChild('map')
  public mapElement!: ElementRef;

  private map: any;

  public constructor() {}

  @HostListener('window:resize', ['$event'])
  resize() {
    this.map.getViewPort().resize();
  }

  public ngOnInit(): void {}

  ngOnChanges(simpleChanges: SimpleChanges): void {
    if (this.map && this.hotels) {
      this.addMarkersAndSetViewBounds(this.hotels);
    }

    if (this.map && simpleChanges.center) {
      this.map.setCenter(this.center)
    }
  }

  private addMarkersAndSetViewBounds(hotels: IHotel[]) {
    this.map.removeObjects(this.map.getObjects());
    const group = new H.map.Group();
    const markers: any[] = [];

    hotels.forEach((hotel: IHotel) => {
      const { position } = hotel;

      const marker = new H.map.Marker(position, {
        icon: new H.map.Icon(
          `assets/icons/${hotel.active ? 'home-icon-active' : 'home-icon'}.svg`
        ),
      });
      marker.setData(hotel);
      marker.addEventListener('pointerdown', this.onMarkerClick.bind(this));
      markers.push(marker);
    });

    group.addObjects(markers);
    this.map.addObject(group);
  }

  private onMarkerClick(event: any): void {
    const { data } = event.target;
    
    this.markerClick.emit(data);
  }

  public ngAfterViewInit(): void {
    if (!this.map) {
      this.initMap();
    }
  }

  private initMap(): void {
    let platform = new H.service.Platform({
      apikey: environment.apiKey,
    });
    let defaultLayers = platform.createDefaultLayers();

    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.vector.normal.map,
      {
        center: this.center,
        zoom: 15,
      }
    );

    const behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );
  }
}
