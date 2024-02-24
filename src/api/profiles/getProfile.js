
import { PROFILE_URL } from "../../constants/api";
import { useName } from "../../stores/useUserStore";
import { fetchToken } from "../../components/hooks/fetchToken";


const name = useName();

export async function getProfile() {
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


export async function getProfileBookings() {
    if (!name) {
        throw new Error("This requires a name");
    }

    const getProfileBookingsURL = `${PROFILE_URL}${name}/bookings`;
    const response = await fetchToken(getProfileBookingsURL)

    if (response.ok) {
        return await response.json();
    }
    
    throw new Error(response.statusText);
}