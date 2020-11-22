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
  const [contract, setContract] = useState<any>();
  const [contractMsg, setContractMsg] = useState("");

  useEffect(() => {
    (async () => {
      await loadWeb3();
      const loadedContract = await loadBlockchainData();
      if (!loadedContract) return;

      setContract(loadedContract);

      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();

      if (accounts && accounts.length > 0) {
        setAccount(accounts[0]);
      }

      const blockchainMsg = await loadedContract.methods.get().call();
      if (blockchainMsg) {
        setContractMsg(blockchainMsg);
      }
    })();
  }, []);

  const handleMsg = (event: any) => {
    event.preventDefault();
    setCurrentMsg(event.target.value);
  };

  const sendMsg = async (event: any) => {
    event.preventDefault();
    if (!account || !contract) {
      alert(`||| account or contract missing |||`);
      return;
    }
    const res = await contract.methods.set(currentMsg).send({ from: account });
  };

  const getMsg = async () => {
    if (!contract) return;
    const msg = await contract.methods.get().call();
    if (msg) {
      setContractMsg(msg);
      return;
    }
    alert(`no message ]><[`);
  };

  return (
    <div className="container">
      <div className="app">
        <h2>Hellou world dapp with ethereum smart contract on IPFS</h2>
        contract message: <br />
        <b>{contractMsg}</b>
        <br />
        <br />
        connected account:
        <br />
        <b>{account}</b>
        <br />
        <br />
        <form onSubmit={sendMsg}>
          <input maxLength={30} onChange={handleMsg}></input>
          <button onClick={sendMsg}>change message</button>
        </form>
        <br />
        <br />
        <button onClick={getMsg}>get message</button>
      </div>
    </div>
  );
}

export default App;
