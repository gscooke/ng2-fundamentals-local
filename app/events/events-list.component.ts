import { Component, OnInit } from '@angular/core'
import { EventService, IEvent } from './shared/index'
import { ToastrService } from '../common/toastr.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    template: `
        <div>
            <h1>Upcoming Angular 2 Events</h1>
            <hr>
            <div class="row">
                <div *ngFor="let event of events" class="col-md-5">
                    <event-thumbnail [event]="event" (click)="handleThumbnailClick(event.name)"></event-thumbnail>
                </div>
            </div>
        </div>
    `
})

export class EventsListComponent implements OnInit {
    events:IEvent[]

    constructor(private eventService: EventService, private toastr: ToastrService, private route:ActivatedRoute) {
    }

    ngOnInit() {
        this.events = this.route.snapshot.data['events']
    }

    handleThumbnailClick(eventName) {
        this.toastr.success(eventName)
    }
}