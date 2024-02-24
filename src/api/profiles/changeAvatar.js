import { PROFILE_URL } from "../../constants/api";
import { useName } from "../../stores/useUserStore";

export async function changeAvatar(avatarUrl) {
  const name = useName();
  const apiUrl = `${PROFILE_URL}${name}/media`;

  const options = {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
  };

  const response = await fetch(apiUrl, options);
  const json = await response.json();

  console.log("update:", json);

  if (!response.ok) {
      throw new Error(json.errors?.[0]?.message ?? "There was an error");
  }

  return json;
  }

