import SessionStorageData from "../../components/SessionStorageData";
import ExportToExcel from "../../utils/ExportToExcel";
import React, {useState} from "react";
import {createETHWallet} from "../../utils/wallet/create";
import MessageAlert from "../../components/MessageAlert";
const walletList = ['ETH']
const createWalletList = {
    createETHWallet
}
let showTimes = null;
export default function Batch() {
    const [message, setMessage] = React.useState(false);
    const [walletType, setWalletType] = useState(walletList[0]);
    const [currentAccounts, setCurrentAccounts] = useState(undefined);
    const [frequency, setFrequency] = useState(1);
    const [count, setCount] = useState(1);
    const [currentCount, setCurrentCount] = useState(0);
    const [loading, setLoading] = useState(false)

    const countArr = [10,20,50,100,200,500]
    async function create(){
        if (!count || count <= 0){
            setMessage("请输入有效数量")
            clearTimeout(showTimes)
            showTimes = setTimeout(()=>{
                setMessage(undefined)
            },1000)
            return;
        }
        setLoading(!loading);
        const createWallet = createWalletList[`create${walletType}Wallet`]
        let createWalletTime = null;
        let arr = [];
        await handleCreateWallet(async ()=>{
            let name = `${walletType}-${count}-${frequency}`;
            await ExportToExcel(arr,name);
            setCurrentAccounts({data: arr, name,createTime: Date.now()})
            const _frequency = frequency + 1
            setFrequency(_frequency)
            setCurrentCount(0)
            setLoading(false)
        })
        if (!arr.length){
            setLoading(!loading)
            return
        }
        async function handleCreateWallet(callback){
            clearTimeout(createWalletTime);
            createWalletTime = setTimeout(async ()=>{
                const result = await createWallet()
                arr.push(result)
                setCurrentCount(arr.length)
                if (arr.length < count){
                    await handleCreateWallet(callback)
                }else {
                    clearTimeout(createWalletTime);
                    callback()
                }
            },30)
        }
    }
    return (
        <div>
            <MessageAlert message={message} handleClose={()=>setMessage("")}/>
            <div className="Identity">
                <div className="itemBox">
                    {/*<h2 className="label">Identity Wallet <span>(ETH)</span></h2>*/}
                    <p className="value">生成的账号是本地CPU Hash计算生成的，所以单次推荐最多200个。</p>
                </div>
                <div className="itemBox">
                    <div className="itemBox_title">
                        <h3 className="label">创建数量</h3>
                        {
                            countArr.map(item=>{
                                return (
                                    <span key={item} onClick={()=>{setCount(item)}}>{item}</span>
                                )
                            })
                        }
                    </div>
                    <input className="CountInput" type="text" onChange={(e)=>{setCount(e.target.value)}} value={count}/>
                </div>
                <button className="createButton" onClick={create} disabled={loading}>
                    {
                        loading ? `正在生成，${currentCount}/${count},生成后自动导出`:'完成'
                    }
                </button>
            </div>
            <SessionStorageData data={currentAccounts} download={ExportToExcel} />
        </div>
    )
}