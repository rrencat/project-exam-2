import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div>
            <h1>404: Page not found</h1>
            <p>
                <Link to="/">Go Home</Link>
            </p>
        </div>
    );
}