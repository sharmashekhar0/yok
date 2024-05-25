// pages/api/yourApiRoute.js

export async function GET(request) {
	const response = new Response("Hello, Next.js!", {
		status: 200,
		headers: {
			"Content-Type": "text/plain",
		},
	});

	// Apply the CORS middleware
	await new Promise((resolve, reject) => {
		corsMiddleware(request, response, (result) => {
			if (result instanceof Error) {
				return reject(result);
			}
			return resolve(result);
		});
	});

	return response;
}
