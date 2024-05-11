import styled from 'styled-components';

import WidgetLayout from '../../layout/WidgetLayout';
import SiteLinkSetting from './SiteLinkSetting';
import SiteLinkTabContent from './SiteLinkTabContent';

import { useState } from 'react';
import { useWidgetLayerAction } from '@shared/stores/backgroundWidgetLayerStore';

import useSiteLinkStore from '@shared/stores/siteLinkStore';

type SiteLinkContainerProps = {
  height: number;
};

const SiteLinkContainer = ({ height }: SiteLinkContainerProps) => {
  const [currentTabSeq, setCurrentTabSeq] = useState<number>(0);
  const { updateWidgetVisible } = useWidgetLayerAction();

  // store에서 값 가져오기
  const data = useSiteLinkStore(state => state.data);

  const handleSelectTab = (tabSeq: number) => {
    setCurrentTabSeq(tabSeq);
  };

  // 위젯 숨김 처리 함수
  const handleClose = () => {
    updateWidgetVisible('SITE_LINK', false);
  };

  return (
    <WidgetLayout height={`${height}px`} onClose={handleClose}>
      <TabWrapper>
        <TabMenu className="notDraggable">
          {data.map(item => (
            <li
              key={item.tabSeq}
              className={
                item.tabSeq === currentTabSeq ? 'submenu focused' : 'submenu'
              }
              onClick={() => handleSelectTab(item.tabSeq)}>
              {item.tabTitle}
            </li>
          ))}
        </TabMenu>
        <TabContent height={`${height - 50}px`}>
          <SiteLinkTabContent linkList={data[currentTabSeq].linkList} />
        </TabContent>
      </TabWrapper>
      <SiteLinkSetting />
    </WidgetLayout>
  );
};

export default SiteLinkContainer;

const TabWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: transparent;
  display: flex;
  flex-direction: column;
`;

const TabMenu = styled.ul`
  background-color: rgba(0, 0, 0, 0.1);
  color: white;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin-top: 10px;
  height: 35px;
  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
    display: flex;
    justify-content: center;
    flex: 1;
    padding: 10px; // 탭 높이
    font-size: 15px;
    transition:
      color,
      background-color 0.5s;
  }

  .focused {
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
    color: rgb(45, 42, 42);
    background-color: rgba(0, 0, 0, 0.2);
    border-bottom: 2px solid black;
  }

  & li {
    cursor: pointer;
  }
`;

const TabContent = styled.div<{ height: string }>`
  height: ${props => props.height};
`;
