import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import Menus from "../components/Menus";
import styles from "../styles/Home.module.css";

export default function Home() {
    const [message, setMessage] = useState("");
    const [account, setAccount] = useState(null);
    const [metaMaskInstalled, setMetaMaskInstalled] = useState(false);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const getAccounts = async () => {
            if (typeof window !== "undefined") {
                //Have to check the ethereum binding on the window object to see if it's installed
                const { ethereum } = window;

                if (Boolean(ethereum && ethereum.isMetaMask)) {
                    //const accounts = ethereum.enable();

                    const accounts = await ethereum.request({
                        method: "eth_requestAccounts",
                    });
                    setAccount(accounts[0]);

                    setMetaMaskInstalled(true);
                } else {
                    setMetaMaskInstalled(false);
                }
            }
        };
        getAccounts();
    }, []);

    const connectMetamask = async () => {
        const { ethereum } = window;
        //If MetaMask is installed, then we can get the accounts

        //const accounts = await ethereum.enable();
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
    };

    const mintNFT = async () => {
        try {
            const response = await fetch(
                "http://carpulqbzm.us10.qoddiapp.com/mint-nft",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        account,
                    }),
                }
            );
            const data = await response.json();
            console.log(data);
            const metamask = await ethereum.request({
                method: "eth_sendTransaction",
                params: [data],
            });

            console.log(metamask);

            setMessage(`Minted NFT details: `, metamask);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Mint Qoddi NFT</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {token ? (
                    <div>
                        <h1 className={styles.title}>{messgae}</h1>
                    </div>
                ) : metaMaskInstalled ? (
                    <>
                        {account ? (
                            <p className={styles.description}>{account}</p>
                        ) : (
                            <button
                                onClick={connectMetamask}
                                className="enableMetamask"
                            >
                                Connect To MetaMask To Mint NFT of Qoddi Logo
                            </button>
                        )}
                        <>
                            <Image
                                src="https://ipfs.io/ipfs/bafkreiazglfpx6bfnnobnkymqrwuq2c2gdkh5tunp2eusa4m64mv75j3ti"
                                width={300}
                                height="100"
                                alt="Qoddi Logo"
                            />
                            <button onClick={mintNFT}>
                                Mint NFT - Qoddi Logo
                            </button>
                        </>
                    </>
                ) : (
                    <h3>Metamask not Connected</h3>
                )}
            </main>

            <footer className={styles.footer}></footer>
        </div>
    );
}
