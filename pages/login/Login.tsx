import PageContainer from "../../src/components/container/PageContainer";
import React, {useEffect, useRef, useState} from "react";
import {Box, Card, Grid} from "@mui/material";
import BlankLayout from '../../src/layouts/blank/BlankLayout'
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {Toast} from 'primereact/toast';
import {Button} from "primereact/button";
import DynamicPricing from "../../src/components/shared/dynamic-pricing/DynamicPricing";
import {useRouter} from "next/router";
import withoutSessionCheck from "../../src/base/utils/WithoutAuth";
import {login} from "../../src/service/auth";

const Login = () => {
    const router = useRouter()
    const toast = useRef<Toast | null>(null);

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const [loading, setLoading] = useState<boolean>(false)

    const onSubmit = async () => {
        try {
            setLoading(true)
            const response = await login(email, password)
            localStorage.setItem('sessionAuth', JSON.stringify({auth: true, data: response.data}));
            toast.current!.show({
                severity: 'success',
                summary: 'Success',
                detail: 'Login Berhasil',
                life: 3000
            });
            setLoading(false)
            router.push('/')
        } catch (error: any) {
            toast.current!.show({
                severity: 'error',
                summary: 'Error',
                detail: `${error.response.data.message}`,
                life: 3000
            });
            setLoading(false)
        }
    }

    const handleButton = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit();
    };

    return (
        <BlankLayout>
            <PageContainer title="Login" description="this is Login">
                <Box
                    sx={{
                        position: 'relative',
                        '&:before': {
                            content: '""',
                            backgroundImage: 'url(/images/backgrounds/bg_ptpl.svg)',
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover"
                        },
                    }}
                >
                    <Grid container spacing={0} justifyContent="center" sx={{height: '100vh'}}>
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            lg={4}
                            xl={3}
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Card sx={{p: 4, zIndex: 1, width: '100%', maxWidth: '500px', background: "transparent"}}>
                                < DynamicPricing/>
                                <Toast ref={toast}/>
                                <form onSubmit={handleButton} className="flex flex-column gap-2">
                                    <InputText
                                        value={email}
                                        placeholder="Email"
                                        className="mt-4 p-inputtext-sm"
                                        style={{borderRadius: "12px"}}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    />
                                    <Password
                                        placeholder="Password"
                                        className="mt-2 p-inputtext-sm p-password-info"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        toggleMask
                                        inputStyle={{width: "100%", borderRadius: "12px"}}
                                        feedback={false}
                                    />
                                    <div className="card flex flex-wrap justify-content-center mt-5">
                                        <Button label="Login" size="small" severity="success" raised
                                                style={{width: "50%", borderRadius: "10px"}} loading={loading}
                                                onClick={onSubmit}/>
                                    </div>
                                </form>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </PageContainer>
        </BlankLayout>
    )
}

export default withoutSessionCheck(Login)