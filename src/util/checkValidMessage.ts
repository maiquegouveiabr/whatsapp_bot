const valid_messages = ["/start", "1", "2", "3"];

export default function (message: string) {
  return valid_messages.some((itemMsg) => itemMsg === message);
}
