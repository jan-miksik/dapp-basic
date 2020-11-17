import "./App.css";

import React, { useEffect, useState } from "react";

import loadBlockchainData from "./handlers/loadBlockchainData";
import loadWeb3 from "./handlers/loadWeb3";

declare global {
  interface Window {
    ethereum: any;
    web3: any;
  }
}

function App() {
  const [currentMsg, setCurrentMsg] = useState<string>("");
  const [account, setAccount] = useState("");

  useEffect(() => {
    (async () => {
      await loadWeb3();
      const accounts = await loadBlockchainData();
      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }
    })();
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
