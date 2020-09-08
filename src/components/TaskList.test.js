import React from 'react';
import ReactDOM from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import { WithPinnedTasks } from './TaskList.stories';

/** 
 * Unit tests with Jest 
 * 
 * Storybook stories, manual tests, and snapshot tests go a long way to avoiding UI bugs. 
 * If stories cover a wide variety of component use cases, and we use tools that ensure a 
 * human checks any change to the story, errors are much less likely. 
 * 
 * However, sometimes the devil is in the details. A test framework that is explicit about 
 * those details is needed. Which brings us to unit tests. 
 * 
 * In our case, we want our TaskList to render any pinned tasks before unpinned tasks that 
 * it has passed in the tasks prop. Although we have a story (WithPinnedTasks) to test 
 * this exact scenario, it can be ambiguous to a human reviewer that if the component 
 * stops ordering the tasks like this, it is a bug. It certainly won’t scream “Wrong!” to 
 * the casual eye. 
 * 
 * So, to avoid this problem, we can use Jest to render the story to the DOM and run some 
 * DOM querying code to verify salient features of the output. The nice thing about the 
 * story format is that we can simply import the story in our tests, and render it there!
 */

it('renders pinned tasks at the start of the list', () => {
  const div = document.createElement('div');
  // Our story will be used for the test.
  // With the arguments that were created.
  ReactDOM.render(<WithPinnedTasks {...WithPinnedTasks.args} />, div);

  // We expect the task titled "Task 6 (pinned)" to be rendered first, not at the end
  const lastTaskInput = div.querySelector('.list-item:nth-child(1) input[value="Task 6 (pinned)"]');
  expect(lastTaskInput).not.toBe(null);

  ReactDOM.unmountComponentAtNode(div);
});

/** 
 * Note that we’ve been able to reuse the WithPinnedTasks story in our unit test; in this 
 * way we can continue to leverage an existing resource (the examples that represent 
 * interesting configurations of a component) in many ways. 
 * 
 * Notice as well that this test is quite brittle. It's possible that as the project 
 * matures, and the exact implementation of the Task changes --perhaps using a different 
 * classname or a textarea rather than an input--the test will fail, and need to be 
 * updated. This is not necessarily a problem, but rather an indication to be careful 
 * about liberally using unit tests for UI. They're not easy to maintain. Instead rely on 
 * manual, snapshot, and visual regression (see testing chapter) tests where possible.
 */
