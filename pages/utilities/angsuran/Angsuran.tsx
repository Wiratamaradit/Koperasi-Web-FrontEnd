import withSessionCheck from "../../../src/base/utils/WithAuth";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import React from "react";
import {Card} from "primereact/card";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import {MenuItem} from "primereact/menuitem";

const Angsuran = () => {

    const breadcrumbItems: MenuItem[] = [
        {label: 'Angsuran', url: '/utilities/angsuran'},
    ];

    return (
        <FullLayout>
            <PageContainer title="Angsuran">
                <Card
                    title="Angsuran"
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

export default withSessionCheck(Angsuran)