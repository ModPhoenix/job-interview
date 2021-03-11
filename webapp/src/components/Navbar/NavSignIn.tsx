import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { Path } from "../../settings";

function NavSignIn(): ReactElement {
  return <Link to={Path.signIn}>Sign in</Link>;
}

export default NavSignIn;
