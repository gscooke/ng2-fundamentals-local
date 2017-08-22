import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router'
import { Subject, Observable } from 'rxjs/RX'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Injectable()
export class AuthService implements CanActivate {
    currentUser:IUser

    constructor(private router:Router, private http: Http) { }

    loginUser(userName:string, password:string) {
        let headers = new Headers({ 'Content-Type':'application/json'})
        let options = new RequestOptions({ headers: headers })
        let loginInfo = { username: userName, password: password }

        // By using .do in the request below, the function will run and we can respond based on the result.
        // In this case, we cast the response to currentUser, and if an error occurs we return a new Observable value false
        return this.http.post('/api/login', loginInfo, options).do(resp => {
            if(resp) {
                this.currentUser = <IUser>resp.json().user
            }
        }).catch(error => {
            return Observable.of(false)
        })
    }

    isAuthenticated() {
        return !!this.currentUser;
    }

    updateCurrentUser(firstName:string, lastName:string) {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
    }
    
    canActivate(route:ActivatedRouteSnapshot) {
        const userAuthenticated = !!this.isAuthenticated()

        if (!userAuthenticated)
            this.router.navigate(['/user/login'])

        return userAuthenticated
    }
}