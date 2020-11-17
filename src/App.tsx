import "./App.css";

import React, { useEffect, useState } from "react";

import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

function App() {
  const [currentMsg, setCurrentMsg] = useState<string>("");
  const [account, setAccount] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      console.log("App -> window.web3", window.web3);
      await window.ethereum.enable();
    } else if (window.web3) {
      console.log("App -> window.web3", window.web3);
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  useEffect(() => {
    loadBlockchainData();
    loadWeb3();
  }, []);

  const handleMsg = (event: any) => {
    event.preventDefault();
    setCurrentMsg(event.target.value);
  };

  const sendMsg = (event: any) => {
    event.preventDefault();
    alert(`just test ${currentMsg}`);
  };

  return (
    <div className="App">
      <h1>Hellou world dapp on ethereum smart contract and IPFS</h1>
      <header className="App-header"></header>
      <h2>short message box</h2>
      {account && `connected account ${account}`}
      <br />
      <br />
      <form onSubmit={sendMsg}>
        <input onChange={handleMsg}></input>
        <button onClick={sendMsg}>send message</button>
      </form>
    </div>
  );
}

export default App;
