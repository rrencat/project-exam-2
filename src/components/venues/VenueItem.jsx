import PropTypes from "prop-types";
import { Card } from "react-daisyui";
import { Link } from "react-router-dom";

function VenueItem({ post }) {
	const { name, description, media, location, price, id } = post;

	const handleImgLoadingError = (e) => {
        e.target.src = "/images/log-cabin-1886620_640.jpg";
      };

	return (
		<div>
			<Card>
				<Card.Image src={media} alt={name} onError={(e) => handleImgLoadingError(e)}/>
				<Card.Body>
					<Card.Title>
						<h2><strong>{name}</strong></h2>
					</Card.Title>
						<p><i>{location.address}, {location.country}</i></p>
						<p>{description}</p>
						<p>{price} NOK</p>
					<Card.Actions className="justify-end hover:text-indigo-900">
						<Link to={`venue/${id}`} className="bt bg-secondary hover:bg-primary mt-2 text-white font-bold py-3 px-3 rounded">View more</Link>
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