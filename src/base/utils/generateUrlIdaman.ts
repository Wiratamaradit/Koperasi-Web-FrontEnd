type PAYLOAD = {
    client_id: string,
    scope: string,
    response_mode: string,
    response_type: string,
    redirect_uri: string,
    nonce: string,
    state: string
}

const generateUrlIdaman = (props: PAYLOAD, URL: string) => {

    const searchParams = new URLSearchParams();

    // for (const key in Object.keys(props)) {
    //     if (Object.prototype.hasOwnProperty.call(props, key)) {
    //         searchParams.append(key, props[key]);
    //     }
    // }
    Object.keys(props).forEach((k:string) => {
        // @ts-ignore
        searchParams.append(k, props[k]);
    })

    const finalURL = `${URL}?${searchParams.toString()}`;

    return finalURL
}

export default generateUrlIdaman;