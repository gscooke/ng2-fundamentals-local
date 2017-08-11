import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { RouterModule } from '@angular/router'

import { ToastrService } from './common/toastr.service'
import { appRoutes } from './routes'
import { Error404Component } from './errors/404.component'
import { NavBarComponent } from './nav/navbar.component'
import { AuthService } from './user/auth.service'

import { EventsAppComponent } from './events-app.component'

import { 
    EventsListComponent,
    EventThumbnailComponent, 
    EventService, 
    EventDetailsComponent, 
    CreateEventComponent, 
    EventRouteActivator, 
    EventListResolver,
    CreateSessionComponent,
    SessionListComponent } from './events/index'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        EventDetailsComponent,
        CreateEventComponent,
        NavBarComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent
    ], 
    providers: [
        EventService,
        ToastrService,
        EventRouteActivator,
        {
            provide: 'canDeactivateCreateEvent',
            useValue: checkDirtyState
        },
        EventListResolver,
        AuthService
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {}

function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty)
        return window.confirm('You have not saved this event, do you really want to cancel?')
    return true
}