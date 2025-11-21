import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

@Component({
    selector: 'app-nav',
    imports: [FormsModule, RouterLink, RouterLinkActive],
    templateUrl: './nav.html',
    styleUrl: './nav.css',
})
export class Nav {
    protected accountService = inject(AccountService);
    protected toastService = inject(ToastService);
    private router = inject(Router);
    protected creds: any = {};

    login() {
        this.accountService.login(this.creds).subscribe({
            next: () => {
                this.toastService.success('Login successful');
                this.router.navigateByUrl('/members');
                this.creds = {};
            },
            error: (error) => {
                this.toastService.error(error.error);
                console.error('Login failed', error);
            },
            complete: () => {
                console.log('Login request completed');
            }
        });
    }

    logout() {
        this.accountService.logout();
        this.router.navigateByUrl('/');
    }
}
