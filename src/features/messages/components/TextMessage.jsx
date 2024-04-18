/**
 * Component that represents a single text message
 * @returns
 */
function TextMessage({ message }) {
  return (
    <li className="mb-2 list-none border border-gray-600 border-solid">
      <div className="flex items-center">
        <h3 className="text-xl text-gray-600">{message.sender}</h3>
        <p className="ml-2 text-sm text-gray-600 ">{`${message.date} ${message.time}`}</p>
      </div>
      <p>{message.message}</p>
    </li>
  );
}

export default TextMessage;
