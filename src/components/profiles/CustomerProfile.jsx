import { useAvatar, useName } from "../../stores/useUserStore";
import { Card } from "react-daisyui";


export default function CustomerProfile() {
    const name = useName();
    const avatar = useAvatar();
    

    const handleImgLoadingError = (e) => {
        e.target.src = "/images/blank-profile-picture-973460_1280.png";
      };

    return (
		<div>
			<Card>
				<Card.Image src={avatar} alt={name} onError={(e) => handleImgLoadingError(e)}/>
				<Card.Body>
					<Card.Title>
						<h2><strong>{name}</strong></h2>
					</Card.Title>
				</Card.Body>
			</Card>
		</div>
	);
    
}