import { useParams } from "react-router-dom";
import { VENUES_URL } from "../../constants/api"; 
import { useQuery } from "@tanstack/react-query";

async function getVenue(id) {
	const response = await fetch(`${VENUES_URL}/${id}`);

	if (!response.ok) {
		throw new Error("There was an error fetching the listings");
	}

	return response.json();
}

function VenueDetails() {
	const { id } = useParams();

	const { isPending, error, data } = useQuery({
		queryKey: ["venue", id],
		queryFn: () => getVenue(id),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	if (isPending) return <div>Loading...</div>;

	if (error) return "An error has occurred: " + error.message;

	return (
		<>
			{data && (
				<>
                    <img src={data.media} alt={data.name} />
					<h2>{data.name}</h2>
					<p>{data.description}</p>
				</>
			)}
		</>
	);
}

export default VenueDetails;