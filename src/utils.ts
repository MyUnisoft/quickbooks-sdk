// Require Third-party Dependencies
import * as httpie from "@myunisoft/httpie";

export function isNullOrUndefined(value: any): boolean {
  return typeof value === "undefined" || value === null;
}

export interface DiscoveryConfig {
  authorization_endpoint: string,
  token_endpoint: string,
  userinfo_endpoint: string,
  revocation_endpoint: string
}

export async function discoverIntuitConfiguration(url: string | URL): Promise<DiscoveryConfig> {
  const { data } = await httpie.get<DiscoveryConfig>(url, {
    headers: { Accept: "application/json" }
  });

  return {
    authorization_endpoint: data.authorization_endpoint,
    token_endpoint: data.token_endpoint,
    userinfo_endpoint: data.userinfo_endpoint,
    revocation_endpoint: data.revocation_endpoint
  };
}
