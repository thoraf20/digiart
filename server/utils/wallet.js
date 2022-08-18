import { Wallet } from 'ethers';  

export const generateWallet = (id) => {
  const privateKey = "0x"+id;

  const wallet = new Wallet(privateKey);

  return wallet.address
}
