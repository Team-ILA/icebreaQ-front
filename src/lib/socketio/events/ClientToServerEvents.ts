import UserDetail from '../UserDetail';

export default interface ClientToServerEvents {
  disconnecting: () => void;
  new_answer: (answer: string, quizId: string) => void;
  join_room: (data: UserDetail) => void;
}
