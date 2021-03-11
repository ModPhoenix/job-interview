import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { accessTokenKey, Path } from "../settings";

interface Args {
  accessToken: string | undefined;
}

function useSignIn({accessToken}: Args) {
  const history = useHistory();

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem(accessTokenKey, accessToken);
      history.push(Path.home);
    }
  }, [history, accessToken])
}

export default useSignIn;