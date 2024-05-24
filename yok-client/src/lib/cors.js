// lib/cors.js
export default function corsMiddleware(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*, http://3.110.207.87/");

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);

	if (req.method === "OPTIONS") {
		res.status(200).end();
		return;
	}

	next();
}
