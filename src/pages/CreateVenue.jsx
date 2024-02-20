import CreateVenueForm from "../components/venues/CreateVenueForm";

export default function CreateVenue() {
//Display CreateVenueForm
    return (
        <>
            <h1 className="text-center text-2xl">Create New Venue</h1>
            <CreateVenueForm />
        </>
    );
}