
import { PROFILE_URL } from "../../constants/api";
import { useName } from "../../stores/useUserStore";
import { fetchToken } from "../../components/hooks/fetchToken";

export async function getProfile() {
    const name = useName();

    if (!name) {
        throw new Error("This requires a name");
    }

    const getProfileURL = `${PROFILE_URL}${name}`;
    const response = await fetchToken(getProfileURL)

    console.log(response)

    if (response.ok) {
        return await response.json();
    }
    
    throw new Error(response.statusText);
}
