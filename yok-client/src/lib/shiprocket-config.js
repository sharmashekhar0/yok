import axios from "axios";

let token = "";
async function generateShiprocketToken() {
	try {
		if (!token) {
			const data = JSON.stringify({
				email: process.env.NEXT_PUBLIC_SHIPROCKET_EMAIL,
				password: process.env.NEXT_PUBLIC_SHIPROCKET_PASSWORD,
			});

			const config = {
				method: "post",
				maxBodyLength: Infinity,
				url: "https://apiv2.shiprocket.in/v1/external/auth/login",
				headers: {
					"Content-Type": "application/json",
				},
				data: data,
			};

			const response = await axios(config);
			token = response.data.token; // Assuming the token is available in the response data
			console.log("Login successful. Token:", token);
		}

		return token;
	} catch (error) {
		console.error("Error occurred during login:", error);
		throw error; // Propagate the error
	}
}

export default generateShiprocketToken;
