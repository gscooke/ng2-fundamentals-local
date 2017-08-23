import { VoterService } from './voter.service'
import { ISession } from '../shared/index'
import { Observable } from 'rxjs/Rx'

describe('VoterService', () => {
    let voterService: VoterService, mockHttp

    beforeEach(() => {
        mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post'])
        voterService = new VoterService(mockHttp)
    })

    describe('deleteVoter', () => {
        it('should remove the voter from the list of voters', () => {
            var session = { id: 6, voters: ['Joe', 'John'] }
            mockHttp.delete.and.returnValue(Observable.of(false))

            voterService.deleteVoter(3, <ISession>session, 'Joe')

            expect(session.voters.length).toBe(1)
            expect(session.voters[0]).toBe('John')
        })

        it('should call http.delete with the right url'), () => {
            var session = { id: 6, voters: ['Joe', 'John'] }
            mockHttp.delete.and.returnValue(Observable.of(false))
            
            voterService.deleteVoter(3, <ISession>session, 'Joe')

            expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Joe')
        }
    })

    describe('addVoter', () => {
        it('should add the voter to the list of voters', () => {
            var session = { id: 6, voters: ['John'] }
            mockHttp.post.and.returnValue(Observable.of(false))

            voterService.addVoter(3, <ISession>session, 'Joe')

            expect(session.voters.length).toBe(2)
            expect(session.voters[1]).toBe('Joe')
        })

        it('should call http.post with the right url'), () => {
            var session = { id: 6, voters: ['John'] }
            mockHttp.post.and.returnValue(Observable.of(false))
            
            voterService.addVoter(3, <ISession>session, 'Joe')

            // Note that here we pass an empty body and we also pass headers. The headers are simple so just check that an object was sent
            expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Joe', '{}', jasmine.any(Object))
        }
    })
})