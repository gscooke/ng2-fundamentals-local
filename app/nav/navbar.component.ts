import { Component } from '@angular/core'
import { AuthService } from '../user/auth.service'
import { ISession, EventService } from '../events/index'

@Component({
    selector: 'nav-bar',
    templateUrl: 'app/nav/navbar.component.html',
    styleUrls: ['app/nav/navbar.component.css']
})

export class NavBarComponent {
    searchTerm: string = ""
    foundSessions: ISession[]

    constructor(private auth:AuthService, private eventService:EventService) {

    }

    searchSessions(searchTerm) {
        this.eventService.searchSessions(searchTerm).subscribe(
            sessions => { 
                this.foundSessions = sessions 
            })
    }
}