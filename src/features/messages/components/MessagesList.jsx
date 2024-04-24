import TextMessage from "./TextMessage";

function MessagesList({ messages }) {
  return (
    <ul>
      {messages.map((message) => {
        return <TextMessage message={message} key={message.key} />;
      })}
    </ul>
  );
}

export default MessagesList;
