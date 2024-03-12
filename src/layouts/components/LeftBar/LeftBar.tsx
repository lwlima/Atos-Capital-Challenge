import { Link } from "react-router-dom";

export function LeftBar() {
  return (
    <section id="leftBar" className="flex w-64 flex-col border-r border-gray-200 dark:border-gray-800">
      <div className="my-6 flex justify-center">
        <img
          alt="ATOS CAPITAL"
          height="35"
          src="/src/assets/img/logo.png"
          width="124"
        />
      </div>
      <nav className="flex flex-1 flex-col overflow-y-auto px-3">
        <Link
          className="flex h-[52px] items-center justify-start px-4 cursor-pointer bg-[#E9E9E9] rounded-lg font-semibold text-[#202020] gap-2.5"
          to="/products"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              fill="#89131D"
              fillRule="evenodd"
              d="M20 6h-4V4l-2-2h-4L8 4v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zM10 4h4v2h-4V4zm.5 13.5L7 14l1.41-1.41 2.09 2.09 5.18-5.18 1.41 1.41-6.59 6.59z"
              clipRule="evenodd"
            ></path>
          </svg>
          Produtos
        </Link>
      </nav>
    </section>
  )
}