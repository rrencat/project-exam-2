import { VENUES_URL } from "../../constants/api";

export async function createVenue(venueDetails) {
    const options = {
		headers: { "Content-Type": "application/json" },
		method: "POST",
		body: JSON.stringify(venueDetails),
	};

	const response = await fetch(VENUES_URL, options);
	const json = await response.json();

	if (!response.ok) {
		throw new Error(json.errors?.[0]?.message ?? "There was an error");
	}

	return json;
}