import { Injectable } from '@angular/core'
import { IUser } from './user.model'
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router'

@Injectable()
export class AuthService implements CanActivate {
    currentUser:IUser

    constructor(private router:Router) {

    }

    loginUser(userName:string, password:string) {
        this.currentUser = {
            id: 1,
            userName: userName,
            firstName: 'John',
            lastName: 'Wick'
        }
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