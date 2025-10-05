import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css'
})
export class Nav {
protected accountService = inject(AccountService);
  protected creds: any ={
  email: '',
  password: ''
}

login(){
  this.accountService.login(this.creds).subscribe({
    next: response => console.log(response),
    error: err => alert(err.error),
    complete: () => console.log('Login request completed...')
  });
  console.log(this.creds);
}

logout(){
  this.accountService.logout();
}
}
