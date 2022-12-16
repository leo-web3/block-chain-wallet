import React,{useState} from 'react'
import { Link } from "react-router-dom";
import Footer from '../../components/Footer'
import Reward from '../../components/Reward'
import { CopyToClipboard as Clipboard } from "react-copy-to-clipboard";
import {createETHWallet} from '../../utils/wallet/create'
import MessageAlert from "../../components/MessageAlert";
const walletList = ['ETH']
const createWalletList = {
  createETHWallet
}
const createWallet = createWalletList[`create${walletList[0]}Wallet`]
let createWalletTime = null;
let showTimes = null;
export default ()=> {
  const [message, setMessage] = React.useState(false);
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
    setMessage("复制成功")
    clearTimeout(showTimes)
    showTimes = setTimeout(()=>{
      setMessage(undefined)
    },1000)
  }
  return (
    <>
      <MessageAlert message={message} handleClose={()=>setMessage("")}/>
      <div className="Identity">
        <div className="itemBox">
          <div className="itemBox_title">
            <h3 className="label">尾数连续豹子号(生成的帐号尾数连续几个豹子号)</h3>
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
              !accounts.length && (<dd>Not Data</dd>)
          }
      </dl>
    </>
  );
}

