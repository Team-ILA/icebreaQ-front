import UserDetail from '../UserDetail';

export default interface ClientToServerEvents {
  disconnecting: () => void;
  new_answer: (answer: string, quizId: string) => void;
  join_room: (data: UserDetail) => void;
  to_next_question: (quizId: string) => void;
  to_prev_question: (quizId: string) => void;
}
