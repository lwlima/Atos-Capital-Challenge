import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function TopBar() {
  return (
    <header id="topBar" className="flex h-16 items-center justify-between border-b border-gray-200 px-4 md:px-6 dark:border-gray-800">

      <div className="relative h-10 w-64 ml-20">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 z-10 h-5 w-5" />
        <Input
          type="text"
          id="search"
          name="search"
          placeholder="Procurar..."
          className="pl-14 pr-3 py-2 text-md bg-[#F9F9F9] rounded-lg border-0 focus-visible:ring-0"
        />
      </div>

      <div className="flex flex-row gap-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="29"
          height="30"
          fill="none"
          viewBox="0 0 29 30" className="cursor-pointer"
        >
          <path
            fill="#898989"
            fillRule="evenodd"
            d="M14.6 3.2c-6.624 0-12 5.376-12 12s5.376 12 12 12 12-5.376 12-12-5.376-12-12-12zm1.2 20.4h-2.4v-2.4h2.4v2.4zm2.483-9.3l-1.08 1.104C16.34 16.28 15.8 17 15.8 18.8h-2.4v-.6c0-1.32.54-2.52 1.403-3.396l1.488-1.512A2.346 2.346 0 0017 11.6c0-1.32-1.08-2.4-2.4-2.4-1.32 0-2.4 1.08-2.4 2.4H9.8c0-2.652 2.147-4.8 4.8-4.8 2.652 0 4.8 2.148 4.8 4.8a3.818 3.818 0 01-1.116 2.7z"
            clipRule="evenodd"
          ></path>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="31"
          fill="none"
          viewBox="0 0 30 31" className="cursor-pointer"
        >
          <path
            fill="#898989"
            fillRule="evenodd"
            d="M15.2 28.2c1.32 0 2.4-1.08 2.4-2.4h-4.8c0 1.32 1.08 2.4 2.4 2.4zM23 21v-6.6c0-3.684-2.556-6.768-6-7.584V6c0-.996-.804-1.8-1.8-1.8s-1.8.804-1.8 1.8v.816c-3.444.816-6 3.9-6 7.584V21L5 23.4v1.2h20.4v-1.2L23 21z"
            clipRule="evenodd"
          ></path>
          <circle
            cx="24.2"
            cy="6.6"
            r="4.8"
            fill="#F9837C"
            stroke="#fff"
            strokeWidth="2"
          ></circle>
        </svg>

        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
      </div>
    </header>
  )
}