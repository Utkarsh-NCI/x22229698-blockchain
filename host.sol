// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

contract SportMarket {

  uint256 public itemId;


  struct Item {
    uint price;
    address payable seller;
    uint availableQuantity;
    string imageURI;
  }

mapping(uint => Item) public items;

event Inventory(
    uint indexed id,
    uint price,
    address seller,
    uint availableQuantity,
    string imageURI
  );

  event ItemBought(
    uint indexed id,
    address buyer,
    uint price,
    uint quantity
  );

  function listItem(uint price, uint availableQuantity, string memory imageURI) public payable {
    require(price >= 0, "Free or Price should be greater than zero");
    require(availableQuantity > 0, "Available quantity must be greater than zero");
    address payable _sender = payable (msg.sender);
    items[itemId] = Item(price, _sender, availableQuantity, imageURI);
    emit Inventory(itemId, price, _sender, availableQuantity, imageURI);
    itemId++;

  }

  function buyItem(uint _itemID, uint _quantity) public payable   {
        Item storage item = items[_itemID];
        require(item.availableQuantity >= _quantity, "Insufficient quantity available");
        require(msg.value >= item.price * _quantity, "Insufficient funds");

        address seller = item.seller;
        item.availableQuantity = item.availableQuantity - _quantity;
        emit ItemBought(_itemID, msg.sender, item.price, _quantity);

        payable(seller).transfer(item.price * _quantity);
  }
}
