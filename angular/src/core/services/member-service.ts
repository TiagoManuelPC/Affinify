import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Member, Photo } from '../../types/member';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
    providedIn: 'root',
})
export class MemberService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;
    editMode = signal(false);
    member = signal<Member | null>(null);

    getMembers() {
        return this.http.get<Member[]>(this.apiUrl + 'members');
    }

    getMember(id: string) {
        return this.http.get<Member>(this.apiUrl + 'members/' + id).pipe(
            tap(member => this.member.set(member))
        );
    }

    getMemberPhotos(id: string) {
        return this.http.get<Photo[]>(this.apiUrl + 'members/' + id + '/photos');
    }

    updateMember(member: EditableMember) {
        return this.http.put(this.apiUrl + 'members', member);
    }
}
