
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  ViewChild,
} from '@angular/core';

import { ICoords } from 'src/app/models/coords.model';
import { environment } from 'src/environments/environment';

declare let H: any;

const BERLIN_COORDS: ICoords = {
  lat: 51.620008,
  lng: 13.404954,
} as const;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapComponent implements OnChanges, AfterViewInit {
  @Input() mapMarkerCoords!: ICoords[];

  @ViewChild('map')
  public mapElement!: ElementRef;

  private map: any;

  public constructor() {}

  @HostListener('window:resize', ['$event'])
  resize() {
    this.map.getViewPort().resize();
  }

  public ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.map && this.mapMarkerCoords) {
      this.addMarkersAndSetViewBounds(this.mapMarkerCoords);
    }
  }

  private addMarkersAndSetViewBounds(coords: ICoords[]) {
    const group = new H.map.Group();
    const markers: any[] = [];

    coords.forEach((coord: ICoords) =>
      markers.push(
        new H.map.Marker({ lat: coord.lat, lng: coord.lng }, { icon: new H.map.Icon(`assets/icons/${ coord.active ? 'home-icon-active' : 'home-icon'}.svg`) })
      )
    );

    group.addObjects(markers);
    this.map.addObject(group);

    this.map.getViewModel().setLookAtData({
      bounds: group.getBoundingBox(),
    });
  }

  public ngAfterViewInit(): void {
    this.initMap();
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
        center: BERLIN_COORDS,
        zoom: 7,
      }
    );

    const behavior = new H.mapevents.Behavior(
      new H.mapevents.MapEvents(this.map)
    );
  }
}
