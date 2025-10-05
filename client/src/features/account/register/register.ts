import { Component, inject, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds, user } from '../../../types/user';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private accountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds

  register() {
    this.accountService.register(this.creds).subscribe({
      next: response => {
        console.log(response);
        console.log(this.creds);
        this.regcancel();
      },
      error: err => {
        console.log(err)
      },
    })
  }

  regcancel() {
    console.log("Register form cancelled!..01");
    this.cancelRegister.emit(false);
    console.log("Register form cancelled!..03");
  }
}
