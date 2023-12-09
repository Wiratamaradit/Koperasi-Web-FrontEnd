import withoutSessionCheck from "../../src/base/utils/WithoutAuth";
import BlankLayout from "../../src/layouts/blank/BlankLayout";
import PageContainer from "../../src/components/container/PageContainer";
import {Box, Card, Grid} from "@mui/material";
import Logo from "../../src/layouts/full/shared/logo/Logo";
import React, {useState} from "react";
import DynamicPricing from "../../src/components/shared/dynamic-pricing/DynamicPricing";
import {InputText} from "primereact/inputtext";
import {Password} from "primereact/password";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../src/base/store/store";
import {useRouter} from "next/router";
import {Button} from "primereact/button";
import {register} from "../../src/base/store/slices/auth/register";
import {Message} from "primereact/message";

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()

    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [phoneNumber, setPhoneNumber] = useState<string | number | undefined | null>()
    const [address, setAddress] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')

    const loading = useSelector((state: RootState) => state.register.loading);
    const error = useSelector((state: RootState) => state.register.error);
    const success = useSelector((state: RootState) => state.register.success);

    const onSubmit = async () => {
        const action: any = await dispatch(register({
            Name: name,
            Identity: email,
            PhoneNumber: phoneNumber,
            Address: address,
            Password: password,
            ConfirmPassword: confirmPassword,
            router
        }));
    }
    const handleButton = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit();
    };

    const backLogin = () => {
        router.push('/login')
    }

    return (
        <BlankLayout>
            <PageContainer title="Register">
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
                                <Box display="flex" alignItems="center" justifyContent="center"
                                     sx={{background: "transparent"}}>
                                    <Logo/>
                                </Box>
                                < DynamicPricing/>
                                <label
                                    style={{
                                        fontFamily: 'sans-serif',
                                        letterSpacing: 2
                                    }}
                                    className="card flex flex-wrap justify-content-center text-white text-lg mt-5"
                                >
                                    Register
                                </label>
                                {error && <Message className="mt-4" severity="error" text={error}/>}
                                {success && <Message className="mt-4" severity="success" text={success}/>}
                                <form onSubmit={handleButton} className="flex flex-column gap-2">
                                    <InputText
                                        placeholder="Name"
                                        className="mt-4 p-inputtext-sm"
                                        style={{borderRadius: "12px"}}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                    />
                                    <InputText
                                        placeholder="Email"
                                        className="mt-2 p-inputtext-sm"
                                        style={{borderRadius: "12px"}}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                    />
                                    <InputText
                                        keyfilter="int"
                                        placeholder="Phone Number"
                                        className="mt-2 p-inputtext-sm"
                                        style={{borderRadius: "12px"}}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value)}
                                    />
                                    <InputText
                                        placeholder="Address"
                                        className="mt-2 p-inputtext-sm"
                                        style={{borderRadius: "12px"}}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
                                    />
                                    <Password
                                        placeholder="Password"
                                        className="mt-2 p-inputtext-sm p-password-info"
                                        value={password}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                        toggleMask
                                        inputStyle={{width: "100%", borderRadius: "12px"}}
                                    />
                                    <Password
                                        placeholder="Confirm Password"
                                        className="mt-2 mb-4 p-inputtext-sm p-password-info"
                                        value={confirmPassword}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                        toggleMask
                                        inputStyle={{width: "100%", borderRadius: "12px"}}
                                        feedback={false}
                                    />
                                    <div className="card flex flex-wrap justify-content-center">
                                        <Button label="Register" size="small" severity="success" raised
                                                style={{width: "50%", borderRadius: "10px"}} loading={loading}
                                                onClick={onSubmit}/>
                                    </div>
                                    <div className="card flex flex-wrap justify-content-center">
                                        <Button label="Back To Login" size="small" severity="danger" raised
                                                style={{width: "50%", borderRadius: "10px"}} onClick={backLogin}/>
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

export default withoutSessionCheck(Register)