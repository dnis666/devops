"use client";

import { Plus, RefreshCw, Users } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { createUser, getUsers, type User } from "../lib/api";

export function UsersClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadUsers() {
    setLoading(true);
    setError(null);
    try {
      setUsers(await getUsers());
    } catch {
      setError("Unable to load users from the backend API.");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError(null);

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");

    try {
      await createUser({ name, email });
      event.currentTarget.reset();
      await loadUsers();
    } catch {
      setError("Unable to save this user.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    void loadUsers();
  }, []);

  return (
    <>
      <form className="form" onSubmit={(event) => void onSubmit(event)}>
        <div className="form-row">
          <label>
            Name
            <input name="name" minLength={2} required placeholder="Ada Lovelace" />
          </label>
          <label>
            Email
            <input
              name="email"
              required
              type="email"
              placeholder="ada@example.com"
            />
          </label>
        </div>
        <button className="button" disabled={saving}>
          <Plus size={16} aria-hidden="true" />
          {saving ? "Saving" : "Add user"}
        </button>
      </form>

      {error ? <div className="banner error">{error}</div> : null}

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
              </tr>
            ))}
            {!loading && users.length === 0 ? (
              <tr>
                <td colSpan={3} className="muted">
                  No users yet.
                </td>
              </tr>
            ) : null}
            {loading ? (
              <tr>
                <td colSpan={3} className="muted">
                  Loading users.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <p className="muted">
        <Users size={16} aria-hidden="true" /> {users.length} users loaded
      </p>
      <button className="button" onClick={() => void loadUsers()}>
        <RefreshCw size={16} aria-hidden="true" />
        Refresh
      </button>
    </>
  );
}
