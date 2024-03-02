import { fetchNftTokenBalance } from "../airstack/nft-balance";
import { BASE_URL, PAPABASE_ADDRESS } from "../constants";
import { GroupsClient } from "./client";

const CONVERSE_GROUP_LINK_ENDPOINT =
  "https://backend-staging.converse.xyz/api/groups/create";

const WEBHOOK_URL = `${BASE_URL}/api/groups/webhook`;

export async function addGroupMember(
  client: GroupsClient,
  groupId: string,
  accountAddress: string
) {
  const groups = await client.listGroups();
  for (const group of groups) {
    if (group.group_id === groupId) {
      if (group.members?.includes(accountAddress)) {
        console.log(`${accountAddress} is already a member of ${groupId}`);
        return;
      }
    }
  }
  await client.addMembers(groupId, [accountAddress]);
}

export async function shouldAddGroupMember(
  groupId: string,
  accountAddress: string
): Promise<boolean> {
  const nftBalance = await fetchNftTokenBalance(
    accountAddress,
    PAPABASE_ADDRESS
  );
  return parseInt(nftBalance.balance as string, 10) > 0;
}

export interface XMTPGroup {
  id: string;
  topic: string;
  webhook: string;
  adminToken: string;
  name: string;
  description: string;
  link: string;
}

export async function createGroupLink(
  client: GroupsClient,
  name: string,
  description: string
): Promise<XMTPGroup> {
  const groupId = await client.createGroup("group-creator-is-admin");
  const request = {
    webhook: WEBHOOK_URL,
    topic: groupId,
    name,
    description,
  };
  const res = await fetch(CONVERSE_GROUP_LINK_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  const data = await res.json();

  return data;
}

export async function sendMessageToGroup(
  client: GroupsClient,
  groupId: string,
  message: string
): Promise<boolean> {
  const res = await client.send(groupId, message);
  console.log("Message sent", res);
  return true;
}
