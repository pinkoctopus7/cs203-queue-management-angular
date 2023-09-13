import { Component, Output, EventEmitter, Input, OnInit, AfterViewInit } from '@angular/core';
import { Form, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { GetUserInfoService } from 'src/app/shared/services/get-user-info/get-user-info.service';

@Component({
  selector: 'app-group-register-invite',
  templateUrl: './group-register-invite.component.html',
  styleUrls: ['./group-register-invite.component.scss'],
})
export class GroupRegisterInviteComponent implements AfterViewInit {
  @Input('inviteeList') invitees: FormControl[][];
  @Output('userID') userIDEvent!: EventEmitter<number | undefined>;

  inviteeVerified: boolean[] = [true, true, true];
  constructor(private getUserInfoService: GetUserInfoService) {}

  ngAfterViewInit(): void {
    if (!this.invitees) return;
    for (let idx = 0; idx < this.invitees.length; ++idx) {
      // Subscribe to all form value changes
      this.invitees[idx][0].valueChanges.subscribe((value) => {
        this.inviteeDetailsValidation(idx);
      });
      this.invitees[idx][1].valueChanges.subscribe((value) => {
        this.inviteeDetailsValidation(idx);
      });
    }
  }

  verifyUser(idx: number): boolean {
    return (
      this.invitees[idx][0].value != '' || this.invitees[idx][1].value != ''
    );
  }

  async inviteeDetailsValidation(inviteeNum: number): Promise<void>{
    if (this._inputIsEmpty(inviteeNum) || !this._inputIsValid(inviteeNum)) {
      this.inviteeVerified[inviteeNum] = false;
      // this.userIDEvent.emit(undefined);
      return;
    }

    await this.getUserInfoService
      .getUserID(
        this.invitees[inviteeNum][0].value,
        this.invitees[inviteeNum][1].value
      )
      .then((userID: number | undefined) => {
        this.inviteeVerified[inviteeNum] = userID != undefined;
        this.userIDEvent.emit(userID);
      });
  }

  private _inputIsValid(inviteeNum: number): boolean {
    return (
      this.invitees[inviteeNum][0].valid && this.invitees[inviteeNum][1].valid
    );
  }

  private _inputIsEmpty(inviteeNum: number): boolean {
    return (
      this.invitees[inviteeNum][0].value == '' ||
      this.invitees[inviteeNum][1].value == ''
    );
  }
}