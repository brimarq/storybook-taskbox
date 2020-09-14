import React from "react";
import { AddonPanel } from "@storybook/components";
import { addons, types } from "@storybook/addons";
import { useParameter } from "@storybook/api";

const Content = () => {
  const results = useParameter('assets', []); // story's parameter being retrieved here
  return (
    <>
      {results.length ? (
        <ol>
          {results.map(i => (
            <li>{i}</li>
          ))}
        </ol>
      ) : null }
    </>
  );
};

addons.register('my/design-addon', () => {
  addons.add('design-addon/panel', {
    title: 'assets',
    type: types.PANEL,
    render: ({ active, key }) => (
      <AddonPanel active={active} key={key}>
        <Content />
      </AddonPanel>
    )
  });
});