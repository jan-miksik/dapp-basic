const loadBlockchainData = async () => {
  const web3 = window.web3;
  console.log("App -> web3", web3);
  const accounts = await web3.eth.getAccounts();
  console.log("App -> accounts", accounts);
  if (accounts && accounts.length > 0) {
    return accounts;
  } else {
    return null;
  }
};

export default loadBlockchainData;
