import { UsersClient } from "../../components/UsersClient";

export default function UsersPage() {
  return (
    <>
      <section className="page-heading">
        <h1>Users</h1>
        <p>Read and write PostgreSQL-backed records through the backend API.</p>
      </section>
      <UsersClient />
    </>
  );
}
