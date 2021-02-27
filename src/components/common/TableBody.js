import React from "react";
import _ from "lodash";

function TableBody({ columns, items }) {
  const renderCell = (item, column, index) => {
    if (column.content) return column.content(item);
    if (column.path === "index") return index + 1;
    return _.get(item, column.path);
  };

  const createKey = (column) => {
    return _.uniqueId() + column.label;
  };

  return (
    <tbody>
      {items.map((item, index) => (
        <tr key={_.uniqueId()}>
          {columns.map((column) => {
            return (
              <td key={createKey(column)}>
                {(column.path === "image" && (
                  <img
                    src={renderCell(item, column)}
                    className={column.className}
                    alt={item.image}
                  />
                )) ||
                  renderCell(item, column, index)}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
