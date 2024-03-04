import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';


interface Props {
  handleNavigation: (key: number) => void;
}


const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Search',
  },
  {
    key: '2',
    label: 'Rated',
  },
];

export const Navigation = ({handleNavigation}: Props) => <Tabs defaultActiveKey="1" items={items} onChange={(key) => handleNavigation(Number(key))} centered/>;

