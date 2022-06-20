import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IHotel } from 'src/app/models/hotel.model';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.scss'],
})
export class BookingFormComponent implements OnInit {
  @Input() hotel!: IHotel;
  @Output() closeModal: EventEmitter<void> = new EventEmitter();

  public form!: FormGroup;
  public showConfirmation = false;

  constructor() {}

  ngOnInit(): void {
    this.initFrom();
  }

  private initFrom(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      arrivalDate: new FormControl('', [Validators.required]),
      departureDate: new FormControl('', [Validators.required]),
    });
  }

  public openConfirmationModal(): void {
    if (!this.form.valid) {
      return;
    }

    this.showConfirmation = true;
  }

  public closeConfirmationModal(): void {
    this.showConfirmation = false;
  }

  public confirm(): void {
    this.closeModal.emit();
  }
}
