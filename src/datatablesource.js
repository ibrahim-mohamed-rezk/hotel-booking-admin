export const userColumns = [
  { field: "_id", headerName: "ID", width: 230 },
  {
    field: "user",
    headerName: "User",
    width: 150,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={
              params.row.img ||
              "https://www.slotcharter.net/wp-content/uploads/2020/02/no-avatar-300x300.png"
            }
            alt="avatar"
          />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },

  {
    field: "city",
    headerName: "City",
    width: 100,
  },

  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelsColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },

  {
    field: "cheapestPrice",
    headerName: "Price",
    width: 100,
  },

  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];
export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
