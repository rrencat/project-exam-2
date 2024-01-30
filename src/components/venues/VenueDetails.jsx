import { useParams } from "react-router-dom";
import { VENUES_URL } from "../../constants/api"; 
import { useQuery } from "@tanstack/react-query";
import { Card } from "react-daisyui";
import ReactDatePicker from "react-datepicker";
import { useState } from "react";

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
			<Card side="lg" className="mb-3">
				<Card.Image src={data.media} alt={data.name} />
				<Card.Body>
					<Card.Title>
						<h2><strong>{data.name}</strong></h2>
					</Card.Title>
						<p><i>{data.location.address}, {data.location.country}</i></p>
						<p>{data.description}</p>
						<p><strong>Max guests:</strong> {data.maxGuests}</p>
						<p><strong>Rating:</strong> {data.rating}/5</p>
						<p><strong>Price per night:</strong> {data.price} NOK</p>
				</Card.Body>
				
			</Card>
				</>
			)}
		</>
	);
}

export default VenueDetails;