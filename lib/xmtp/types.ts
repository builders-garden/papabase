export type SuccessResponse = {
  command_output: true;
};

export type PermissionInputs = "everyone-is-admin" | "group-creator-is-admin";

export type Group = {
  group_id: string;
  members: string[];
  metadata: {
    creator_account_address: string;
    policy: "EveryoneIsAdmin" | "AdminIsCreator";
  };
};

export type CreateGroupResponse = SuccessResponse & {
  group_id: string;
};

export type InfoResponse = SuccessResponse & {
  account_address: string;
};

export type ListGroupsResponse = SuccessResponse & {
  groups: Group[];
};

export type Message = {
  sender_account_address: string;
  sent_at_ns: number;
  message_text: string;
};

export type ListMessagesResponse = SuccessResponse & {
  messages: Message;
};
