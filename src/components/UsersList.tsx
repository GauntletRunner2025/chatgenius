import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface User {
  id: string;
  email: string;
  online?: boolean;
}

export function UsersList() {
  // This is a placeholder. In a real app, you'd fetch users from your backend
  const { user: currentUser } = useAuth();
  const users: User[] = [
    { id: '1', email: currentUser?.email || 'Unknown', online: true },
    // Add more users as needed
  ];

  return (
    <div className="w-64 bg-gray-50 border-l border-gray-200 p-4">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <span
              className={`w-2 h-2 rounded-full ${
                user.online ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}