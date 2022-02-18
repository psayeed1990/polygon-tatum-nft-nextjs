import Link from "next/link";

const Menus = () => {
    return (
        <nav>
            <Link href="/">
                <a className="menus">Home</a>
            </Link>
            <Link href="/create-smart-contract">
                <a className="menus">Create NFT Smart Contract</a>
            </Link>
            <Link href="/upload-image-ipfs">
                <a className="menus">Upload Image to IPFS</a>
            </Link>
        </nav>
    );
};

export default Menus;
