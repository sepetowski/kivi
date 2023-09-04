import { Notifications } from "@prisma/client";

export interface Notify extends Notifications{
	image: string | null | undefined;
	name: string | null | undefined;

}