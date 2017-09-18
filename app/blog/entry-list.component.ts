import { Component, OnInit } from '@angular/core'
import { BlogService, IEntry } from './shared/index'
import { ActivatedRoute } from '@angular/router'
import { Http, Response, Headers, RequestOptions } from '@angular/http'

@Component({
    template: `
        <div>
            <h1>Blog Entries</h1>
            <hr>
            <div class="row">
                <div *ngFor="let entry of entrys" class="col-md-5">
                    <entry-thumbnail [entry]="entry"></entry-thumbnail>
                </div>
            </div>
        </div>
    `
})

export class EntryListComponent implements OnInit {
    entrys:IEntry[]

    constructor(private blogService: BlogService, private route:ActivatedRoute, private http: Http) {
    }

    ngOnInit() {
        this.entrys = this.route.snapshot.data['entrys']
        
        // this.blogService.getEntrys().subscribe(
        //     entrys => {
        //         this.entrys = entrys
        //     })
    }
}