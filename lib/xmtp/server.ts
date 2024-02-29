import { GroupsClient } from "./client";

const CONVERSE_GROUP_LINK_ENDPOINT =
  "https://backend-staging.converse.xyz/api/groups/create";

const WEBHOOK_URL = `https://converse-invite-link-neekolas.replit.app/webhook`;

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
  // TODO: Put arbitrary token gating logic in here
  return true;
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
  console.log("Creating group with id", groupId);
  const request = {
    webhook: WEBHOOK_URL,
    topic: groupId,
    name,
    description,
  };
  console.log(request);
  const res = await fetch(CONVERSE_GROUP_LINK_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });
  console.log(res);
  const data = await res.json();
  console.log("Group link data", data);

  return data;
}
