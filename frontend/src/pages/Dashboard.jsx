export default function Dashboard({ user }) {
  return (
    <main>
      <h1>Dashboard</h1>
      <p>Logged in as {user.email}</p>
    </main>
  );
}
