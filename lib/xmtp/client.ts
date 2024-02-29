import { Client } from "@xmtp/xmtp-js";
import { createWalletClient, http } from "viem";
import { mainnet } from "viem/chains";
import { english, generateMnemonic, mnemonicToAccount } from "viem/accounts";
import { buildCommandRunner } from "./command";
import type {
  Group,
  CreateGroupResponse,
  InfoResponse,
  ListGroupsResponse,
  PermissionInputs,
} from "./types";

// This binary was downloaded from https://github.com/xmtp/libxmtp/releases/tag/cli-a8d3dd9
// You must download an appropriate binary for your system's architecture
const BINARY_PATH = "./cli-binary";

async function generateV2Client() {
  const mnemonic = generateMnemonic(english);
  const account = mnemonicToAccount(
    "legal winner thank year wave sausage worth useful legal winner thank yellow"
  );
  const walletClient = createWalletClient({
    account,
    chain: mainnet,
    transport: http(),
  });
  // Register the XMTP client on the network so they can receive both DM and Group messages
  await Client.create(walletClient, { env: "dev" });
  return mnemonic;
}

export async function createClient(dbPath: string) {
  const runCommand = buildCommandRunner(BINARY_PATH, [
    "--db",
    dbPath,
    "--json",
  ]);

  const register = async (seedPhrase: string): Promise<string> => {
    const { account_address } = await runCommand<InfoResponse>([
      "register",
      "--seed-phrase",
      seedPhrase,
    ]);
    return account_address;
  };

  const getAccountAddress = async (): Promise<any> => {
    const { account_address } = await runCommand<InfoResponse>(["info"]);
    return account_address;
  };

  let accountAddress: string;
  try {
    accountAddress = await getAccountAddress();
  } catch (e) {
    const mnemonic = await generateV2Client();
    accountAddress = await register(mnemonic);
  }

  return {
    accountAddress,
    async createGroup(
      permissions: PermissionInputs = "everyone-is-admin"
    ): Promise<string> {
      const { group_id } = await runCommand<CreateGroupResponse>([
        "create-group",
        permissions,
      ]);
      return group_id;
    },
    async addMembers(
      groupId: string,
      accountAddresses: string[]
    ): Promise<void> {
      await runCommand([
        "add-group-members",
        groupId,
        "--account-addresses",
        ...accountAddresses,
      ]);
    },
    async removeMembers(
      groupId: string,
      accountAddresses: string[]
    ): Promise<void> {
      await runCommand([
        "remove-group-members",
        groupId,
        "--account-addresses",
        ...accountAddresses,
      ]);
    },
    async listGroups(): Promise<Group[]> {
      return (await runCommand<ListGroupsResponse>(["list-groups"])).groups;
    },
    async send(groupId: string, message: string): Promise<void> {
      await runCommand<any>(["send", groupId, message]);
    },
    async listMessages(groupId: string): Promise<any> {
      return (await runCommand<any>(["list-group-messages", groupId])).messages;
    },
  };
}

export type GroupsClient = Awaited<ReturnType<typeof createClient>>;
