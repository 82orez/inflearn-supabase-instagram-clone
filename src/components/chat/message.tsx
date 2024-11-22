export default function Message({ isFromMe, message }) {
  return (
    <div className={`p-2 rounded-lg ${isFromMe ? "bg-blue-500 text-white ml-auto" : "bg-gray-300 text-black mr-auto"}`}>
      <div>{message}</div>
    </div>
  );
}
