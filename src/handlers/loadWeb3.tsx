import Web3 from "web3";

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    console.log("App -> window.ethereum", window.web3);
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

export default loadWeb3;
