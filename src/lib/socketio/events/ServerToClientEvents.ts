export default interface ServerToClientEvents {
  leave: (activeUsers: string[]) => void;
  answer_submitted: (pdatedAnswer: string[]) => void;
  greeting_response: (roomMembers: string[]) => void;
}
