import UserDetail from '../UserDetail';
import { quizReponse } from '../../api/quiz';

export default interface ServerToClientEvents {
  answer_submitted: (data: { updatedAnswer: string[] }) => void;
  new_user_connected: (userData: UserDetail) => void;
  user_disconnected: (userID: string) => void;
  quiz_updated: (data: quizReponse) => void;
}
