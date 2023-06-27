import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CheckForUserRole } from '../basicComponents/CheckForToken';

// In this component, we allow the Admin to edit the user, by giving it a new userRole
function EditUser() {
  // Gets the id of the user that's going to be edited
  const { id } = useParams();
  const navigate = useNavigate();
  // Creates a state for the updating of the user role
  const [user, setUser] = useState({
    user_role: "",
  }); 

  // Checks whether the user is an Administrator or not, meaning only Admins will be able to perform the operation
  CheckForUserRole('Administrator')

  // Gets the user and sets user_role as the one the user currently has
  useEffect(() => {
    axios
      .get(`https://e-commerce-model.onrender.com/users/${id}`)
      .then((response) => {
        setUser({
            user_role: response.data.user_role
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);  
  
  // Updates the user role, according to the current state of the user constant
  const onUpdate = () => {
    console.log(user.user_role)
    axios.post(`https://e-commerce-model.onrender.com/users/update_user/${id}`, {
        user_role: user.user_role
      })  
        .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Deletes the user
  function onDelete(e) {
    e.preventDefault()
    axios
      .delete(`https://e-commerce-model.onrender.com/users/delete_user/${id}`)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
           })
      .catch((error) => {
        console.log(error);
      });
  };

  // Submits or deletes according to the button name
  const onSubmit = (e) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name === "Update") {
      onUpdate();
      navigate(`/profile/${id}`)
    } else if (e.nativeEvent.submitter.name === "Delete") {
      onDelete();
    }
  }

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