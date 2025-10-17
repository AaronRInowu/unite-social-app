import { Chat, ChatMessage } from "../interfaces/chats.interface";

export const returnOtherUser = (
  me: number,
  members?: Chat["members"] | ChatMessage
) => {
  const membersUsers = Array.isArray(members)
    ? members.map((m) => m)
    : [members?.sender ?? 0];
  const findMember = membersUsers?.find(
    (f) => (typeof f === "number" ? f : f.id) !== me
  );
  return typeof findMember === "number" ? undefined : findMember;
};
