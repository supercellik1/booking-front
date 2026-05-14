import React, { useEffect, useState } from "react";
import "./AdminPanel.css";
import { UsersSection } from "./UsersSection";
import { ManagersSection } from "./ManagerSection";
import { userService } from "../../api/users/userService";
import type {  UserInfo as User } from "../../api/users/types";

const sections = [
  { key: "pending-hotels", label: "Ожидающие одобрения отели" },
  { key: "users", label: "Пользователи" },
  { key: "managers", label: "Менеджеры" },
];

export default function AdminPanel() {
  const [active, setActive] = useState(sections[0].key);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const gotUsers = await userService.getAll();
      setUsers(gotUsers);
    } catch (e) {
  console.error(e);
  alert("Ошибка загрузки пользователей: " + (e as any)?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);


  const handleMakeAdmin = async (user: User) => {
    await userService.makeAdmin(user.id);
    await fetchUsers();
  };
  const handleMakeManager = async (user: User) => {
    await userService.makeManager(user.id);
    await fetchUsers();
  };
  const handleRemoveAdmin = async (user: User) => {
    await userService.removeAdmin(user.id);
    await fetchUsers();
  };

  return (
    <div className="admin-root">
      <div className="admin-glass-card">
        <h2 className="admin-title">Админ-панель</h2>
        <div className="admin-section-tabs">
          {sections.map((s) => (
            <button
              key={s.key}
              className={`admin-section-tab${active === s.key ? " active" : ""}`}
              onClick={() => setActive(s.key)}
              type="button"
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="admin-section-content">
          {active === "pending-hotels" && <PendingHotelsSection />}
          {active === "users" && (
            loading
              ? <div>Загрузка пользователей…</div>
              : <UsersSection
                  users={users}
                  onMakeAdmin={handleMakeAdmin}
                  onMakeManager={handleMakeManager}
                  onRemoveAdmin={handleRemoveAdmin}
                />
          )}
          {active === "managers" && (
            loading
              ? <div>Загрузка пользователей…</div>
              : <ManagersSection
                  users={users.filter(u => u.role === 'manager')}
                />
          )}
        </div>
      </div>
    </div>
  );
}

const PendingHotelsSection = () => (
  <div className="admin-section-empty">Тут будет модерация отелей…</div>
);