import React, { Component } from "react";
import apiHandler from "./../../api/apiHandler";

export class FormSettings extends Component {
    state={
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        phoneNumber:""
    }

 
    handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        this.setState({ [key]: value });
      };

      handleSubmit = (event) => {
        event.preventDefault();
            apiHandler
          .updateUser(this.state)
          .then((data) => {
            this.props.history.push("/profile");
          })      
          .catch((error) => {
            console.log(error);
          });
      };

  render() {
    return (
      <div>
        <form
          autoComplete="off"
          className="form"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
        >
          <h2 className="title">Edit Profile</h2>

          <div className="form-group">
            <label className="label" htmlFor="firstName">
              First name
            </label>
            <input
              className="input"
              id="firstName"
              type="text"
              name="firstName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="lastName">
              Last Name
            </label>
            <input
              className="input"
              id="lastName"
              type="text"
              name="lastName"
            />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input className="input" id="email" type="email" name="email" />
          </div>

          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              id="password"
              type="password"
              name="password"
            />
          </div>

          <button className="btn-submit">Save</button>
        </form>

        <div
            className="user-contact"
            
          >
            <h4>Edit phone number</h4>

            <form
              className="form"
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            >
              <div className="form-group">
                <label className="label" htmlFor="phoneNumber">
                  Phone number
                </label>
                <input
                  className="input"
                  id="phoneNumber"
                  type="text"
                  name="phoneNumber"
                  placeholder="Add phone number"
                />
              </div>
              <button className="form__button">Save phone number</button>
            </form>
          </div>
      </div>
    );
  }
}

export default FormSettings;
