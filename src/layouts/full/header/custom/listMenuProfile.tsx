import {MenuItem} from 'primereact/menuitem';
import {Button} from "primereact/button";
import {useRouter} from "next/router";
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

export const listMenuProfile: MenuItem[] = [
    {
        template: (item, options) => {
            const router = useRouter();
            const toast = useRef<Toast>(null);

            const handleLogout = async () => {
                localStorage.removeItem('sessionAuth')
                router.push('/login')
                toast.current?.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Logout berhasil',
                    life: 3000
                });
            };
            return (
                <div className="card flex justify-content-center background-#1E1E2D">
                    <Toast ref={toast} />
                    <Button
                        onClick={handleLogout}
                        label="LOGOUT"
                        severity="danger"
                        raised
                        size="small"
                        className='w-full p-link flex align-items-center'
                    />
                </div>
            )
        }
    }
];