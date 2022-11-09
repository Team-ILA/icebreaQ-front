import UserDetail from '../UserDetail';
import { QuizInfo } from '../../../context/QuizInfoProvider';

export default interface ServerToClientEvents {
  leave: (activeUsers: string[]) => void;
  answer_submitted: (data: { updatedAnswer: string[] }) => void;
  greeting_response: (data: QuizInfo) => void;
  new_user_connected: (userData: UserDetail) => void;
  user_disconnected: (userID: string) => void;
}
