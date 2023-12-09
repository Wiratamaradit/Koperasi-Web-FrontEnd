import PageContainer from '../src/components/container/PageContainer';
import FullLayout from '../src/layouts/full/FullLayout';
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import withSessionCheck from "../src/base/utils/WithAuth";

function Home() {
    const router = useRouter()

    return (
        <FullLayout>
            <PageContainer title="Dashboard" description="this is Dashboard">
                <></>
            </PageContainer>
        </FullLayout>
    );
}

export default withSessionCheck(Home)
