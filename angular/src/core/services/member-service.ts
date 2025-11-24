import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member, Photo } from '../../types/member';

@Injectable({
    providedIn: 'root',
})
export class MemberService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    getMembers() {
        return this.http.get<Member[]>(this.apiUrl + 'members');
    }

    getMember(id: string) {
        return this.http.get<Member>(this.apiUrl + 'members/' + id);
    }

    getMemberPhotos(id: string) {
        return this.http.get<Photo[]>(this.apiUrl + 'members/' + id + '/photos');
    }
}
