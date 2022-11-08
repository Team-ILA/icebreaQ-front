import UserDetail from '../UserDetail';

export default interface ServerToClientEvents {
  leave: (activeUsers: string[]) => void;
  answer_submitted: (updatedAnswer: string[]) => void;
  greeting_response: (roomMembers: string[]) => void;
  new_user_connected: (userData: UserDetail) => void;
  user_disconnected: (userID: string) => void;
}
