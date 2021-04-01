const { gql } = require('apollo-server');

// Defines TYPES, MUTATIONS and QUERIES in GraphQL syntax and is used
//   by ApolloServer.
//  TYPES       -> are the 'custom' types used by our application, contain business rules
//  MUTATIONS   -> defines actions that will perform modification on our data
//  QUERIES     -> defines data retrieval from server

module.exports = gql`
	type Post {
		id: ID!
		body: String!
		createdAt: String!
		username: String!
	}

	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}

	input registerInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}

	type Query {
		getPosts: [Post]
		getPost(postId: ID!): Post
		getFirstPost: Post
	}

	type Mutation {
		register(registerInput: registerInput): User!
		login(username: String!, password: String!): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): String!
	}
`;
