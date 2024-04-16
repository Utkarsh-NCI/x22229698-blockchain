// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract Donation {

  address public beneficiary = msg.sender;

  uint public totalDonations;

  mapping(address => uint) public donations;
  address[] public addresses;

  event DonationReceived(address donor, uint amount);

  struct AddressDonations {
  address addr;
  uint amountByAddr;
}

  function donate() public payable {
    require(msg.value > 0, "Please send money greter than 0");
    if (msg.value > 0) {
      if(donations[msg.sender] == 0){
        addresses.push(msg.sender);
      }
      donations[msg.sender] = donations[msg.sender]+ msg.value;
      totalDonations = totalDonations + msg.value;
      emit DonationReceived(msg.sender, msg.value);
    }
  }

  function withdrawDonations() public onlyOwner {
    payable(beneficiary).transfer(address(this).balance);
  }

  modifier onlyOwner() {
    require(msg.sender == beneficiary, "Only beneficiary can withdraw");
    _;
  }

  function getAllDonations() public view returns (AddressDonations[] memory) {
    AddressDonations[] memory res = new AddressDonations[](addresses.length);
    for (uint i = 0; i < addresses.length; i++) {
      address currentAddress = addresses[i];
      uint _val = donations[currentAddress];
      res[i] = AddressDonations(currentAddress,_val);
    }
    return res;
  }
}