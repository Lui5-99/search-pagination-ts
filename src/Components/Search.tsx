import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Producto } from "../types";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

type SearchProps = {
  setState: Dispatch<SetStateAction<Producto[]>>;
  state: Producto[];
  align?: "left" | "center" | "right";
};

export const Search = ({ setState, state, align = "left" }: SearchProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const searchParam = searchParams.get("search") || "";

  const [filter, setFilter] = useState<string>(searchParam);

  useEffect(() => {
    if (filter !== "") {
      SearchIn();
    } else {
      setState(state);
    }
  }, [filter]);

  const search = (obj: any) => {
    for (const key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        const res = search(obj[key]);
        if (res) return true;
      } else if (
        (typeof obj[key] === "string" || typeof obj[key] === "number") &&
        obj[key].toString().toLowerCase().includes(filter.toLowerCase())
      ) {
        return true;
      }
    }
  };

  const SearchIn = () => {
    const oldData = [...state];
    const newData = oldData.filter((item) => search(item));
    setState(newData);
  };

  const clear = () => {
    setFilter("");
    setState([...state]);
    navigate("?page=1");
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    navigate(`?page=1&search=${e.target.value}`);
  };

  return (
    <div
      className={`flex w-full ${
        align === "left"
          ? "justify-start"
          : align === "right"
          ? "justify-end"
          : "justify-center"
      }`}
    >
      <div className="w-full md:w-[300px] relative">
        <input
          className="border border-[#dee2e6] rounded-lg w-full p-2"
          type="text"
          placeholder="Search..."
          value={filter}
          onChange={handleFilterChange}
        />
        {filter && (
          <FaTimes
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            onClick={clear}
          />
        )}
      </div>
    </div>
  );
};
