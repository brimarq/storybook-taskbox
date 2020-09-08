/** 
 * As our app is very simple, the screen we’ll build is pretty trivial, simply wrapping 
 * the TaskList component (which supplies its own data via Redux) in some layout and 
 * pulling a top-level error field out of redux (let's assume we'll set that field if 
 * we have some problem connecting to our server).
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import TaskList from "./TaskList";

export function PureInboxScreen({error}) {
  if (error) {
    return (
      <div className="page lists-show">
        <div className="wrapper-message">
          <span className="icon-face-sad" />
          <div className="title-message">Oh no!</div>
          <div className="subtitle-message">Something went wrong</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page lists-show">
      <nav>
        <h1 className="title-page">
          <span className="title-wrapper">Taskbox</span>
        </h1>
      </nav>
      <TaskList />
    </div>
  );
}

PureInboxScreen.propTypes = {
  /** The error message */
  error: PropTypes.string
};

PureInboxScreen.defaultProps = {
  error: null
};

export default connect(({ error }) => ({ error }))(PureInboxScreen);
