import React from 'react';

// Basic Task component w/attributes we'll need & the two actions allowed on a task (to move it between lists). 
export default function Task({ task: { id, title, state }, onArchiveTask, onPinTask }) {
  return (
    <div classname="list-item">
      <input type="text" value={title} readOnly={true} />
    </div>
  );
}
