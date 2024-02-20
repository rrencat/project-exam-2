import { VENUES_URL } from "../../constants/api";
import VenueItem from "./VenueItem";
import useApi from "../hooks/useApi";

function VenueList() {
	const { data: venues, isLoading, isError } = useApi(VENUES_URL);

	if (isLoading) {
		return <div>Loading venues...</div>;
	}

	if (isError) {
		return <div>Error loading venues</div>;
	}

	return (
		<div>
			{venues.map((venue) => {
				return <VenueItem key={venue.id} post={venue} />;
			})}
		</div>
	);
}

export default VenueList;