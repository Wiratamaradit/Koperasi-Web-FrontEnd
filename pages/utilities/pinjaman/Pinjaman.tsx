import withSessionCheck from "../../../src/base/utils/WithAuth";
import FullLayout from "../../../src/layouts/full/FullLayout";
import PageContainer from "../../../src/components/container/PageContainer";
import BreadcrumbBase from "../../../src/base/components/BaseBreadCrumb/BaseBreadCrumb";
import {Card} from "primereact/card";
import React from "react";
import {MenuItem} from "primereact/menuitem";

const Pinjaman = () => {

    const breadcrumbItems: MenuItem[] = [
        {label: 'Pinjaman', url: '/utilities/pinjaman'},
    ];

    return (
        <FullLayout>
            <PageContainer title="Pinjaman">
                <Card
                    title="Pinjaman"
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

export default withSessionCheck(Pinjaman)