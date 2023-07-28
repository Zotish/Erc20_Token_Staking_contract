pragma solidity ^0.8.9;
// SPDX-License-Identifier: MIT

abstract contract Ierc20{
function name() public virtual view returns (string memory);
function symbol() public virtual view returns (string memory);
function decimals() public  virtual view returns (uint256);
function totalSupply() public view virtual returns (uint256);
function balanceOf(address _owner) public virtual view returns (uint256 );
function transfer(address _to, uint256 _value) public virtual returns (bool);
function transferFrom(address _from, address _to, uint256 _value) public virtual returns (bool);
function approve(address _spender, uint256 _value) public virtual returns (bool );
function allowance(address _owner, address _spender) public view virtual  returns (uint256 remaining);
event Transfer(address indexed _from, address indexed _to, uint256 _value);
event Approval(address indexed _owner, address indexed _spender, uint256 _value);


}
 contract erc20 is Ierc20{
     address internal owner;
     string internal tokenName;
     string internal tokenSymbol;
     uint256 internal Decimals;
     uint256 internal TotalSupply;
     mapping (address=>uint256) public checkBalance;
     mapping (address=>mapping(address=>uint256)) public GetBalance;


     constructor (){
         owner=msg.sender;
         tokenName="test Token ";
         tokenSymbol="TSTE";
         Decimals=18;
         TotalSupply=100000000000000000000000;
         checkBalance[msg.sender]=TotalSupply;
     }



function name() public view override returns (string memory){
         return tokenName;
}
function symbol() public view  override returns (string memory){
     return tokenSymbol;
}
function decimals() public view  override returns (uint256){
         return Decimals;
}
function totalSupply() public view  override  returns (uint256){
         return TotalSupply;
}
function balanceOf(address _owner) public override view returns (uint256 ){
          return checkBalance[_owner];
}
function transfer(address _to, uint256 _value) public override returns (bool){
                      require(checkBalance[msg.sender]>=0);
                      checkBalance[msg.sender]-=_value;
                      checkBalance[_to]+=_value;
                      emit Transfer(msg.sender,_to,_value);
                      return true;
}
function transferFrom(address _from, address _to, uint256 _value) public override returns (bool){
                   checkBalance[_from]-=_value;
                   GetBalance[_from][msg.sender]-=_value;
                   checkBalance[_to]+=_value;
                   emit Transfer(_from,_to,_value);
                   return true;
                   
}
function approve(address _spender, uint256 _value) public override returns (bool ){
                         require(checkBalance[msg.sender]>=_value);
                         require(_spender!=address(0));
                         GetBalance[msg.sender][_spender]=_value;
                         emit Approval(msg.sender,_spender,_value);
                         return true;
}
function allowance(address _owner, address _spender) public view override returns (uint256 ){
                        return  GetBalance[_owner][_spender];
}

}