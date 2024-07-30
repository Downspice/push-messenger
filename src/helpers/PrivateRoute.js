import { getServerSession } from "next-auth";
import { authOptions } from "../app/api/auth/[...nextauth]/route";

export default async function PrivateRoute({ children }) {
  const session = await getServerSession(authOptions);

  const isLoggedIn = session?.user?.email;

  return isLoggedIn ? children : null;
}
