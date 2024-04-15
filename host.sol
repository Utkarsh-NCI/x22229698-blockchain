// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract SportMarket {

  uint public itemId;
  struct Item {
    uint id;
    uint price;
    address payable seller;
    string imageURI;
    string fallbackimageURI;
    string desc;
    string name;
  }

mapping(uint => Item) public items;

event Inventory(
    uint indexed id,
    uint price,
    address seller,
    string imageURI,
    string fallbackImageURI,
    string desc,
    string name
  );

  event ItemBought(
    uint indexed id,
    address buyer,
    uint price
  );

  function listItem(uint price, string memory imageURI,string memory fallbackImageURI, string memory desc, string memory name) public payable {
    require(price >= 0, "Free or Price should be greater than zero");
    address payable _sender = payable (msg.sender);
    items[itemId] = Item(itemId,price, _sender, imageURI,fallbackImageURI,desc,name);
    emit Inventory(itemId, price , _sender, imageURI,fallbackImageURI,desc,name);
    itemId++;

  }

  function buyItems( uint itemID ,address seller) public payable   {
    bool _status= payable (seller).send(msg.value);
    require(_status, "Failed to send funds to seller");
    emit ItemBought(itemID, msg.sender, msg.value);
  }

  function getItems() public view returns (Item[] memory) {
    Item[] memory result = new Item[](itemId);
    for (uint i = 0; i < itemId; i++) {
      result[i] = items[i];
    }
    return result;
  }
}
