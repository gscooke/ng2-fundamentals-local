import { ProfileComponent } from './profile.component'
import { LoginComponent } from './login.component'
import { AuthService } from './auth.service'

export const userRoutes = [
    { path: 'profile', component: ProfileComponent, canActivate: [AuthService] },
    { path: 'login', component: LoginComponent }
]