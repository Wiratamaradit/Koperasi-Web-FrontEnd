import withSessionCheck from "../../src/base/utils/WithAuth";
import FullLayout from "../../src/layouts/full/FullLayout";
import PageContainer from "../../src/components/container/PageContainer";
import {MenuItem} from "primereact/menuitem";
import {Card} from "primereact/card";
import BreadcrumbBase from "../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import React from "react";

const Laporan = () => {

    const breadcrumbItems: MenuItem[] = [
        {label: 'Laporan', url: '/utilities/laporan'},
    ];

    return (
        <FullLayout>
            <PageContainer title="Laporan">
                <Card
                    title="Laporan"
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

export default withSessionCheck(Laporan)