import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import styles from "./AddFriendInput.css";

class AddFriendInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name: this.props.name || "",
      gender: "",
      showGender: false
    };
  }

  handleChange(e) {
    this.setState({ name: e.target.value });
  }

  onGenderChanged = e => {
    this.setState({
      gender: e.currentTarget.value
    });
  };

  handleKeyDown(e) {
    const name = e.target.value.trim();
    if (e.which === 13) {
      this.setState({ showGender: true });
    }
  }

  handleSubmit(e) {
    const personDetails = {
      name: this.state.name,
      gender: this.state.gender
    };
    this.props.addFriend(personDetails);
    this.setState({ name: "", gender: "", showGender: false });
  }
  
  render() {
    return (
      <div>
        <input
          type="text"
          autoFocus="true"
          className={classnames("form-control", styles.addFriendInput)}
          placeholder="Type the name of a friend"
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
        {this.state.showGender && (
          <div className={styles.gender}>
            <label htmlFor="male">
              <input
                type="radio"
                name="gender"
                value="male"
                id="male"
                onChange={this.onGenderChanged.bind(this)}
              />
              <span className="label">Male</span>
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                name="gender"
                value="female"
                id="female"
                onChange={this.onGenderChanged.bind(this)}
              />
              <span className="label">Female</span>
            </label>
            <button
              className={`btn btn-default ${styles.btnAction}`}
              onClick={this.handleSubmit.bind(this)}
            >
              Save
            </button>
          </div>
        )}
      </div>
    );
  }
}

AddFriendInput.propTypes = {
  addFriend: PropTypes.func.isRequired
};

export default AddFriendInput;
