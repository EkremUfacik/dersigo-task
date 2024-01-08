"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    const search = e.currentTarget.search.value;
    e.preventDefault();
    if (!search) return router.push(pathname);

    const params = new URLSearchParams(searchParams);
    params.set("search", search);
    router.push(pathname + "?" + params);
    e.currentTarget.reset();
  };
  return (
    <form onSubmit={handleSearch}>
      <Input
        id="search-input"
        type="text"
        name="search"
        placeholder="Search..."
        className="w-40"
      />
    </form>
  );
};

export default SearchInput;
