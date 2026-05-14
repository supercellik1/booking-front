import React, { useState } from "react";
import "./AdminPanel.css";

export function ManagersSection({ users = [], onRemoveManager = () => {} }: { users?: any[], onRemoveManager?: (user: any) => void }) {
  const [selectedUser, setSelectedUser] = useState<any>(null);

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
            {users.map((u: any) => (
              <tr
                key={u.id}
                className={selectedUser?.id === u.id ? "selected" : ""}
                onClick={() => setSelectedUser(u)}
                style={{ cursor: "pointer" }}
              >
                <td>{u.fullName}</td>
                <td>{u.email}</td>
                <td>
                  <span className="user-role-badge manager">Менеджер</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <div className="admin-user-actions">
          <div>
            <span style={{ fontWeight: 600, fontSize: 17 }}>{selectedUser.fullName}</span>
            {" "}— {selectedUser.email}
          </div>
          <div className="actions-btns">
            <button style={{background:'#ad213b'}}
              onClick={() => { 
                onRemoveManager(selectedUser); 
                setSelectedUser(null); 
              }}>
              Убрать менеджера
            </button>
            <button onClick={() => setSelectedUser(null)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
}