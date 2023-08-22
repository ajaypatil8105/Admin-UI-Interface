import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/SearchBar";
import CustomDataTable from "./components/DataTable";
import Pagination from "./components/Pagination";
import "./App.css";

function App() {
  const [editingRowId, setEditingRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [records, setRecords] = useState([]);
  const [filterRecords, setFilterRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");

  const columns = [
    {
      name: "Name",
      selector: (row) => {
        if (row.id === editingRowId) {
          return <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} />;
        } else {
          return row.name;
        }
      },
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => {
        if (row.id === editingRowId) {
          return <input type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />;
        } else {
          return row.email;
        }
      },
      sortable: true,
    },
    {
      name: "Role",
      selector: (row) => {
        if (row.id === editingRowId) {
          return <input type="text" value={editRole} onChange={(e) => setEditRole(e.target.value)} />;
        } else {
          return row.role;
        }
      },
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          {row.id === editingRowId ? (
            <>
              <button className={`action-button edit-button ${editingRowId ? "" : "disabled"}`} onClick={() => handleSaveEdit(row)}>
                Save
              </button>
              <button className="action-button" onClick={() => cancelEdit()}>
                Cancel
              </button>
            </>
          ) : (
            <>
              <button className={`action-button edit-button ${editingRowId ? "disabled" : ""}`} onClick={() => handleEdit(row)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className={`action-button delete-button ${editingRowId ? "disabled" : ""}`} onClick={() => handleDelete(row)}>
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      setRecords(response.data);
      setFilterRecords(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const currentRecords = records.slice(startIndex, endIndex);

  const handleFilter = (searchValue) => {
    const newData = filterRecords.filter((row) =>
      row.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      row.role.toLowerCase().includes(searchValue.toLowerCase())
    );
    setRecords(newData);
    setCurrentPage(1);
  };

  const handleEdit = (row) => {
    setEditingRowId(row.id);
    setEditName(row.name);
    setEditEmail(row.email);
    setEditRole(row.role);
  };

  const handleSaveEdit = (row) => {
    if (editName.trim() === "" || editEmail.trim() === "" || editRole.trim() === "") {
      setError("All fields are required.");
      return;
    }

    const updatedRecords = records.map((record) => {
      if (record.id === row.id) {
        return {
          ...record,
          name: editName,
          email: editEmail,
          role: editRole,
        };
      }
      return record;
    });
    setRecords(updatedRecords);

    setEditingRowId(null);
    setEditName("");
    setEditEmail("");
    setEditRole("");
    setError("");
  };

  const cancelEdit = () => {
    setEditingRowId(null);
    setEditName("");
    setEditEmail("");
    setEditRole("");
  };

  const handleDelete = (row) => {
    const updatedRecords = records.filter((record) => record.id !== row.id);
    setRecords(updatedRecords);
  };

  const handleRowSelected = (rows) => {
    setSelectedRows(rows.selectedRows);
  };

  const handleDeleteSelected = () => {
    const updatedRecords = records.filter(row => !selectedRows.includes(row));
    setRecords(updatedRecords);
    setFilterRecords(updatedRecords);
    setSelectedRows([]);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ padding: "50px 10%" }}>
      <SearchBar handleFilter={handleFilter} />
      <CustomDataTable
        columns={columns}
        data={currentRecords}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        editingRowId={editingRowId}
        editName={editName}
        setEditName={setEditName}
        editEmail={editEmail}
        setEditEmail={setEditEmail}
        editRole={editRole}
        setEditRole={setEditRole}
        handleSaveEdit={handleSaveEdit}
        cancelEdit={cancelEdit}
        selectedRows={selectedRows}
        handleRowSelected={handleRowSelected}
      />
      <div className="selected-actions">
        {selectedRows.length > 0 && (
          <>
            <span>{selectedRows.length} rows selected</span>
            <button className="delete-selected-button" onClick={handleDeleteSelected}>
              Delete Selected
            </button>
          </>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={Math.ceil(records.length / 10)}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;






