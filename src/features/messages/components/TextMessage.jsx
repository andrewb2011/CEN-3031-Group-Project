/**
 * Component that represents a single text message
 * @returns
 */
function TextMessage() {
  return (
    <div className="mb-2 border border-gray-600 border-solid">
      <h3>Username</h3>
      <p>date and time</p>
      <p>Actual text message</p>
    </div>
  );
}

export default TextMessage;
