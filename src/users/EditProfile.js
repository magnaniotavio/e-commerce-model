import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { CheckForUser } from "../basicComponents/CheckForToken";
import { dateInput, numberInput, selectorInput, textInput } from "../basicComponents/JSXFunctions";

// In this component, we allow the user to edit their profile
function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Properties according to the mongoose model

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [languagePreferences, setLanguagePreferences] = useState("");
  const [timezone, setTimezone] = useState("");
  const [paymentInfo, setPaymentInfo] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [newsletterSubscription, setNewsletterSubscription] = useState(false);
  const [verified, setVerified] = useState(false);
  const [createdAt, setCreatedAt] = useState("");
  const [lastLogin, setLastLogin] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
      
  /* Checks whether the useParams() id is similar to the user's Id, and also gives an authorizing token
     meaning only the user themselves will be able to perform the operation */
  CheckForUser()

    // Here we retrieve the data to be edited
  useEffect(() => {
    // Gets the post according to the id found by useParams()
    axios
      .get(`https://e-commerce-model.onrender.com/users/${id}`)
      // Sets the states according to the data received, so that the user will see it in the editing fields
      .then((response) => {
        setUserName(response.data.username);
        setPassword(response.data.password);
        setDescription(response.data.description);
        setLanguagePreferences(response.data.language_preferences);
        setTimezone(response.data.timezone);
        setPaymentInfo(response.data.payment_info);
        setWishlist(response.data.wishlist);
        setOrderHistory(response.data.order_history);
        setNewsletterSubscription(response.data.newsletter_subscription);
        setVerified(response.data.verified);
        setCreatedAt(response.data.created_at);
        setLastLogin(response.data.last_login);
        setBirthDate(response.data.birth_date);
        setAddress(response.data.address);
        setFirstName(response.data.first_name);
        setLastName(response.data.last_name);
        setPhoneNumber(response.data.phone_number);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);  
  
  // Here we post the edited data, or delete it if that's what we wish, according to the button name
  const onUpdate = () => {
    // Creates new object with the updated data
    const obj = {
      username: username,
      password: password,
      description: description,
      language_preferences: languagePreferences,
      timezone:timezone,
      payment_info: paymentInfo,
      wishlist: wishlist,
      order_history: orderHistory,
      newsletter_subscription: newsletterSubscription,
      verified: verified,
      created_at: createdAt,
      last_login: lastLogin,
      birth_date: birthDate,
      address: address,
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    // Posts updated data
    axios
      .post(`https://e-commerce-model.onrender.com/users/update_user/${id}`, 
      obj
      )
      .then((res) => {
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Here we allow the user to either update or delete their profile, according to the name of the button
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
        <div>
        {textInput('Description', description, setDescription)}
        {selectorInput('Language Preference', languagePreferences, setLanguagePreferences, ['English', 'Portuguese'])}
        {textInput('Address', address, setAddress)}
        {dateInput('Birth Date', birthDate, setBirthDate)}
        {textInput('First Name', firstName, setFirstName)}
        {textInput('Last Name', lastName, setLastName)}
        {numberInput('Phone Number', phoneNumber, setPhoneNumber)}
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
