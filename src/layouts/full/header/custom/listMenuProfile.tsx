import {MenuItem} from 'primereact/menuitem';
import {Button} from "primereact/button";
import Link from "next/link";
import {useRouter} from "next/router";

export const listMenuProfile: MenuItem[] = [
    {
        template: (item, options) => {
            const router = useRouter();

            const handleLogout = async () => {
                localStorage.removeItem('sessionAuth')
                router.push('/login')
            };
            return (
                <div className="card flex justify-content-center background-#1E1E2D">
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