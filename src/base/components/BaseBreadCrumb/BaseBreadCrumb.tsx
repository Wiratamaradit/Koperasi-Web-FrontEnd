import {BreadCrumb} from 'primereact/breadcrumb';
import {MenuItem} from 'primereact/menuitem';

interface BreadcrumbBaseProps {
    items: MenuItem[];
}

const BreadcrumbBase: React.FC<BreadcrumbBaseProps> = ({items}) => {
    const home: MenuItem = {icon: 'pi pi-home', url: '/'}
    return <BreadCrumb
            model={items}
            home={home}
            style={{border: "none"}}
        />;
};

export default BreadcrumbBase;