import './App.css';
import { useEffect, useState} from 'react';
import SmartABI from './contracts/StakingContract.sol/Staking.json';
import TokenABI from './contracts/Lock.sol/erc20.json';
import { ethers } from 'ethers';
import profilepic from './profile.jpg';
import { formatEther, formatUnits, getAddress } from 'ethers/lib/utils';
const Tkca="0x5722f59ceAa2B3a121F497557cE7e790A95Cd749";
const Stca ="0xA1fAC98cdb6D7d8d985684b5adC38f9e7e823382";
//0x10b3d3aCDB512440462E16D30D9Dc348E00b72Ce
function App(){
  const {ethereum}=window;
 const [isMetaMaskConnected, setIsMetaMaskConnected] = useState(false);
 //const [isConnected, setIsConnected] = useState(false);
  const [address,setAddress]=useState("connect")
  const [token,setToken]=useState(0)
  const [stake,setStake]=useState('')
  const [name,setName]=useState()
  const [dur,setDur]=useState(0)
  const [unstaking,setUnstaking]=useState('')
  const [errs,setErrs]=useState('')
  const [state,setState]=useState('')
  const [stakeTime,setStakeTime]=useState(0);
  const [reward,setReward]=useState(0)
  const walletProvide= new ethers.providers.Web3Provider(window.ethereum)
  //const infruraProvider=new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/062e712de03a414da2ea328f747fbe65")
  const data=new ethers.Contract(Tkca,TokenABI.abi,walletProvide.getSigner())
  //const data3=new ethers.Contract(Stca,SmartABI.abi,infruraProvider)
  const data2=new ethers.Contract(Stca,SmartABI.abi,walletProvide.getSigner())
  
  const walletConnect =async ()=>{
     if (window.ethereum && window.ethereum.isConnected()) {
       try {
         await ethereum.request({method:"wallet_requestPermissions",
        params:[{
          eth_accounts:{}
        }]
      })
         const accounts=await ethereum.request({method:"eth_requestAccounts"})
        setAddress(accounts[0])
         const TokenBalance =async ()=>{
         const ethAdd= await walletProvide.getSigner().getAddress()
         const bal= await data.balanceOf(ethAdd)
         setToken(parseFloat(ethers.utils.formatUnits(bal)).toFixed(2))
         }
         TokenBalance();
         Duration();
       //setState('')
     } catch (error) {
      console.log(error)
     }
    }
   else{
       alert("Install Metamask Extension")
    }

  }
  const Staking =async(e)=>{
    e.preventDefault();
    try{
    const amountSend=e.target.amount.value;
    const stakeBal= ethers.utils.parseEther(amountSend)
   const app=await data.approve(Stca,stakeBal)
    await app.wait()
    const stakes = await data2.deposit(stakeBal)
    await stakes.wait()
    setStake(stakes)
    console.log('Stake:', JSON.stringify(stake));
    Duration();
}catch (error) {
     console.error('Error:', error);
    }

}
  
const unstake = async (e) => {
  e.preventDefault();
     try {
      const amountSend=e.target.amount.value;
     const stakeBal= ethers.utils.parseEther(amountSend)
       const unstakes = await data2.withdraw(stakeBal);
       await unstakes.wait();
       setStake('')
       setUnstaking(unstakes);
      console.log('Stake:', JSON.stringify(stake)); 
     } catch (error) {
       console.error('Error:', error);
       if (!error) {
         const Cnot = <p>{error}</p>;
         setState(Cnot);
       }
     }
   }
  const claim=async ()=>{
    await data2.claim()
  }
  const compound=async ()=>{
    await data2.compound()
  }
 

   const Duration =async(e)=>{
     try {
      const ethAdd=await walletProvide.getSigner().getAddress()
     const Dur=await data2.rewards(ethAdd);
     //await Dur.wait()
     setReward(parseFloat(ethers.utils.formatUnits(Dur)).toFixed(4))

     } catch (error) {
      console.log(error)
     }
   }
   //const countdownTime = Date.now()+18000;

  // const TokenName =async()=>{
  //  const Tname = await data2.StakingApy();
  // console.log("token name")
  // setName(ethers.utils.formatEther(Tname))
  // }
  // TokenName();
  
return (<div className='App'>
      <div className='WalletAndHeader'>
      <div className='Header'>
        <img src={profilepic} alt="" />
       <h2>Zotish</h2>
      </div>
      <button onClick={walletConnect} className="wallet"> {address}</button>
      </div>
      <div className='All'>
      <div className='ConAndBal'>
        <p>Contract Address :{Tkca}</p>
        <p className="tokenbal">Your Token Balance : {token}</p>
        <p>Staking Apr :87%</p>
      </div>
  <div className='Staking'>
      <h3>Your staking :{}</h3>
      <form  className="app3" onSubmit={Staking}>
        <input type="text" id="amount" className="inputs" />  
        <button type='submit'className="wallet">Stake</button>
      </form>
      <p><b>{stake.hash}</b></p>
      </div>
      </div>
  <div className='HashAndCc'>
    <div className='ClaimAndComp'> 
      <p>Reward : {reward}</p>
      <button className='Claim' id='sendAmount' onClick={claim} >Claim</button>
      <p>Compund Reward: {reward}</p>
      <button className='comp' id='Compound'onClick={compound} >Compound</button><br /> <br />
      </div>
      <p><b>{}</b></p>
     </div>
     
  <div className='walletAndHash'>
     <form onSubmit={unstake}>
       <input type="text" id="amount" className="inputs" /> 
       <button type='submit' className='wallet'  >Unstake</button>
     </form>
     <p><b>{}</b></p>
 </div>
   <div className='Footer'>
    <footer>
     <a href="/">Twitter</a>
     <a href="/">Telegram</a>
     <a href="/">Medium</a>
    </footer>
   </div>  
     
</div>
  );

}

export default App;
