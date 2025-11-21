import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { Observable, of } from 'rxjs';
@Injectable({
    providedIn: 'root',
})
export class InitService {
    private accountService = inject(AccountService);

    init() {
        const userString = localStorage.getItem('user');
        if (!userString) return of(null);

        this.accountService.currentUser.set(JSON.parse(userString));

        return of(null);
    }
}
