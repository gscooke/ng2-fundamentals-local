import { Injectable } from '@angular/core'
import { Resolve, ActivatedRouteSnapshot } from '@angular/router'
import { BlogService } from './shared/index'

@Injectable()
export class EntryListResolver implements Resolve<any> {
    constructor(private blogService:BlogService) {}
    
    resolve(route: ActivatedRouteSnapshot) {
        return this.blogService.getEntrys()
    }
}