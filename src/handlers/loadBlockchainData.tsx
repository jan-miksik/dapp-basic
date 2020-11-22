import Message from "../abis/Message.json";

interface Message {
  networks: any;
}

const loadBlockchainData = async () => {
  const web3 = window.web3;

  const networkId = await web3.eth.net.getId();
  // @ts-ignore
  const networkData = Message.networks[networkId];

  if (networkData) {
    const contract = await new web3.eth.Contract(
      Message.abi,
      networkData.address
    );
    if (contract) return contract;
  } else {
    window.alert("Smart contract not deployed to detected network.");
  }
};

export default loadBlockchainData;
