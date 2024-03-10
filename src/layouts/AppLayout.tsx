import { Outlet } from "react-router-dom";

import { LeftBar } from "./components/LeftBar";
import { TopBar } from "./components/TopBar";

export function AppLayout() {
  return (
    <div>
      <LeftBar />
      <TopBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
