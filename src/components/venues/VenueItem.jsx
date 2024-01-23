import PropTypes from "prop-types";
import { Card } from "react-daisyui";
import { Link } from "react-router-dom";

function VenueItem({ post }) {
	const { name, description, media, id } = post;

	return (
		<div>
			<Card side="lg" className="mb-3">
				<Card.Image src={media} alt={name} />
				<Card.Body>
					<Card.Title>
						<h2><strong>{name}</strong></h2></Card.Title>
						<p>{description}</p>
					<Card.Actions className="justify-end hover:text-indigo-900">
						<Link to={`venue/${id}`}>View more</Link>
					</Card.Actions>
				</Card.Body>
			</Card>
		</div>
	);
}

export default VenueItem;

VenueItem.propTypes = {
	post: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		media: PropTypes.array.isRequired,
		id: PropTypes.string.isRequired,
	}).isRequired,
};