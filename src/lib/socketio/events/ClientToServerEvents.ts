import UserDetail from '../UserDetail';

export default interface ClientToServerEvents {
  disconnecting: () => void;
  new_answer: (data: { newAnswer: string }) => void;
  greeting: (userData: UserDetail) => void;
}
