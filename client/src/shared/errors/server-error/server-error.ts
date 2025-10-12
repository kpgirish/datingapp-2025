import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiError } from '../../../types/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css'
})
export class ServerError {
  protected error: ApiError;
  private router = inject(Router);
  protected showDetails = false;

  constructor() {
    //const navigation = this.router.getCurrentNavigation();
    const navigation = this.router.lastSuccessfulNavigation;
    this.error = (navigation?.extras?.state?.['error'] ?? {
    statusCode: 500,
    message: 'An unexpected error occurred.',
    details: `To resolve the "An unexpected error occurred" issue you can try the following steps:
For Windows:
- Use the Network Adapter troubleshooter to diagnose and fix network issues.
- Update your network adapter drivers or remove and reinstall them.
- Turn off IPv6 for your adapter.
- Re-register the "netshell.dll" file.
- Reset TCP/IP to default settings.`
  }) as ApiError;
  }

  detailsToggle() {
    this.showDetails = !this.showDetails;
  }

}
