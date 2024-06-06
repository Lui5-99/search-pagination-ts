import { useState, useEffect } from "react";
import { Pagination, Search } from "./Components";
import { db } from "./data";
import { Producto } from "./types";

const Principal = () => {
  const [dataSearch, setDataSearch] = useState<Producto[]>([] as Producto[]);
  const [records, setRecords] = useState<Producto[]>([] as Producto[]);

  useEffect(() => {
    setDataSearch(db);
  }, []);

  return (
    <div className="w-2/3 flex flex-col mx-auto gap-y-10 my-10">
      <Search state={db} setState={setDataSearch} />
      <div className="w-full flex justify-center">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">Id</th>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Precio</th>
              <th className="border px-4 py-2">Stock</th>
              <th className="border px-4 py-2">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {dataSearch.map((producto) => (
              <tr key={producto.Id}>
                <td className="border px-4 py-2">{producto.Id}</td>
                <td className="border px-4 py-2">{producto.Nombre}</td>
                <td className="border px-4 py-2">{producto.Precio}</td>
                <td className="border px-4 py-2">{producto.Stock}</td>
                <td className="border px-4 py-2">{producto.Categoria}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination />
    </div>
  );
};

export default Principal;
