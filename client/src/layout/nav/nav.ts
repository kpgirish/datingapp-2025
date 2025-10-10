import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterModule } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
  protected accountService = inject(AccountService);
  private router = inject(Router)
  private toast = inject(ToastService);
  protected creds: any = {
    email: '',
    password: ''
  }

  login() {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/members');
        console.log('Login Success');
        this.toast.success('Login success.');
      },
      error: err => {
        console.log('Toast.error called..', err);
        this.toast.error(err.error);
      },
      complete: () => console.log('Login request completed...')
    });
    console.log(this.creds);
  }

  logout() {
    this.accountService.logout();
  }
}
