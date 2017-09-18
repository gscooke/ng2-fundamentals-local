import { Injectable, EventEmitter } from '@angular/core'
import { Subject, Observable } from 'rxjs/Rx'
import { IEntry, IMapReference } from './blog.model'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class BlogService {

  constructor(private http: Http) {}

    getEntrys():Observable<IEntry[]> {
      return this.http.get("http://localhost:5000/api/entry").map((response: Response) => {
        return <IEntry[]>response.json()
      }).catch(this.handleError)


      // let subject = new Subject<IEvent[]>()
      // setTimeout(() => {subject.next(EVENTS); subject.complete();}, 100)
      // return subject
    }
    
    getEntry(friendlyUrl:string):Observable<IEntry> {
      return this.http.get("http://localhost:5000/api/entry/" + friendlyUrl).map((response: Response) => {
        return <IEntry>response.json()
      }).catch(this.handleError)

      // return EVENTS.find(event => event.id == id)
    }

    saveEntry(event): Observable<IEntry> {
      let headers = new Headers({ 'Content-Type':'application/json'})
      let options = new RequestOptions({ headers: headers })

      return this.http.post('/api/events', JSON.stringify(event), options).map((response: Response) => {
        return response.json()
      }) // Note that JSON.stringify is optional in later versions of angular
    }

    searchSessions(searchTerm: string) {
      return this.http.get("/api/sessions/search?search=" + searchTerm).map((response: Response) => {
        return response.json()
      }).catch(this.handleError)
    }

    private handleError(error:any) {
      //return Observable.throw(error.statusText)

      // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
