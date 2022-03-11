import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Modal, Button } from 'react-bootstrap';

import './styles.scss';
declare const window: any;

function CrytoConverterBox() {
  const { connector, library, activate, deactivate, active, error } = useWeb3React();
  const [chainId, setChainId] = useState("0x01");
  const [account, setAccount] = useState("")
  // state variables
  const [showConnectMetaMaskModal, setShowConnectMetaMaskModal] = useState(false);
  const [showWalletDetailsModal, setShowWalletDetailsModal] = useState(false);

  const [state, setState] = useState({
    fromValue: '',
    toValue: '',
  });
  const [balance, setBalance] = useState(0);

  const handleCloseConnectMetaMaskModal = () => setShowConnectMetaMaskModal(false);
  const handleCloseWalletDetailsModal = () => setShowWalletDetailsModal(false);

  const handleChangeValue = (event: any, type: string) => {
    console.log("///////////////handleChangeFromValue, event", event);
    const value: string = event.target.value;
    if (value === '') {
      setState({
        fromValue: '',
        toValue: ''
      });
    } else {
      if (isNaN(Number(value))) {
        return;
      } else {
        if (type === 'from') {
          setState({
            fromValue: value,
            toValue: String((Number(value) * 3).toFixed(2))
          });
        } else {
          setState({
            fromValue: String((Number(value) / 3).toFixed(2)),
            toValue: value
          });
        }
      }
    }
  }

  const connectRequest = async () => {
    console.log(window.ethereum)
    await window.ethereum.request({
      method: "eth_requestAccounts"
    })
    const { selectedAddress, chainId } = window.ethereum;
    const res = await window.ethereum.request({
      method: 'eth_getBalance',
      params: [
        selectedAddress,
        'latest'
      ]
    })
    console.log(res) 
    const bal = res / 10 ** 18
    setBalance(bal)
    setAccount(selectedAddress)
    setChainId(chainId)
  }

  const handleClickCheckWalletDetials = () => {
    console.log("///////////////handleClickConnectMetamask, window", window);
    const { ethereum } = window;
    const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
    if (metamaskIsInstalled) {
      setShowConnectMetaMaskModal(true);
    }
  }

  const handleClickConnectMetaMask = async () => {
    // await activate(injected);
    await connectRequest()
    setShowWalletDetailsModal(true);
  }

  const handleClickCancel = async () => {
    setShowConnectMetaMaskModal(false);
  }

  const handleClickDisconnectMetaMask = () => {
    setShowWalletDetailsModal(false);
    setAccount("")
    setBalance(0)
    setChainId("")
    // deactivate();
  }

  return (
    <div className="wrapper p-5">
      <h2 className="fs-4">Crypto converter</h2>
      <div className="mb-3">
        <label htmlFor="fromValue" className="form-label">NEP</label>
        <input
          className="form-control"
          type="text" id="fromValue"
          value={state.fromValue}
          onChange={(event) => handleChangeValue(event, 'from')}
        />
      </div>
      <button type="button" className="btn btn-primary" style={{ alignSelf: 'center' }}>
        <i className="fa-solid fa-repeat fs-5"></i>
      </button>
      <div className="mb-3">
        <label htmlFor="toValue" className="form-label">BUSD</label>
        <input
          className="form-control"
          type="text"
          id="toValue"
          value={state.toValue}
          onChange={(event) => handleChangeValue(event, 'to')}
        />
      </div>
      <button
        type="button"
        className="btn btn-outline-primary"
        onClick={handleClickCheckWalletDetials}
      >
        Check Wallet Details
      </button>
      <Modal
        show={showConnectMetaMaskModal}
        onHide={handleCloseConnectMetaMaskModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Wallet details</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ color: 'red' }}>
          Wallet not connected. Please click the "Connect Now" button below.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClickConnectMetaMask}>Connect</Button>
          <Button variant="secondary" onClick={handleClickCancel}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showWalletDetailsModal}
        onHide={handleCloseWalletDetailsModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Wallet details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">KEY</th>
                <th scope="col">VALUE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account</td>
                <td>
                  {account === null
                    ? '-'
                    : account
                      ? `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
                      : ''}
                </td>
              </tr>
              <tr>
                <td>Chain ID</td>
                <td>{parseInt(chainId, 16)}</td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>{balance}</td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClickDisconnectMetaMask}>Disconnect</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CrytoConverterBox;
