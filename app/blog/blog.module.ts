import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { HttpModule } from '@angular/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { blogRoutes } from './blog.routes'
import { BlogService } from './shared/index'
import { EntryListComponent } from './entry-list.component'
import { EntryThumbnailComponent } from './entry-thumbnail.component'
import { EntryListResolver } from './entry-list-resolver.service'

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(blogRoutes),
        HttpModule
    ],
    declarations: [
        EntryListComponent,
        EntryThumbnailComponent
    ],
    providers: [
        BlogService,
        EntryListResolver
    ]
})
export class BlogModule {

}