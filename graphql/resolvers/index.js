const postsResolvers = require('./posts');
const userResolvers = require('./users');

// Groups resolvers for QUERIES and MUTATIONS actions from our specific function files
module.exports = {
	Query: {
		...postsResolvers.Query,
	},

	Mutation: {
		...userResolvers.Mutation,
		...postsResolvers.Mutation,
	},
};
