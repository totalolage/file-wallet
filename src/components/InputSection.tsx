import { Tab } from '@headlessui/react';
import classNames from 'classnames';

import InputSectionCSS from './InputSection.module.css';

const InputSection = ({ className }: { className?: string }) => {
  return (
    <Tab.Group as="section" className={className}>
      <Tab.List className={InputSectionCSS.tabs}>
        <Tab
          className={classNames(
            InputSectionCSS.tab,
            InputSectionCSS.leftTab,
            InputSectionCSS.interactiveTab
          )}
        >
          <h2>File</h2>
        </Tab>
        <Tab
          className={classNames(
            InputSectionCSS.tab,
            InputSectionCSS.rightTab,
            InputSectionCSS.interactiveTab
          )}
        >
          <h2>Seed</h2>
        </Tab>
      </Tab.List>
      <Tab.Panels>
        <Tab.Panel className={InputSectionCSS.container}>Content 1</Tab.Panel>
        <Tab.Panel className={InputSectionCSS.container}>Content 2</Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default InputSection;