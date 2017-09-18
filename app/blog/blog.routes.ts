import { EntryListComponent } from './entry-list.component'
import { EntryListResolver } from './entry-list-resolver.service'

export const blogRoutes = [
    { path: 'entrys', component: EntryListComponent, resolve: {entrys:EntryListResolver} }
    //{ path: 'entry/:friendlyUrl', component: Event }
]