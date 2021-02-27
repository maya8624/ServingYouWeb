import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ className, columns, items }) {
  return (
    <table className={className}>
      <TableHeader columns={columns} />
      <TableBody columns={columns} items={items} />
    </table>
  );
}

export default Table;
