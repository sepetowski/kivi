export interface RefreshPostsContextType {
	deletedPostId: string | null;
	saveDeletedPostId: (id: string) => void;
}
