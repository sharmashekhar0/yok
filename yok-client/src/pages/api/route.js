export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request) {
	return new Response("Hello, Next.js!", {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "http://3.110.207.87",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
}
