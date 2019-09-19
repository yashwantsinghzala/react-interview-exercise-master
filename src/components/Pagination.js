import React, { PropTypes } from "react";
import styles from "./Pagination.css";

class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: props.initialPage };
  }

  componentWillMount() {
    // set page if items array isn't empty
    if (this.props.friends && this.props.friends.length) {
      this.setPage();
    }
  }

  componentDidUpdate(prevProps) {
    // reset page if friends array has changed
    const currentTotalFriends = this.props.friends.length;
    const prevTotalFriends = prevProps.friends.length;
    if (prevTotalFriends !== currentTotalFriends) {
      if (currentTotalFriends < prevTotalFriends &&
        currentTotalFriends % this.props.fixedRecordOnPage === 0) {
        this.setState({ currentPage: this.state.currentPage - 1 }, () => {
          this.setPage();
        })
      } else {
        this.setPage()
      }
    }
  }

  setPage() {
    const { fixedRecordOnPage } = this.props;
    const { currentPage } = this.state;
    const friendOnCurrentPage = this.getCurrentPageFriends(currentPage);
    // call change page function in parent component
    this.props.onPageChange({ friendOnCurrentPage, relativeIndex: currentPage * fixedRecordOnPage - fixedRecordOnPage });
  }

  getCurrentPageFriends(currentPage) {
    const { fixedRecordOnPage, friends } = this.props;
    return friends.slice(currentPage * fixedRecordOnPage - fixedRecordOnPage, currentPage * fixedRecordOnPage);
  }

  onPreviousClick(e) {
    this.setState({ currentPage: this.state.currentPage - 1 }, () => {
      this.setPage();
    });
  }

  onNextClick(e) {
    this.setState({ currentPage: this.state.currentPage + 1 }, () => {
      this.setPage();
    });
  }

  onDropDownChange(e) {
    const currentPage = parseInt(e.target.value);
    this.setState({ currentPage }, () => {
      this.setPage(this.state.currentPage);
    });
  }

  render() {
    const { currentPage } = this.state;
    const { initialPage } = this.props;
    const totalPages = Math.ceil(this.props.friends.length / this.props.fixedRecordOnPage);
    const totalPagesArray = Array(totalPages).fill("");
    return (
      <div className="div-page-main">
        <button
          className={`btn btn-default ${styles.prevBtn}`}
          disabled={currentPage === initialPage}
          onClick={() => this.onPreviousClick()}
        >
          <i className="fa fa-caret-left pgIcons" aria-hidden="true"></i>
        </button>
        <select value={currentPage} onChange={(e) => this.onDropDownChange(e)} className={styles.pages}>
          {
            totalPagesArray.map((d, i) => {
              return (
                <option key={i} >
                  {i + 1}
                </option>
              );
            })}
        </select>
        <button
          className={`btn btn-default ${styles.nextBtn}`}
          disabled={totalPages === currentPage}
          onClick={() => this.onNextClick()}
        >
          <i className="fa fa-caret-right pgIcons" aria-hidden="true"></i>
        </button>
      </div>
    );
  }
}

Pagination.propTypes = {
  friends: PropTypes.array.isRequired,
  onChangePage: PropTypes.func.isRequired,
  currentPage: PropTypes.number
};

Pagination.defaultProps = {
  initialPage: 1,  // initial page
  fixedRecordOnPage: 2 // maximum no of records we want to show on the screen
};

export default Pagination;
