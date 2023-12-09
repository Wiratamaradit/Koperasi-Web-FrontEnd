import {ComponentType, useEffect} from 'react';
import {useRouter} from 'next/router';

type WithSessionCheckProps = {};

const withSessionCheck = <P extends Record<string, unknown>>(
    WrappedComponent: ComponentType<P>
) => {
    const WithSessionCheck: React.FC<P & WithSessionCheckProps> = (props) => {
        const router = useRouter();

        useEffect(() => {
            if (typeof window !== 'undefined') {
                const sessionData = localStorage.getItem('sessionAuth');
                if (!sessionData) {
                    router.replace('/login');
                }
            }
        }, []);
        return <WrappedComponent {...props} />;
    };
    return WithSessionCheck;
};

export default withSessionCheck;