import { Link } from "react-router-dom";
import { useAvatar, useName } from "../../stores/useUserStore";


export default function CustomerProfile() {
    const name = useName();
    const avatar = useAvatar();
    

    const handleImgLoadingError = (e) => {
        e.target.src = "/images/blank-profile-picture-973460_1280.png";
      };


	
	
    return (
		<div>
			<div className="avatar">
				<div className="w-24 rounded-full">
					<img src={avatar} alt={name} shape="circle" onError={(e) => handleImgLoadingError(e)} />
				</div>
			</div>
			<div>
				<Link to="/change-avatar"><i>change avatar</i></Link>
			</div>
			<div>
				<h2>{name}</h2>
			</div>
		</div>
	);
    
}