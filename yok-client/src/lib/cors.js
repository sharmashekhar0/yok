// lib/cors.js

export default function corsMiddleware(req, res, next) {
	const allowedOrigin = "*";

	// Check if the header is already set
	if (!res.headersSent) {
		res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
		res.setHeader(
			"Access-Control-Allow-Methods",
			"GET, POST, PUT, DELETE, OPTIONS"
		);
		res.setHeader(
			"Access-Control-Allow-Headers",
			"Content-Type, Authorization"
		);
	}

	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}

	next();
}
