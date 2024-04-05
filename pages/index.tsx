import PageContainer from '../src/components/container/PageContainer';
import FullLayout from '../src/layouts/full/FullLayout';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import withSessionCheck from "../src/base/utils/WithAuth";
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

function Home() {
    const router = useRouter()
    const [user, setUser] = useState({role: ''})

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("sessionAuth") || "{}")?.data)
      }, [])
      console.log(user)

    return (
        <FullLayout>
            <PageContainer title="Dashboard" description="this is Dashboard">
                <>
                    <div className="p-card-title">
                        <div className="col-md-4 mb-3" >
                            <Card title='Dashboard' style={{backgroundColor: '#1E1E2D', color: 'white'}}>
                                <p className="m-0" style={{color: 'white'}}>
                                    Selamat Datang di dashboard {user?.role}
                                </p>
                            </Card>
                        </div>
                    </div>

                        <div className="card flex flex-column md:flex-row gap-4">
                            <div className="col-md-4 mb-3">
                                <Card title="Data Anggota" className="md:w-19rem">
                                    <p className="m-0">
                                        10 Anggota
                                    </p>
                                </Card>
                            </div>
                        <div className="col-md-4 mb-3">
                            <Card title="Saldo Koperasi" className="md:w-19rem">
                                <p className="m-0">
                                    Rp. 25,000,000
                                </p>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-3">
                            <Card title="Data Pinjaman" className="md:w-20rem">
                                <p className="m-0">
                                    Rp. 26,000,000
                                </p>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                    <div className="card flex flex-column md:flex-row gap-4">
                        <div className="col-md-4 mb-3">
                            <Card title="Data Pinjaman" className="md:w-19rem">
                                <p className="m-0">
                                    Rp. 26,000,000
                                </p>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-3">
                            <Card title="Data Pengajuan" className="md:w-19rem">
                                <p className="m-0">
                                    Rp. 8,000,000
                                </p>
                            </Card>
                        </div>
                        <div className="col-md-4 mb-3">
                            <Card title="Angsuran Berjalan" className="md:w-20rem">
                                <p className="m-0">
                                    8 Anggota = Rp. 2,300,000/bulan
                                </p>
                            </Card>
                        </div>
                    </div>
                    </div>
                </>
            </PageContainer >
        </FullLayout >
    );
}

export default withSessionCheck(Home)
