import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function VenueItem({ post }) {
	const { name, description, id } = post;

	return (
		<div>
			<h2><strong>NAME: </strong>{name}</h2>
			<p>{description}</p>
			<Link to={`venue/${id}`}>View more</Link>
		</div>
	);
}

export default VenueItem;

VenueItem.propTypes = {
	post: PropTypes.shape({
		name: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
	}).isRequired,
};