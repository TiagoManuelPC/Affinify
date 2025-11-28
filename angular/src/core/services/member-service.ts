import { MemberParams } from './../../types/member';
import { PaginatedResult } from './../../types/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, Pipe } from '@angular/core';
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

    getMembers(memberParams: MemberParams) {
        let params = new HttpParams();

        params = params.append('pageNumber', memberParams.pageNumber);
        params = params.append('pageSize', memberParams.pageSize);
        params = params.append('minAge', memberParams.minAge);
        params = params.append('maxAge', memberParams.maxAge);
        params = params.append('orderBy', memberParams.orderBy);

        if (memberParams.gender) {
            params = params.append('gender', memberParams.gender);
        }

        return this.http.get<PaginatedResult<Member>>(this.apiUrl + 'members', { params }).pipe(
            tap(() => {
                localStorage.setItem('filters', JSON.stringify(memberParams));
            })
        );
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

    uploadPhoto(file: File) {
        const formData = new FormData();
        formData.append('file', file);
        return this.http.post<Photo>(this.apiUrl + 'members/add-photo', formData);
    }

    setMainPhoto(photo: Photo) {
        return this.http.put(this.apiUrl + `members/set-main-photo/${photo.id}`, {});
    }

    deletePhoto(photoId: number) {
        return this.http.delete(this.apiUrl + `members/delete-photo/${photoId}`);
    }
}
