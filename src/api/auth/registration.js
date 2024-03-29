import { REGISTER_URL } from "../../constants/api";

export async function registration(userDetails) {
    const options = {
        headers: {"Content-Type": "application/json"},
        method: "POST",
		body: JSON.stringify(userDetails),
    };

    const response = await fetch(REGISTER_URL, options);
    const json = await response.json();

    console.log("register:", json);

    if (!response.ok) {
        throw new Error(json.errors?.[0]?.message ?? "There was an error");
    }

    return json;
}