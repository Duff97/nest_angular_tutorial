import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'threads-app';
  userService = inject(UserService)
  constructor() {
    const user = this.userService.getUserFromStorage()
    if (!user) {
      const randomName = `user_${Math.ceil(Math.random() * 8000 + 1000)}`
      this.userService.createUser(randomName)
        .subscribe(user => {
          console.log('user create', user)
          this.userService.saveUserToStorage(user)
        })
    }
  }
}
