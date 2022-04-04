import React,{useState} from 'react'
import ExportToExcel from '../utils/ExportToExcel'
import { Link } from "react-router-dom";
import Footer from '../components/Footer'
import Reward from '../components/Reward'
import SessionStorageData from '../components/SessionStorageData'
// import {createBTCWallet, createETHWallet} from '../utils/wallet/create'
import { CopyToClipboard as Clipboard } from "react-copy-to-clipboard";
import {createETHWallet} from '../utils/wallet/create'
const walletList = ['ETH']
const createWalletList = {
  createETHWallet
}
const createWallet = createWalletList[`create${walletList[0]}Wallet`]
let createWalletTime = null;
export default ()=> {
  const [currentAccounts, setCurrentAccounts] = useState(undefined);
  const [frequency, setFrequency] = useState(1);
  const [count, setCount] = useState(1);
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(false)
  const create = async () => {
    if (loading){
        clearInterval(createWalletTime)
        setLoading(false)
        return
    };
    setLoading(true);
    createWalletTime = setInterval(async () => {
        const result = await createWallet(count)
        if (result) {
            accounts.push(result)
            setAccounts([...accounts]);
        }
    },30)
  }
  const handleCopy = () => {
      alert("Copy Successify")
  }
  return (
    <>
      <div>
        <Link to="/">
          back Batch
        </Link>
        <h2 className="title">
          <a href="mailto:noshufu@gmail.com" target="_blank" className="title-author">
            <img src="data:image/jpeg;base64,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" alt=""/>
            NoShuFu
          </a>
          <p>
            Created Consecutive Ethereum Wallet
          </p>
          <span>V0.0.1</span>
        </h2>
        <hr/>
        <div className="Identity">
          <div className="itemBox">
            <div className="itemBox_title">
              <h3 className="label">Consecutive Number</h3>
            </div>
            <input className="CountInput" type="text" onChange={(e)=>{setCount(e.target.value)}} value={count}/>
          </div>
          <div>
          <button className="createButton" onClick={create}>
            {
                loading ? `Stop`:'Generate'
            }
          </button>
          </div>
        </div>
        <dl style={{marginBottom:"30px"}}>
            <dt>
              <h3 className="label">Accounts</h3>
            </dt>
            {
                accounts.map((item, index)=>(
                    <dd key={item.address.toLowerCase()}>
                        <span>{index+1}.{item.address.toLowerCase()}</span>
                        <Clipboard text={JSON.stringify(item)} onCopy={handleCopy}>
                            <button>Copy Item</button>
                        </Clipboard>
                    </dd>
                ))
            }
            {
                !accounts.length && (<dd>not data</dd>)
            }
        </dl>
        <Reward />
      </div>
      <Footer />
    </>
  );
}

