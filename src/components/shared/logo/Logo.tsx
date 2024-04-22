import Image from "next/image";
import myImage from "public/images/logo_koperasi-removebg-preview.png";

const Logo = () => {
  return (
    <div className="card flex flex-wrap justify-content-center text-white text-lg lg:font-bold mt-5">
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image src={myImage} alt="logo" width={400} height={150} />
        <label
          style={{
            fontFamily: "sans-serif",
            letterSpacing: 5,
            marginLeft: "10px",
          }}
        >
        </label>
      </div>
    </div>
  );
};

export default Logo;
