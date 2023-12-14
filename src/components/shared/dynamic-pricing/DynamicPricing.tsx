import React from "react";
import Image from 'next/image';
import myImage from 'public/images/logos/koperasilogo.png';

const DynamicPricing = () => {
    return (
        <div className="card flex flex-wrap justify-content-center text-white text-lg lg:font-bold mt-5">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src={myImage}
                    alt="logo"
                    width={100}
                    height={100}
                />
                <label
                    style={{
                        fontFamily: 'sans-serif',
                        letterSpacing: 5,
                        marginLeft: '10px',
                    }}
                >
                    KOPERASI
                </label>
            </div>
        </div>
    );
};

export default DynamicPricing;
