import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';
import { returnUserId, ReturnUserRole, ReturnUserProperties } from "./UserId";

let decoded;

const cookies = new Cookies();   

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = cookies.get("TOKEN");
  const [user, setUser] = useState({
    user_role: "",
  }); 

  decoded = jwtDecode(token);
  const userId = decoded.userId;
  const userRole = ReturnUserProperties('user_role');
  console.log(decoded)

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${id}`)
      .then((response) => {
        console.log('blaaaaaaaaaaaaaaaaaa' + response)
        setUser({
            user_role: response.data.user_role
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);  
  
  const onUpdate = () => {
    console.log(user.user_role)
    axios.post(`http://localhost:4000/users/update_user/${id}`, {
        user_role: user.user_role
      })  
        .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  function onDelete(e) {
    e.preventDefault()
    axios
      .delete(`http://localhost:4000/users/delete_user/${id}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
           })
      .catch((error) => {
        console.log(error);
      });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "Update") {
      onUpdate();
      navigate(`/profile/${id}`)
    } else if (e.nativeEvent.submitter.name === "Delete") {
      onDelete();
    }
  }

  console.log('shit' + ReturnUserRole())
  console.log('merde' + ReturnUserProperties('user_role'))

  return (
    <div>
      <form onSubmit={onSubmit}>
      <div className="form-group">
       <label>User Role: </label>
       <select className="form-control" value={user.user_role} onChange={(e) => setUser({ ...user, user_role: e.target.value })}>
         <option value="Administrator">Administrator</option>
         <option value="Client">Client</option>
       </select>
     </div>
     <div className="form-group">
          <input type="submit" value="Update Profile" className="btn btn-primary" name="Update" /></div> <br />
        <div className="form-group">
          <input type="submit" value="Delete Profile" className="btn btn-primary" name="Delete"/></div>
      </form>
    </div>
  );
}

export default EditUser; 