import { inject } from '@angular/core/primitives/di';
import { MemberService } from './../../core/services/member-service';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { Member } from '../../types/member';

export const memberResolver: ResolveFn<Member> = (route, state) => {
    const memberService = inject(MemberService);
    const router = inject(Router);
    const memberId = route.paramMap.get('id')!;

    if(!memberId) {
        router.navigate(['/not-found']);
        return EMPTY;
    }

    return memberService.getMember(memberId);
};
