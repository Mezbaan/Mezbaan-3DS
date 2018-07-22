import { Component, ViewEncapsulation, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Venue } from '../../shared/venue.model';
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
  selector: 'bwm-venue-detail-reservation',
  templateUrl: './venue-detail-reservation.component.html',
  styleUrls: ['venue-detail-reservation.component.scss']
})
export class VenueDetailReservationComponent implements OnInit {
  @Input() public venue: Venue;
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
    const reservations: Reservation[] = this.venue.reservations;

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

  private computeReveravtionValues() {
    this.newReveravtion.days = this.helper.getRangeOfDates(this.newReveravtion.startAt, this.newReservation.endAt).length;
    this.newReservation.totalPrice = this.venue.individualRate;
  }

  private resetDatepicker() {
    this.picker.datePicker.setStartDate(new Date());
    this.picker.datePicker.setEndDate(new Date());
    this.picker.datePicker.element.val('');
  }

  public ngOnInit() {
    this.computeTakenDates();
    this.newReveravtion = new Reveravtion();
  }

  public selectedDate(value: any, datepicker?: any) {
    this.newReveravtion.startAt = moment(value.start).format('Y-MM-DD');
    this.newReveravtion.endAt = moment(value.end).format('Y-MM-DD');
    this.computeReveravtionValues();
    this.options.autoUpdateInput = true;
  }

  public confirmReveravtion(reveravtionModal) {
    this.newReveravtion.venue = this.venue;

    this.reveravtionService.makeReveravtion(this.newReveravtion).subscribe(data => {
      this.newReveravtion = new Reveravtion();
      this.fillTakenDates(data.startAt, data.endAt);
      this.resetDatepicker();
      this.toastr.success('Reveravtion succesfully created, you can check your reveravtion details in arrange section', 'Success!');
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
