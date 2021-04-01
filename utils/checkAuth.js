const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');

const { SECRET_KEY } = require('../secret');

module.exports = (context) => {
	// context = { ...headers }
	const authHeader = context.req.headers.authorization;
	if (authHeader) { // Validate if authorization is present in request header
		const token = authHeader.split('Bearer ')[1]; // Extract auth header from Bearer format
		if (token) { // Validate if token is present
			try {
				const user = jwt.verify(token, SECRET_KEY); // Validate if token is valid
				return user;
			} catch (err) {
				throw new AuthenticationError('Invalid/Expired token');
			}
		}
		throw new Error("Authentication token must be 'Bearer [token]' ");
	}
	throw new Error('Authorization header must be provided ');
};
