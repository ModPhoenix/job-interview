import jwt_decode from "jwt-decode";
import { accessTokenKey } from "../settings";
import { AccessToken } from "../types";

function useUser() {
  const accessToken = localStorage.getItem(accessTokenKey);
  let username;

  if (accessToken) {
    const decoded = jwt_decode<AccessToken>(accessToken);

    console.log('decoded :>> ', decoded);

    username = decoded.sub;
  }


  return {
    username
  }
}

export default useUser;