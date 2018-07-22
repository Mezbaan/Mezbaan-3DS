import { Component, ViewEncapsulation, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Venue } from '../../shared/venue.model';
import { Reservation } from '../../../reservation/shared/reservation.model';
import { HelperService } from '../../../shared/service/helper.service';
import { ReservationService } from '../../../reservation/shared/reservation.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../../../user/shared/user.service';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import * as moment from 'moment';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-venue-detail-reservation',
  templateUrl: './venue-detail-reservation.component.html',
  styleUrls: ['venue-detail-reservation.component.scss'],
  providers: [ FormBuilder ]
})

export class VenueDetailReservationComponent implements OnInit {
  @Input() public venue: Venue;

  private myForm: FormGroup;

  public datePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'yyyy-mm-dd',
    firstDayOfWeek: 'mo',
    sunHighlight: true,
    inline: false,
    disableUntil: {year: 2016, month: 8, day: 10}
  };

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
              private formBuilder: FormBuilder,
              public auth: UserService ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  private checkForInvalidDates(date) {
    return this.takenDates.includes(date.format('Y-MM-DD')) || date.diff(moment(), 'days', true) <= 0;
  }

  public ngOnInit() {
    this.newReservation = new Reservation();
    this.myForm = this.formBuilder.group({
        //myDate: [null, Validators.required]   // not initial date set
        //myDate: [{jsdate: new Date()}, Validators.required] // initialize today with jsdate property
        myDate: [{date: {year: 2018, month: 7, day: 22}}, Validators.required]   // this example is initialized to specific date
    });
  }

  public onDateChanged(event: IMyDateModel) {
    this.newReservation.date = event.formatted;
    this.newReservation.price = this.venue.individualRate;
  }

  public confirmReservation(reservationModal) {
    this.newReservation.venue = this.venue;

    this.reservationService.makeReservation(this.newReservation).subscribe(data => {
      this.newReservation = new Reservation();

      this.toastr.success('Reservation succesfully created, you can check your reservation details in arrange section', 'Success!');
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
