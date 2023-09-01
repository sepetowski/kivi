import { UserSearchHistory } from '@prisma/client';

export interface ExtenedSerachHistory extends UserSearchHistory {
	image: string | null | undefined;
	name: string | null | undefined;
	desc: string | null | undefined;

}
