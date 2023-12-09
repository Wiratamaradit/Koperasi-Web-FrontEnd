import {MenuItem} from "primereact/menuitem";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import {Card} from "primereact/card";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import withSessionCheck from "../../../src/base/utils/WithAuth";

const Pendaftaran = () => {

    const breadcrumbItems: MenuItem[] = [
        {label: 'Pendaftaran', url: '/master/pendaftaran'},
    ];

    return (
        <FullLayout>
            <PageContainer title="Pendaftaran">
                <Card
                    title="Pendaftaran"
                    className="mb-2"
                    subTitle={<BreadcrumbBase items={breadcrumbItems}/>}
                    pt={{
                        body: {className: 'border-round border-200 border-2 surface-overlay'},
                        title: {className: 'ml-3 mt-1 text-xl'},
                        subTitle: {className: 'mb-0'},
                    }}
                />
            </PageContainer>
        </FullLayout>
    )
}

export default withSessionCheck(Pendaftaran)