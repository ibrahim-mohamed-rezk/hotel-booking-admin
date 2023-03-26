import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_PROXY}/hotels`
  );
  const handelChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handelClick = async (e) => {
    e.preventDefault();
    const roomNumbers = rooms.split(",").map((num) => ({ number: num }));
    try {
      await axios.post(
        `${process.env.REACT_APP_PROXY}/rooms/${hotelId}`,
        {
          ...info,
          roomNumbers,
          hotelId: hotelId,
        },
        {
          withCredentials: true,
        }
      );
      navigate("/rooms");
    } catch (err) {
      console.log(err);
    }
  };

  const handelSelect = (e) => {
    setHotelId(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY}/hotels`, {
        withCredentials: true,
      })
      .then((info) => {
        setHotelId(info.data[0]._id);
      });
    // data ? setHotelId(data[0]._id) : setHotelId(undefined);
  }, []);

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handelChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Rooms</label>
                <textarea
                  onChange={(e) => setRooms(e.target.value)}
                  placeholder="give comma between room numbers"
                ></textarea>
              </div>
              <div className="formInput">
                <label>chose a hotel</label>
                <select onChange={handelSelect} id="hotelId">
                  {loading
                    ? "loading..."
                    : data &&
                      data.map((hotel) => {
                        return (
                          <option key={hotel._id} value={hotel._id}>
                            {hotel.name}
                          </option>
                        );
                      })}
                </select>
              </div>
              <button onClick={handelClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
