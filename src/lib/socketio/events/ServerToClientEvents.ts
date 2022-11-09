import UserDetail from '../UserDetail';

export default interface ServerToClientEvents {
  answer_submitted: (data: { updatedAnswer: string[] }) => void;
  new_user_connected: (userData: UserDetail) => void;
  user_disconnected: (userID: string) => void;
}
