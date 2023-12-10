import { DocumentData } from "firebase/firestore/lite";

export interface SidebarProps {
	addNewChat?: boolean;
	id?: string;
	data?: DocumentData
	name?: string
}