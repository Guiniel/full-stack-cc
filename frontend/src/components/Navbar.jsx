import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="bg-gray-950 py-5 mb-2">
      <div className="container px-10 md:px-0 mx-auto flex justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold m-3.5">API SONGS</h1>
        </Link>
        <ul className="flex gap-x-4">
        <Link href="/songs/search">
          <img src="..\..\..\lupa.svg" alt="la lupa" />
        </Link>
          <li>
            <Link className="m-3.5 margin-top:15px" href="/songs/new">new</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
