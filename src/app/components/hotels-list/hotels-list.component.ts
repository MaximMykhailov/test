import { Component, Input, OnInit } from '@angular/core';
import { IHotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss']
})
export class HotelsListComponent implements OnInit {
  @Input() hotels!: IHotel[];

  constructor() { }

  ngOnInit(): void {
  }

}
