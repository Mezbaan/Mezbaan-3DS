import { Component, ViewEncapsulation, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Rental } from '../../shared/rental.model';
import { Reservation } from '../../../reservation/shared/reservation.model';
import { HelperService } from '../../../shared/service/helper.service';
import { ReservationService } from '../../../reservation/shared/reservation.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../user/shared/user.service';
import * as moment from 'moment';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-rental-detail-reservation',
  templateUrl: './rental-detail-reservation.component.html',
  styleUrls: ['rental-detail-reservation.component.scss']
})
export class RentalDetailReservationComponent implements OnInit {
  @Input() public rental: Rental;
  @ViewChild(DaterangePickerComponent)
  public picker: DaterangePickerComponent;

  public daterange: any = {};
  public takenDates: any = [];
  public newReservation: Reservation;
  public modalRef: any;
  public errors: any[];

  public options: any = {
      locale: { format: 'Y-MM-DD' },
      alwaysShowCalendars: false,
      opens: 'left',
      isInvalidDate: this.checkForInvalidDates.bind(this),
      autoUpdateInput: false
  };

  constructor(public helper: HelperService,
              public modalService: NgbModal,
              public reservationService: ReservationService,
              public toastr: ToastsManager,
              public vcr: ViewContainerRef,
              public auth: UserService ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  private computeTakenDates() {
    const reservations: Reservation[] = this.rental.reservations;

    if (reservations && reservations.length) {
      reservations.forEach(reservation => {
        this.fillTakenDates(reservation.startAt, reservation.endAt);
      });
    }
    this.takenDates;
  }

  private fillTakenDates(startAt, endAt) {
    const range = this.helper.getRangeOfDates(startAt, endAt);

    range.forEach(date => {
      this.takenDates.push(date)
    });
    this.takenDates.push(moment(startAt).format('Y-MM-DD'));
    this.takenDates.push(moment(endAt).format('Y-MM-DD'));
  }

  private checkForInvalidDates(date) {
    return this.takenDates.includes(date.format('Y-MM-DD')) || date.diff(moment(), 'days', true) <= 0;
  }

  private computeReservationValues() {
    this.newReservation.days = this.helper.getRangeOfDates(this.newReservation.startAt, this.newReservation.endAt).length;
    this.newReservation.totalPrice = this.newReservation.days * this.rental.dailyRate;
  }

  private resetDatepicker() {
    this.picker.datePicker.setStartDate(new Date());
    this.picker.datePicker.setEndDate(new Date());
    this.picker.datePicker.element.val('');
  }

  public ngOnInit() {
    this.computeTakenDates();
    this.newReservation = new Reservation();
  }

  public selectedDate(value: any, datepicker?: any) {
    this.newReservation.startAt = moment(value.start).format('Y-MM-DD');
    this.newReservation.endAt = moment(value.end).format('Y-MM-DD');
    this.computeReservationValues();
    this.options.autoUpdateInput = true;
  }

  public confirmReservation(reservationModal) {
    this.newReservation.rental = this.rental;

    this.reservationService.makeReservation(this.newReservation).subscribe(data => {
      this.newReservation = new Reservation();
      this.fillTakenDates(data.startAt, data.endAt);
      this.resetDatepicker();
      this.toastr.success('Reservation succesfully created, you can check your reservation details in manage section', 'Success!');
      this.modalRef.close();
    }, (errorsResponse: HttpErrorResponse) => {
      this.errors = errorsResponse.error.errors;
    });
  }

  public openModal(content) {
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

}
