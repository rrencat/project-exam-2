import { Alert, Loading } from "react-daisyui";
import useApi from "../components/hooks/useApi";
import VenueList from "../components/venues/VenueList";
import { VENUES_URL } from "../constants/api";

export default function HomePage() {
    const { data: products, isLoading, error } = useApi(VENUES_URL);

    if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return (
			<Alert>
				<span>{error}</span>
			</Alert>
		);
	}
    
    return (
        <div>
            <h1>Venues</h1>
            <VenueList venues={products}/>
        </div>
    )
        
}
