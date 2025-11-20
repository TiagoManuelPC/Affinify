import { AccountService } from './../core/services/account-service';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { Home } from '../features/home/home';
import { User } from '../types/users';

// import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [Nav, Home],
	templateUrl: './app.html',
	styleUrl: './app.css'
})
export class App implements OnInit {
    private accountService = inject(AccountService);
	private http = inject(HttpClient);
	protected readonly title = signal('angular');
	protected members = signal<User[]>([]);

	async ngOnInit() {
		this.members.set(await this.getMembers());
        this.settleCurrentUser();
	}

    settleCurrentUser() {
        const userString = localStorage.getItem('user');
        if(!userString) return;

        this.accountService.currentUser.set(JSON.parse(userString));
    }

	async getMembers() {
		try {
			return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
		} catch (error) {
			console.error('Error fetching members:', error);
			throw error;
		}
	}
}
