import { useAuth } from "../../hooks/useAuth";

function Books() {
  const { user } = useAuth();
  return <div>Books Page. User: {user ? user.email : "Guest"}</div>;
}

export default Books;
