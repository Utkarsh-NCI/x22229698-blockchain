import React, { useCallback, useEffect, useState } from "react";
import style from "./donation.module.css";
import Web3 from "web3";
import {
  Box,
  Button,
  DataList,
  Strong,
  Table,
  TextField,
} from "@radix-ui/themes";
import { useMetaMask } from "../../hooks/useMetaMask";
import { useMessage } from "../../hooks/useMessage";
import {
  DonationABI,
  DonationContractAddress,
  formatBalance,
} from "../../utils";

const Donation = () => {
  const { setMsgColor } = useMessage();
  const { wallet } = useMetaMask();
  const [address, setAddress] = useState(null);
  const [totalDonation, setTotalDonation] = useState(0);
  const [indiDonation, setIndiDonation] = useState(0);
  const [amount, setAmount] = useState("");
  const [list, setList] = useState([]);

  const sendDonate = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      DonationABI,
      DonationContractAddress
    );
    const tx = await contract.methods
      .donate()
      .send({
        gas: 6721975,
        from: wallet.accounts[0],
        value: web3.utils.toWei(amount, "ether"),
      })
      .catch((e) => {
        setMsgColor(e.message, "red");
      });
    fetchAllDonation();
    fetchIndiDonation();
    fetchDonationList();
  };

  const fetchDonationList = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      DonationABI,
      DonationContractAddress
    );
    const _donationList = await contract.methods.getAllDonations().call();
    setList(_donationList);
    console.log(_donationList);
  };

  const fetchAllDonation = async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      DonationABI,
      DonationContractAddress
    );
    const _totalDonations = await contract.methods.totalDonations().call();
    setTotalDonation(_totalDonations);
  };

  const fetchIndiDonation = useCallback(async () => {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(
      DonationABI,
      DonationContractAddress
    );

    if (address !== null) {
      const res = await contract.methods.donations(address).call();
      setIndiDonation(res);
    }
  }, [address]);

  useEffect(() => {
    setAddress(wallet.accounts[0]);
  }, [wallet]);

  useEffect(() => {
    fetchIndiDonation();
  }, [address, fetchIndiDonation]);

  useEffect(() => {
    fetchAllDonation();
    fetchDonationList();
  }, []);

  return (
    <div className={style.rootContainer}>
      <div className={style.info}>
        <DataList.Root>
          <DataList.Item>
            <DataList.Label>Address</DataList.Label>
            <DataList.Value>{address}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label>Donation till date</DataList.Label>
            <DataList.Value>{formatBalance(indiDonation)} ETH</DataList.Value>
          </DataList.Item>
          <Box maxWidth="600px">
            <TextField.Root
              size="2"
              placeholder="Amount to donate"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
          </Box>
          <Button onClick={sendDonate} size={2} className={style.button}>
            Donate
          </Button>
          <DataList.Item>
            <DataList.Label>Total donations collected</DataList.Label>
            <DataList.Value>{formatBalance(totalDonation)} ETH</DataList.Value>
          </DataList.Item>
        </DataList.Root>
      </div>
      <div className={style.tableDiv}>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Address</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Amount donated</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {list.length &&
              list.map((_i) => (
                <Table.Row key={_i.addr}>
                  <Table.RowHeaderCell>{_i.addr}</Table.RowHeaderCell>
                  <Table.Cell>
                    {formatBalance(_i.amountByAddr)} <Strong>ETH</Strong>
                  </Table.Cell>
                </Table.Row>
              ))}
          </Table.Body>
        </Table.Root>
      </div>
    </div>
  );
};

export default Donation;
