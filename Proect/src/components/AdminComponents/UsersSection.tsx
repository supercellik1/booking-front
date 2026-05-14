import React, { useState } from "react";
import "./AdminPanel.css";
import type { UserInfo as User } from "../../api/users/types";

interface UsersSectionProps {
  users: User[];
  onMakeAdmin: (user: User) => void;
  onBlockUser: (user: User) => void;
  onMakeManager: (user: User) => void;
  onRemoveAdmin: (user: User) => void;
}

export function UsersSection({
  users = [],
  onMakeAdmin,
  onBlockUser,
  onMakeManager,
  onRemoveAdmin,
}: UsersSectionProps) {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Имя</th>
              <th>Email</th>
              <th>Роль</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr
                key={u.id}
                className={selectedUser?.id === u.id ? "selected" : ""}
                onClick={() => setSelectedUser(u)}
                style={{ cursor: "pointer" }}
              >
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`user-role-badge ${u.role.toLowerCase()}`}>
                    {u.role === "Admin"
                      ? "Админ"
                      : u.role === "manager"
                      ? "Менеджер"
                      : "Путешественник"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div className="admin-user-actions">
          <div>
            <span style={{ fontWeight: 600, fontSize: 17 }}>
              {selectedUser.fullName}
            </span>{" "}
            — {selectedUser.email} ({selectedUser.role})
          </div>
          <div className="actions-btns">
            <button onClick={() => { onMakeAdmin(selectedUser); setSelectedUser(null); }}>Сделать админом</button>
            <button onClick={() => { onMakeManager(selectedUser); setSelectedUser(null); }}>Сделать менеджером</button>
            <button onClick={() => { onRemoveAdmin(selectedUser); setSelectedUser(null); }}>Убрать админку</button>
            <button onClick={() => setSelectedUser(null)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}