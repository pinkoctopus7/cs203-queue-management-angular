import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreEventInfoService } from 'src/app/shared/services/store-event-info.service';

@Component({
  selector: 'app-group-registration',
  templateUrl: './group-registration.component.html',
  styleUrls: ['./group-registration.component.scss']
})
export class GroupRegistrationComponent {
  eventID!: number | undefined;
  userID!: number | undefined;
  groupID!: number | undefined;
  constructor(
    private storeEventInfoService: StoreEventInfoService,
    private router: Router
  ){}

  ngOnInit(): void {
   this.eventID = this.storeEventInfoService.eventInfo.eventID;
   this.userID = this.storeEventInfoService.eventInfo.userID;
   this.groupID = this.storeEventInfoService.eventInfo.groupID;
  }

  confirm(): void {
    // Save to DB

    // Route back to login
    this.router.navigate(['/events']);
  }
}