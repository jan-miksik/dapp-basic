import Message from "../abis/Message.json";

// interface MessageType {
//   networks: any;
// }

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
    window.alert("Smart contract unavailable, are you on Kovan network?");
  }
};

export default loadBlockchainData;
