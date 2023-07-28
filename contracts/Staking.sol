 pragma solidity ^0.8.9;
// SPDX-License-Identifier: MIT

interface IERC20 {
    function transfer(address recipient, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
}
contract StakingContract {
    IERC20  public  token;
    uint256 public stakingDuration=7 days;
    uint256 public stakingRate;
    uint256 public totalStaked;
    uint256 public UserStake; 
    uint256 public rewardsPerHour=1e14;   
    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public stakedTimestamps;
    
    event Staked(address indexed account, uint256 amount);
    event Unstaked(address indexed account, uint256 amount);
    
    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
       // stakingDuration = 0;
        stakingRate = 0;
        UserStake=0;
    }
    
    function stake(uint256 _amount) external {
        require(_amount > 0, "Amount must be greater than zero");
        require(token.balanceOf(msg.sender)>_amount,"You have not enough balance");
        token.transferFrom(msg.sender, address(this), _amount);
        stakedBalances[msg.sender] += _amount;
        stakedTimestamps[msg.sender] = block.timestamp;
        totalStaked += _amount;
        emit Staked(msg.sender, _amount);
    }
    
    function unstake() external {
        require(stakedBalances[msg.sender] > 0, "You don't have a staked balance");
        require(block.timestamp >= stakedTimestamps[msg.sender] + stakingDuration, "Staking duration has not passed yet");
        
       uint256 stakedAmount = stakedBalances[msg.sender];
        
        delete stakedBalances[msg.sender];
        delete stakedTimestamps[msg.sender];
        totalStaked -= stakedAmount;
        token.transfer(msg.sender, stakedAmount);
        emit Unstaked(msg.sender, stakedAmount);
    }
    
    function getBalance() public view returns (uint256) {
        return token.balanceOf(address(this));
    }
function StakingApy()public view returns (uint256){
        return stakingRate;
    }
function TStake()public view returns (uint256){
        return totalStaked;
    }
function UStake()public view returns(uint256){
    return stakedBalances[msg.sender];
}
function GetPassedHour() public view returns(uint256){
    return block.timestamp - stakedTimestamps[msg.sender]/1 hours;
}
function rewardsperHourToUser() public view returns(uint256){
  return stakedBalances[msg.sender]*rewardsPerHour*GetPassedHour();
}
function ClaimReward()external{
  uint256 AmountGetowner=  rewardsperHourToUser();
  require(stakedBalances[address(this)]>AmountGetowner,"Contract doesnot enough balance to give reward");
  require(AmountGetowner>0,"Balance is zero");
  token.transferFrom(address(this),msg.sender, AmountGetowner);
}

}
