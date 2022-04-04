import {Wallet} from 'ethers';
import {generateMnemonic} from 'bip39';
export default function createETHWallet(count = 0){
    return new Promise(async (resolve, reject) => {
        const mnemonic = generateMnemonic(),seed = Wallet.fromMnemonic(mnemonic);
        if (count > 1) {
            if (new RegExp(`(\\w)\\1{${count},}$`,'gi').test(seed.address)) {
                resolve({
                    privateKey:seed.privateKey,
                    publicKey:seed.publicKey,
                    address:seed.address,
                    mnemonic
                })
            } else {
                resolve(false);
            };
        }
        resolve({
            privateKey:seed.privateKey,
            publicKey:seed.publicKey,
            address:seed.address,
            mnemonic
        })
    })
}
