import {ComponentType, useEffect} from 'react';
import {useRouter} from 'next/router';

type WithoutSessionCheckProps = {};

const withoutSessionCheck = <P extends Record<string, unknown>>(
    WrappedComponent: ComponentType<P>
) => {
    const withoutSessionCheck: React.FC<P & WithoutSessionCheckProps> = (props) => {
        const router = useRouter();

        useEffect(() => {
            if (typeof window !== 'undefined') {
                const sessionData = localStorage.getItem('sessionAuth');
                if (sessionData) {
                    router.replace('/');
                }
            }
        }, []);
        return <WrappedComponent {...props} />;
    };
    return withoutSessionCheck;
};

export default withoutSessionCheck;