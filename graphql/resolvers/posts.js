const Post = require('../../models/Post');

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
	},
};
