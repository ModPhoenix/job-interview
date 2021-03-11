import jwt_decode from "jwt-decode";
import { accessTokenKey } from "../settings";
import { AccessToken } from "../types";

function useUser() {
  const accessToken = localStorage.getItem(accessTokenKey);
  
  let decoded;

  if (accessToken) {
    decoded = jwt_decode<AccessToken>(accessToken);
  }

  return {
    username: decoded?.sub,
  }
}

export default useUser;