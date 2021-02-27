import React from "react";

function TableHeader({ columns }) {
  return (
    <thead>
      <tr>
        {columns.map((column, index) => (
          <th scope="col" key={index}>{column.label}</th>
        ))}
      </tr>
    </thead>
  );
}

export default TableHeader;
