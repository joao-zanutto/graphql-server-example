const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');

const { MONGO_URL } = require('./secret');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => ({ req }),
});

mongoose
	.connect(MONGO_URL, { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to MongoDB');
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	});
