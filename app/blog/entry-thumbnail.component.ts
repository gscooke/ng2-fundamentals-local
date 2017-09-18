import { Component, Input } from '@angular/core'
import { IEntry } from './shared/index'

@Component({
    selector: 'entry-thumbnail',
    templateUrl: 'app/blog/entry-thumbnail.component.html',
    styleUrls: ['app/blog/entry-thumbnail.component.css']
})

export class EntryThumbnailComponent {
    @Input() entry:IEntry
}