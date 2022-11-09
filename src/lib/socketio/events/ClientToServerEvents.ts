import UserDetail from '../UserDetail';

export default interface ClientToServerEvents {
  disconnecting: () => void;
  new_answer: (data: { newAnswer: string }) => void;
  join_room: (data: UserDetail) => void;
}
