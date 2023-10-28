import { Menu, MenuProps } from "antd"
import { Link } from "react-router-dom";
import { adminNavRoutes, adminNavRoutesKeysType } from "../../consts/routes";
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }
export const NavPanel = () => {
    const menuItems:MenuProps['items'] = Object.keys(adminNavRoutes).map((key) => 
        getItem(<Link to={adminNavRoutes[key as adminNavRoutesKeysType].route}>{adminNavRoutes[key as adminNavRoutesKeysType].title}</Link>,adminNavRoutes[key as adminNavRoutesKeysType].route));

    return <Menu items={menuItems}
                style={{width:'200px',position:'fixed',left:'0',height:'100%'}}
                />
}