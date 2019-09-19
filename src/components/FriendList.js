import React, { Component, PropTypes } from "react";
import styles from "./FriendList.css";
import FriendListItem from "./FriendListItem";
import Pagination from "./Pagination";

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendOnCurrentPage: [],
      relativeIndex: 0
    };
  }

  onPageChange({ friendOnCurrentPage, relativeIndex }) {
    // update state with new page of items
    this.setState({ friendOnCurrentPage, relativeIndex });
  }

  render() {
    const { friends, actions } = this.props;
    const { relativeIndex } = this.state;
    return (
      <div>
        <ul className={styles.friendList}>
          {this.state.friendOnCurrentPage.map((friend, index) => {
            return (
              <FriendListItem
                key={index}
                id={relativeIndex + index}
                personDetails={friend}
                starred={friend.starred}
                {...actions}
              />
            );
          })}
        </ul>
        <Pagination
          friends={friends}
          onPageChange={this.onPageChange.bind(this)}
        />
      </div>
    );
  }
}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
