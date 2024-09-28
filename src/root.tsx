import { Link, Outlet } from "react-router-dom";
import { RootPathes } from "./routes";

function LinStyledkWarpper({ children }: { children: React.ReactNode }) {
  return (
    <span className="hover:bg-slate-200 px-2 py-1 text-nowrap tracking-tight rounded-md transition-colors">
      {children}
    </span>
  );
}

function Root() {
  return (
    <div className="w-full">
      <nav className="bg-white p-2 flex flex-row gap-1 flex-wrap">
        <LinStyledkWarpper>
          <Link to={RootPathes["/"]}>Home</Link>
        </LinStyledkWarpper>
        <LinStyledkWarpper>
          <Link to={RootPathes["simple-todo"]}>Simple Todo</Link>
        </LinStyledkWarpper>
        <LinStyledkWarpper>
          <Link to={RootPathes["simple-form"]}>Simple Form</Link>
        </LinStyledkWarpper>
        <LinStyledkWarpper>
          <Link to={RootPathes["login-and-register-form"]}>
            Shared Common Form Component
          </Link>
        </LinStyledkWarpper>
        <LinStyledkWarpper>
          <Link to={RootPathes["react-hook-form"]}>React Hook Form</Link>
        </LinStyledkWarpper>
        <LinStyledkWarpper>
          <Link to={RootPathes["react-query"]}>React Query</Link>
        </LinStyledkWarpper>
      </nav>
      <main className="w-full block p-2">
        <Outlet />
      </main>
    </div>
  );
}

export default Root;
