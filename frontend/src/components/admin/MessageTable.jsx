import React from "react";

const MessageTable = ({ messages = [] }) => {
  if (!messages.length) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Messages</h2>

        <div className="text-zinc-400 text-center py-10">
          No messages available.
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-zinc-800">
      <table className="w-full">
        <thead className="bg-zinc-900">
          <tr className="text-left text-zinc-400">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Subject</th>
            <th className="p-4">Date</th>
          </tr>
        </thead>

        <tbody>
          {messages.slice(0, 3).map((message) => (
            <tr
              key={message.id}
              className="border-t border-zinc-800 hover:bg-zinc-900"
            >
              <td className="p-4">{message.name}</td>
              <td className="p-4">{message.email}</td>
              <td className="p-4">{message.subject}</td>
              <td className="p-4">
                {new Date(message.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessageTable;