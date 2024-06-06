import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Producto } from "../types";
import { useLocation, useNavigate } from "react-router-dom";

type PaginationProps = {
  data: Producto[];
  setRecords: Dispatch<SetStateAction<Producto[]>>;
  recordsPerPage?: number;
};

export const Pagination = ({
  data,
  setRecords,
  recordsPerPage = 5,
}: PaginationProps) => {
  const [recordsPerPagesState, setRecordsPerPagesState] =
    useState<number>(recordsPerPage);

  const location = useLocation();
  const navigate = useNavigate();

  // Get params from URL
  const searchParams = new URLSearchParams(location.search);
  const pageParam = searchParams.get("page");
  const searchParam = searchParams.get("search") || "";
  const currentPage = pageParam ? parseInt(pageParam) : 1;

  const [npage, setNpage] = useState<number>(0);
  const [shown, setShown] = useState<number>(0);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchParam.toLowerCase())
      )
    );
    const _lastindex = currentPage * recordsPerPagesState;
    const _firstindex = _lastindex - recordsPerPagesState;
    const _records = filteredData.slice(_firstindex, _lastindex);
    const _npage = Math.ceil(filteredData.length / recordsPerPagesState);

    setRecords(_records.length ? _records : filteredData);
    setNpage(_npage);
    setShown(_records.length ? _records.length : filteredData.length);
  }, [currentPage, data, recordsPerPagesState, searchParam, setRecords]);

  const prevPage = () => {
    if (currentPage !== 1) {
      navigate(`?page=${currentPage - 1}&search=${searchParam}`);
    }
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      navigate(`?page=${currentPage + 1}&search=${searchParam}`);
    }
  };

  const setPage = (page: number) => {
    if (page >= 1 && page <= npage) {
      navigate(`?page=${page}&search=${searchParam}`);
    }
  };

  const generatedPages = () => {
    const pages: any[] = [];

    if (npage <= 3) {
      for (let i = 1; i <= npage; i++) {
        pages.push(
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            className={`text-[#1959b8] ${
              currentPage === i ? "underline" : ""
            } cursor-pointer`}
          >
            {i}
          </button>
        );
      }
    } else {
      for (
        let i = Math.max(1, currentPage - 2);
        i <= Math.min(currentPage + 2, npage);
        i++
      ) {
        pages.push(
          <button
            key={i}
            type="button"
            onClick={() => setPage(i)}
            className={`text-[#1959b8] ${
              currentPage === i ? "underline" : ""
            } cursor-pointer`}
          >
            {i}
          </button>
        );
      }
      if (currentPage > 3) {
        pages.unshift(<span key="...1">...</span>);
      }
      if (currentPage < npage - 2) {
        pages.push(<span key="...2">...</span>);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col md:flex-row justify-start gap-y-5 p-5 md:justify-between">
      <div className="flex gap-x-3 justify-between md:justify-start">
        <label>Datos a mostrar</label>
        <select
          title="Shown Data"
          onChange={(e) => setRecordsPerPagesState(Number(e.target.value))}
          className="border border-[#dee2e6] rounded-lg"
          value={recordsPerPagesState}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
        {`${shown} de ${data.length} datos mostrados`}
      </div>
      <div className="flex justify-end gap-x-3">
        <button
          type="button"
          className="text-[#1959b8] cursor-pointer"
          onClick={prevPage}
        >
          {"< "}
        </button>
        {generatedPages()}
        <button
          type="button"
          className="text-[#1959b8] cursor-pointer"
          onClick={nextPage}
        >
          {" >"}
        </button>
      </div>
    </div>
  );
};
