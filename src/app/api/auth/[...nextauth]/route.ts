// route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import { Provider } from "next-auth/providers";
import KeycloakProvider from "next-auth/providers/keycloak";

const KEYCLOAK_CLIENT_ID = "push-messenger";
const KEYCLOAK_CLIENT_SECRET = "eca09a20-27db-4141-8976-33886e3eecf8";
const KEYCLOAK_URL = "http://192.168.250.209:8070/auth";
const KEYCLOAK_REALM = "Push";

const KEYCLOAK_ISSUER = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`;

const keycloakConfig = {
  clientId: KEYCLOAK_CLIENT_ID,
  clientSecret: KEYCLOAK_CLIENT_SECRET,
  issuer: KEYCLOAK_ISSUER,
} as const;

const providers: Provider[] = [
  // Configure Keycloak as the authentication provider
  KeycloakProvider(keycloakConfig),
];

const authOptions: NextAuthOptions = { providers };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };