import React, { Component, PropTypes } from "react";
import classnames from "classnames";
import styles from "./FriendListItem.css";

class FriendListItem extends Component {
  render() {
    return (
      <li className={styles.friendListItem}>
        <div className={styles.friendInfos}>
          <div>
            <span>{this.props.personDetails.name}</span>
          </div>
          <div>
            <small>xx friends in common</small>
          </div>
          <div>
            <small>
              {this.props.personDetails.gender.charAt(0).toUpperCase() +
                this.props.personDetails.gender.slice(1)}
            </small>
          </div>
        </div>
        <div className={styles.friendActions}>
          <button
            className={`btn btn-default ${styles.btnAction}`}
            onClick={() => this.props.starFriend(this.props.id)}
          >
            <i
              className={classnames("fa", {
                "fa-star": this.props.starred,
                "fa-star-o": !this.props.starred
              })}
            />
          </button>
          <button
            className={`btn btn-default ${styles.btnAction}`}
            onClick={() => this.props.deleteFriend(this.props.id)}
          >
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );
  }
}

FriendListItem.propTypes = {
  id: PropTypes.number.isRequired,
  personDetails: PropTypes.object.isRequired,
  starred: PropTypes.bool,
  starFriend: PropTypes.func.isRequired
};

export default FriendListItem;
