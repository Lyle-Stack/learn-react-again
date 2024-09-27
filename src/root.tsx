import { Link, Outlet } from "react-router-dom";
import { RootPathes } from "./routes";

function Root() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to={RootPathes["/"]}>Home</Link>
          </li>
          <li>
            <Link to={RootPathes["/simple-todo"]}>Simple Todo</Link>
          </li>
        </ul>
      </nav>
      <main>
        <Outlet />;
      </main>
    </div>
  );
}

export default Root;
