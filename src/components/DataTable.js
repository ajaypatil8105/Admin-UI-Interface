import React from "react";
import PropTypes from "prop-types";
import DataTable from "react-data-table-component";

function CustomDataTable({
  columns,
  data,
  handleRowSelected,
}) {
  const customStyles = {
    headRow: {
      style: {
        color: "black",
        background: "lightgray",
        borderRadius: "10px",
      },
    },
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: "600",
        textTransform: "uppercase",
        borderRadius: "10px",
      },
    },
    cells: {
      style: {
        fontSize: "15px",
        borderRadius: "10px",
      },
    },
    rows: {
      style: {
        cursor: "pointer", 
      },
    },
  };

  return (
    <div>
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        selectableRows
        onSelectedRowsChange={handleRowSelected}
      />
    </div>
  );
}

CustomDataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  handleRowSelected: PropTypes.func.isRequired,
};

export default CustomDataTable;
