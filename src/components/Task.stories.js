import React from 'react';
import Task from './Task';

/** 
 * There are two basic levels of organization in Storybook: the component and its child stories.
 * Think of each story as a permutation of a component. You can have as many stories per component as you need.
 */

/** 
 * To tell Storybook about the component we are documenting, we create a default export that contains:
 *    component -- the component itself,
 *    title -- how to refer to the component in the sidebar of the Storybook app,
 *    excludeStories -- exports in the story file that should not be rendered as stories by Storybook.
 *    argTypes -- specify the args behavior in each story.
 */
export default {
  component: Task,
  title: 'Task', 
  parameters: {
    assets: [
      'designs/app.png',
      'designs/items.png',
      'designs/list-1.png',
      'designs/list-2.png'
    ]
  },
  argTypes: {
    /** ...actionsData, */
    backgroundColor: { control: 'color' }
  }
};

/** 
 * As we have multiple permutations of our component, it's convenient to assign it to a Template variable. 
 * Introducing this pattern in your stories will reduce the amount of code you need to write and maintain. 
 * Template.bind({}) is a standard JavaScript technique for making a copy of a function. 
 * We use this technique to allow each exported story to set its own properties, but use the same implementation.
 */
const Template = args => <Task {...args} />;

 

/** 
 * To define our stories, we export a function for each of our test states to generate a story.
 * The story is a function that returns a rendered element (i.e. a component with a set of props) in 
 * a given state---exactly like a Stateless Functional Component.
 */
export const Default = Template.bind({});
/**
 * Arguments (args) allow us to live edit our components with the controls addon without restarting Storybook. 
 * Once an args value changes so does the component. 
 * When creating a story we use a base task arg to build out the shape of the task the component expects. 
 * This is typically modelled from what the true data looks like. Exporting this shape will enable its reuse in later stories
 */
Default.args = {
  task: {
    id: '1',
    title: 'Test Task',
    state: 'TASK_INBOX',
    updatedAt: new Date(2018, 0, 1, 9, 0)
  }
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_PINNED'
  }
};

export const Archived = Template.bind({});
Archived.args = {
  task: {
    ...Default.args.task,
    state: 'TASK_ARCHIVED'
  }
};

const longTitleString = `This task's name is absurdly large. In fact, I think if I keep going I might end up with content overflow. What will happen? The star that represents a pinned task could have text overlapping. The text could cut-off abruptly when it reaches the star. I hope not!`;

export const LongTitle = Template.bind({});
LongTitle.args = {
  task: {
    ...Default.args.task,
    title: longTitleString
  }
}
/** 
 * Actions help you verify interactions when building UI components in isolation. 
 * Oftentimes you won't have access to the functions and state you have in context of the app. 
 * Use action() to stub them in.
 */
