import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { IHotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.scss'],
})
export class HotelsListComponent implements OnInit, OnDestroy {
  @Input() hotels!: IHotel[];
  @Output() activeHotelChange: EventEmitter<IHotel> = new EventEmitter();
  @Output() bookHotel: EventEmitter<IHotel> = new EventEmitter();

  @ViewChild('hotelsList') hotelsList!: ElementRef;

  private activeItemIndex$: BehaviorSubject<number> = new BehaviorSubject(0);
  private destroy$: Subject<void> = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.onActiveItemIndexChange();
  }

  private onActiveItemIndexChange(): void {
    this.activeItemIndex$
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(index => {
        this.activeHotelChange.emit(this.hotels[index])
      })
  }

  public onScroll(): void {
    const { scrollLeft } = this.hotelsList.nativeElement as HTMLElement;
    const listItem = document.querySelector('.hotels-list > li');

    if (scrollLeft !== 0 && listItem?.clientWidth != null) {
      const itemIndex = Math.floor(scrollLeft / listItem.clientWidth);

      this.activeItemIndex$.next(itemIndex);
    }
  }

  public hotelId(index: number, item: IHotel) {
    return item.id;
  }

  public onBook(hotel: IHotel): void {
    this.bookHotel.emit(hotel);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
