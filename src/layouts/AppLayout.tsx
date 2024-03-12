import { Outlet } from "react-router-dom";

import { LeftBar } from "./components/LeftBar";
import { TopBar } from "./components/TopBar";

export function AppLayout() {
  return (
    <div className="flex w-full min-h-screen">
      <LeftBar />
      <div id="topBar" className="flex w-full flex-1 flex-col">
        <TopBar />
        <main className="flex-1 p-4 px-8 grid items-start gap-4 bg-[#F9F9F9]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
