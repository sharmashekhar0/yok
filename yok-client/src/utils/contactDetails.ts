import axios from "axios";

let contactDetails: any = {};

// Function to fetch contact details
const fetchContactDetails = async () => {
	try {
		const response = await axios.get("/api/find-us-here/get");
		contactDetails = response?.data?.data[0];
		console.log("Contact Details from API :: ", contactDetails);
		return contactDetails;
	} catch (error) {
		console.error("Error fetching contact details:", error);
		throw error;
	}
};

// Initialize fetching and store the promise
const contactDetailsPromise = fetchContactDetails();

export { fetchContactDetails, contactDetailsPromise };
