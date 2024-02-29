import { fetchQuery } from "@airstack/node";
import { GetAllSocialsQuery } from "./types";

const query = /* GraphQL */ `
  query GetAllSocials($address: Address!) {
    Socials(
      input: {
        filter: { userAssociatedAddresses: { _eq: $address } }
        blockchain: ethereum
      }
    ) {
      Social {
        blockchain
        dappName
        profileName
        userAssociatedAddresses
        userId
        userCreatedAtBlockTimestamp
      }
    }
  }
`;

interface QueryResponse {
  data: GetAllSocialsQuery | null;
  error: Error | null;
}

interface Error {
  message: string;
}

export const getSocialProfiles = async (address: string) => {
  const { data, error }: QueryResponse = await fetchQuery(query, {
    address,
  });
  if (error || !data || !data.Socials?.Social) {
    return null;
  }
  return {
    farcaster: data.Socials.Social.find((social) => social.dappName === "farcaster"),
    lens: data.Socials.Social.find((social) => social.dappName === "lens"),
  };
};
