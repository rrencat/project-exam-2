import { useState, useEffect } from "react";

export default function useApi(url) {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		async function getData() {
			try {
				setIsLoading(true);
				setIsError(false);
				const response = await fetch(url);

				if (response.ok) {
					const json = await response.json();
					console.log(json);
					return setData(json);
				}

				throw new Error();
			} catch (error) {
				console.log(error);
				setIsError(true);
			} finally {
				setIsLoading(false);
			}
		}

		getData();
	}, [url]);
	return { data, isLoading, isError };
}