import React from 'react';
import PropTypes from 'prop-types';

// Basic Task component w/attributes we'll need & the two actions allowed on a task (to move it between lists). 
export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div className={`list-item ${state}`}>
      <label className="checkbox">
        <input 
          type="checkbox" 
          defaultChecked={state === 'TASK_ARCHIVED'}
          disabled={true} 
          name="checked"
        />
        <span className="checkbox-custom" onClick={() => onArchiveTask(id)} />
      </label>
      <div className="title">
        <input 
          type="text" 
          value={title} 
          readOnly={true} 
          placeholder="Input title" 
          style={{ textOverflow: 'ellipsis' }}
        />
      </div>

      <div className="actions" onClick={event => event.stopPropagation()}>
        {state !== 'TASK_ARCHIVED' && (
          // eslint-disable-next-line jsx-a11y/anchor-is-valid 
          <a onClick={() => onPinTask(id)}>
            <span className={`icon-star`} />
          </a>
        )}
      </div>
    </div>
  );
}



/**
 * It’s best practice to use propTypes in React to specify the shape of data that a component expects. 
 * Not only is it self documenting, it also helps catch problems early, as a warning in development 
 * will appear if the Task component is misused.
 */

Task.propTypes = {
  /** Composition of the task */
  task: PropTypes.shape({
    /** Id of the task */
    id: PropTypes.string.isRequired,
    /** Title of the task */
    title: PropTypes.string.isRequired,
    /** Current state of the task */
    state: PropTypes.string.isRequired,
  }),
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
};
