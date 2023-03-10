import type { Comment } from '@prisma/client';
//import { array } from 'zod';

export interface extendedComment extends Comment {
	childComments: Comment[] | null;
}

export class CommentTree {
	public masterComment: extendedComment;
	public parentCommentId: number | null;
	public childComments = [] as CommentTree[];
	public level = 0;
	constructor(newComment: Comment) {
		// Comment is a type from @prisma/client
		this.masterComment = newComment as extendedComment;
		this.parentCommentId = newComment.parentId;
		this.childComments = [];
		this.level = 0;
	}

	addChildComment(childComment: CommentTree) {
		this.childComments.push(childComment);
	}

	static buildCommentGraph(commentsArr: extendedComment[]) {
		const commentMap = new Map<number, CommentTree>();
		const commentGraph: CommentTree[] = [];

		// Create a map of comments indexed by comment ID
		for (const comment of commentsArr) {
			commentMap.set(comment.id, new CommentTree(comment));
		}

		// Add child comments to their parent comment
		for (const comment of commentMap.values()) {
			const parentCommentId = comment.parentCommentId;
			if (parentCommentId !== null) {
				const parentComment = commentMap.get(parentCommentId);
				if (parentComment) {
					parentComment.addChildComment(comment);
				}
			} else {
				commentGraph.push(comment);
			}
		}

		// Flatten the comment graph and assign level numbers
		let level = 0;
		const flattenedComments: CommentTree[] = [];

		const flattenComment = (comment: CommentTree) => {
			comment.level = level;
			flattenedComments.push(comment);
			level++;
			for (const childComment of comment.childComments) {
				flattenComment(childComment);
			}
			level--;
		};

		for (const comment of commentGraph) {
			flattenComment(comment);
		}

		return flattenedComments;
	}
}
