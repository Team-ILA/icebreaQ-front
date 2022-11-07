export default interface ClientToServerEvents {
  disconnecting: () => void;
  new_answer: (data: { newAnswer: string }) => void;
  greeting: (data: { quizId: string; nickname: string }) => void;
}
