const checkAuth = require('../../utils/checkAuth');
const Post = require('../../models/Post');

// Defines specific Queries and Mutations for Posts objects that will be
//   made available for the API user
module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find();
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},

		async getFirstPost() {
			try {
				const post = await Post.findOne();
				return post;
			} catch (err) {
				throw new Error(err);
			}
		},

		async getPost(_, { postId }) {
			try {
				const post = await Post.findById(postId);
				if (post) {
					return post;
				} else {
					throw new Error('Post not found');
				}
			} catch (err) {
				throw new Error(err);
			}
		},
	},
	Mutation: {
		async createPost(_, { body }, context) {
			const user = checkAuth(context);

			const newPost = new Post({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
			});

			const post = await newPost.save();

			return post;
		},
	},
};
