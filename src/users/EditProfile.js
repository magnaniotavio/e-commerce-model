import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useParams, useNavigate } from "react-router-dom";
//import jwtDecode from 'jwt-decode';
//import { returnUserId  } from "./UserId";
import { CheckForToken, CheckForUser } from "../basicComponents/CheckForToken";

//const cookies = new Cookies();   

function EditProfile() {
/*  function CheckForToken() {
    const navigate = useNavigate();
    
    useEffect(() => {
      try {
        const token = cookies.get("TOKEN");
        const decodedToken = jwtDecode(token);
        // Process the decoded token as needed
      } catch (error) {
        // Handle the invalid token error, e.g., redirect the user
        navigate('/unauthorized');
      }
    }, []);
  
    return null;
  } */
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    description: "",
    language_preferences: "",
    timezone: "",
    payment_info: "",
    wishlist: "",
    order_history: [],
    newsletter_subscription: "",
    verified: "",
    created_at: "",
    last_login: "",
    birth_date: "",
    address: "",
    first_name: "",
    last_name: "",
    phone_number: "",
  });
 // const token = cookies.get("TOKEN");
 // let decoded;
//  decoded = null;
 // if (typeof token === 'string') {
 //   decoded = jwtDecode(token);
//  }
  //const userId = returnUserId()

  CheckForUser()

 // console.log(decoded)

 /* useEffect(() => {
    if (!token) {
      navigate("/unauthorized");
    } 
    else if (id != userId) {
      navigate("/unauthorized")
    }
    else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [navigate, token]); */



  useEffect(() => {
    axios
      .get(`https://e-commerce-model.onrender.com/users/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);  
  

  const onUpdate = () => {
    axios
      .post(`https://e-commerce-model.onrender.com/users/update_user/${id}`, user)
      .then((res) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onDelete = () => {
    axios
      .delete(`https://e-commerce-model.onrender.com/users/delete_user/${id}`)
      .then((res) => {
        console.log(res.data);
        navigate("/");
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
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
      <div className="form-group">
          <label>Description: </label>
          <input type="text" className="form-control" placeholder="Tell us about yourself..." value={user.description} onChange={(e) => setUser({ ...user, description: e.target.value })} />
      </div>
     <div className="form-group">
       <label>Language Preference: </label>
       <select className="form-control" value={user.language_preferences} onChange={(e) => setUser({ ...user, language_preferences: e.target.value })}>
         <option value="English">English</option>
         <option value="Portuguese">Portuguese</option>
       </select>
     </div>
      <div className="form-group">
         <label>Address: </label>
         <input
           type="text" className="form-control" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} />
       </div>
       <div className="form-group">
         <label>Birth Date: </label>
         <input
           type="date" className="form-control" value={user.birth_date} onChange={(e) => setUser({ ...user, birth_date: e.target.value })} />
       </div>
       <div className="form-group">
         <label>First Name: </label>
         <input
           type="text" className="form-control" value={user.first_name} onChange={(e) => setUser({ ...user, first_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label>Last Name: </label>
         <input
           type="text" className="form-control" value={user.last_name} onChange={(e) => setUser({ ...user, last_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label>Phone Number: </label>
         <input
           type="number" className="form-control" value={user.phone_number} onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
         />
       </div>
        <div className="form-group">
          <input type="submit" value="Update Profile" className="btn btn-primary" name="Update" /></div> <br />
        <div className="form-group">
          <input type="submit" value="Delete Profile" className="btn btn-primary" name="Delete"/></div>
      </form>
    </div>
  );
}

export default EditProfile; 
