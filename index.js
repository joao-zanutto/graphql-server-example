const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGO_URL } = require('./config');
const Post = require('./models/Post');

const typeDefs = gql`
	type Post {
		id: ID!
		body: String!
		createdAt: String!
		username: String!
	}

	type Query {
		getPosts: [Post]
	}
`;

const resolvers = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find();
				return posts;
			} catch (err) {
				throw new Error(err);
			}
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

mongoose
	.connect(MONGO_URL, { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to MongoDB');
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	});
