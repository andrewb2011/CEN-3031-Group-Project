/**
 * Component that represents a single text message
 * @returns
 */
function TextMessage({ message }) {
  return (
    <li className="mb-2 list-none border border-gray-600 border-solid">
      <h3>{message.sender}</h3>
      <p>{`${message.date} ${message.time}`}</p>
      <p>{message.message}</p>
    </li>
  );
}

export default TextMessage;
