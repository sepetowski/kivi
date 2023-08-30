export interface SyncClientPostsContextType {
	deletedPostId: string | null;
	saveDeletedPostId: (id: string) => void;
}
