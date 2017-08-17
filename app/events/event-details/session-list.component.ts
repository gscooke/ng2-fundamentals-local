import { Component, Input, OnChanges } from '@angular/core'
import { ISession } from '../index'
import { VoterService } from './voter.service' // Note that this needs imported directly, rather from a barrel at the same level
import { AuthService } from '../../user/auth.service'

@Component({
    selector: 'session-list',
    templateUrl: 'app/events/event-details/session-list.component.html'
})
export class SessionListComponent implements OnChanges {
    @Input() sessions:ISession[]
    @Input() filterBy:string
    @Input() sortBy:string
    visibleSessions: ISession[] = []

    constructor(private auth: AuthService, private voterService: VoterService) {}

    ngOnChanges() {
        if (this.sessions) {
            this.filterSessions(this.filterBy)
            this.sortSessions(this.sortBy)
        }
    }

    toggleVote(session: ISession) {
        if(this.userHasVoted(session)) {
            this.voterService.deleteVoter(session, this.auth.currentUser.userName)
        } else {
            this.voterService.addVoter(session, this.auth.currentUser.userName)
        }

        if (this.sortBy === 'votes') {
            this.visibleSessions.sort(SortByVotesDesc)
        }
    }

    userHasVoted(session: ISession) {
        return this.voterService.userHasVoted(session, this.auth.currentUser.userName)
    }

    filterSessions(filter) {
        if(filter==='all') {
            this.visibleSessions = this.sessions.slice(0)
        } else {
            this.visibleSessions = this.sessions.filter(session => {
                return session.level.toLocaleLowerCase() === filter
            })
        }
    }

    sortSessions(sort) {
        if (sort === 'name') {
            return this.visibleSessions.sort(SortByNameAsc)
        }
        else {
            return this.visibleSessions.sort(SortByVotesDesc)
        }
    }
}

function SortByNameAsc(s1:ISession, s2:ISession) {
    if (s1.name > s2.name) return 1
        else if (s1.name === s2.name) return 0
            else return -1
}

function SortByVotesDesc(s1:ISession, s2:ISession) {
    return s2.voters.length - s1.voters.length
}