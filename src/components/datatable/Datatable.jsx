import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Datatable = ({ colums }) => {
  const location = useLocation();
  let path = location.pathname.split("/")[1];
  path == "" ? (path = "users") : (path = path);
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_PROXY}/${path}`
  );
  useEffect(() => {
    setList(data);
  }, [data]);

  const handleDelete = async (id) => {
    try {
      if (path === "rooms") {
        await axios.delete(
          `${process.env.REACT_APP_PROXY}/${path}/${id}/${
            data.find((item) => {
              return item._id === id;
            }).hotelId
          }`,
          {
            withCredentials: true,
          }
        );
        setList(list.filter((item) => item._id !== id));
      } else {
        await axios.delete(`${process.env.REACT_APP_PROXY}/${path}/${id}`, {
          withCredentials: true,
        });
        setList(list.filter((item) => item._id !== id));
      }
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={colums.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;
