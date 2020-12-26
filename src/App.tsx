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
  const [msgToSend, setMsgToSend] = useState<string>("");
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState<any>();
  const [contractMsg, setContractMsg] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleMsg = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setMsgToSend(event.target.value);
  };

  const sendMsg = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    if (!account || !contract) {
      alert(`||| account or contract missing |||`);
      return;
    }
    setLoading(true);
    try {
      const res = await contract.methods
        .set(msgToSend)
        .send({ from: account })
        .on("receipt", function (receipt: any) {
          console.log("receipt: ", receipt);
        });

      const blockchainMsg = await contract.methods.get().call();
      if (blockchainMsg) {
        setContractMsg(blockchainMsg);
      }
      setMsgToSend("");
      setLoading(false);
      console.log("res: ", res);
    } catch (err) {
      console.log("err: ", err);
    }
  };

  const _title = () => (
    <h2>
      Hellou world dapp with ethereum smart contract on IPFS and{" "}
      <a
        href="https://kovan.faucet.enjin.io/"
        target="_blank"
        rel="noreferrer"
        title="to get kovan testing ether"
      >
        kovan testnet
      </a>
    </h2>
  );

  const _info = () => (
    <>
      contract message: <br />
      <b>{contractMsg}</b>
      <br />
      <br />
      connected account:
      <br />
      <b>{account}</b>
      <br />
      <br />
    </>
  );

  const _form = () => (
    <form onSubmit={sendMsg}>
      <input maxLength={30} onChange={handleMsg} value={msgToSend}></input>
      <button onClick={sendMsg}>change message</button>
    </form>
  );

  const _loader = () => (
    <div>
      <br />
      ... waiting for confirmation...
    </div>
  );

  return (
    <>
      <div className="container">
        <div className="app">
          <div className="app-content">
            {_title()}
            {_info()}
            {_form()}
            {loading && _loader()}
          </div>
        </div>
        <div className="app-bottom-space" />
      </div>
    </>
  );
}

export default App;
