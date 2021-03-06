import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import Title from "./components/Title";
import Deposit from "./components/Deposit";
import DepositClaim from "./components/DepositClaim";
import DepositConfirm from "./components/DepositConfirm";
import DepositWorking from "./components/DepositWorking";
import DepositSuccess from "./components/DepositSuccess";
import DepositSuccessMain from "./components/DepositSuccessMain";
import Withdraw from "./components/Withdraw";
import WithdrawCheck from "./components/WithdrawCheck";
import WithdrawCheckMain from "./components/WithdrawCheckMain";
import WithdrawConfirm from "./components/WithdrawConfirm";
import WithdrawWorking from "./components/WithdrawWorking";
import WithdrawSuccess from "./components/WithdrawSuccess";
import WithdrawSuccessMain from "./components/WithdrawSuccessMain";
import InspectMain from "./components/InspectMain";
import YieldRedemption from "./components/YieldRedemption";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";
import { MemoryRouter as Router, Route, Switch } from "react-router-dom";
import { useState, useEffect } from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { deployments } from "./conflux/config";
import { parseNote, toHex, generateClaim } from "./conflux/utils";
import AlertWindow from "./components/AlertWindow";
import Theme from "./theme";
import MetaMaskDialog from "./components/MetaMaskDialog";
import YieldRedemptionSetup from "./components/YieldRedemptionSetup";
import YieldManage from "./components/YieldManage";
import YieldRedeemConfirm from "./components/YieldRedeemConfirm";
import YieldWithdrawConfirm from "./components/YieldWithdrawConfirm";
import RelayerSettings from "./components/RelayerSettings";
import { getChainList } from "./conflux/utils";
import WaitingModal from "./components/WaitingModal";
import { useTranslation } from "react-i18next";

const Web3 = require("web3");
const web3 = window.web3 ? new Web3(window.web3.currentProvider) : null;

const connectMeta = !web3 ? true : false;

const style = {
  position: "absolute",
  textAlign: "center",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  color: "white",
  bgcolor: "transparent",
  border: "none",
  boxShadow: 24,
  p: 4,
};

function getLibrary(provider, connector) {
  return new Web3Provider(provider);
}

export const injectedConnector = new InjectedConnector({
  supportedChainIds: [
    42, // Kovan Test Network
  ],
});

// reorder on breakpoint
// const useStyles = makeStyles((theme) => ({
//   title: {
//     order: 1,
//     [theme.breakpoints.up("md")]: {
//       order: 2,
//     },
//   },
//   main: {
//     order: 2,
//     [theme.breakpoints.up("md")]: {
//       order: 1,
//     },
//   },
// }));

function App() {
  // const classes = useStyles();

  // const { chainId, account, accountBase32, activate, active } = useWeb3React()

  const [agree, setAgree] = useState(false);
  const [token, setToken] = useState("ETH");
  const [amount, setAmount] = useState("0.1");
  const [deposit, setDeposit] = useState();
  const [depositCount, setDepositCount] = useState();
  const [depReceipt, setDepReceipt] = useState();
  const [txReceipt, setTxReceipt] = useState();
  const [claim, setClaim] = useState();
  const [recipient, setRecipient] = useState();
  const [isSpent, setIsSpent] = useState(false);
  const [parsedNote, setParsedNote] = useState();
  const [isExist, setIsExist] = useState(false);
  const [txLayers, setTxLayers] = useState();
  const [relayer, setRelayer] = useState(false);
  const [deployment, setDeployment] = useState({
    address:
      deployments.eth_deployments[`netId42`][`eth`].instanceAddress[`0.1`],
    abi: deployments.eth_deployments[`netId42`][`eth`].abi,
    symbol: deployments.eth_deployments[`netId42`][`eth`].symbol,
    amount: "0.1",
    denominations: ["0.1", "1", "10", "100"],
  });
  const [chainList, setChainList] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [networkId, setNetworkId] = useState(42);  
  const [waiting, setWaiting] = useState(false);
  const { t } = useTranslation();

  useEffect(async () => {
    let result = await getChainList();
    await setChainList(result);
  }, []);

  const handleAlert = (err) => {
    setAlertText(err.toString());
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  const handleAgree = () => {
    setAgree(true);
  };

  useEffect(() => {
    handleDepositCount();
  });

  const handleSetParsedNote = (parseNote) => {
    setParsedNote(parseNote);
  };

  const handleSetClaim = (claim) => {
    setClaim(claim);
  };

  const handleSetDeployment = (amount, currency) => {
    let _deployment =
      deployments.eth_deployments[`netId${networkId}`][currency.toLowerCase()];

    const deployment = {
      address: _deployment.instanceAddress[amount],
      abi: _deployment.abi,
      symbol: _deployment.symbol,
      amount: amount,
      denominations: Object.keys(_deployment.instanceAddress).sort(),
    };

    setDeployment(deployment);

    handleDepositCount();

    return deployment;
  };

  const handleSetToken = (token) => {
    setToken(token);
    let _deployment =
      deployments.eth_deployments[`netId${networkId}`][token.toLowerCase()];

    // With token change, reset denomination as they can vary between supported currencies
    let amount = Object.keys(_deployment.instanceAddress).sort()[0];
    setAmount(amount);
    setDeployment({
      address: _deployment.instanceAddress[amount],
      abi: _deployment.abi,
      symbol: _deployment.symbol,
      amount: amount,
      denominations: Object.keys(_deployment.instanceAddress).sort(),
    });
    handleDepositCount();
  };

  const handleSetAmount = async (amount) => {
    setAmount(amount);
    let _deployment =
      deployments.eth_deployments[`netId${networkId}`][token.toLowerCase()];
    setDeployment({
      address: _deployment.instanceAddress[amount],
      abi: _deployment.abi,
      symbol: _deployment.symbol,
      amount: amount,
      denominations: Object.keys(_deployment.instanceAddress).sort(),
    });
    await handleDepositCount();
  };

  const handleGenerateClaim = () => {
    // Generate Claim
    let depositClaim = generateClaim(
      deployment.symbol.toLowerCase(),
      deployment.amount,
      +window.ethereum.chainId
    );

    depositClaim.networkId = +window.ethereum.chainId;
    setDeposit(depositClaim);
    return true;
  };

  const handleTransaction = (txReceipt) => {
    setTxReceipt(txReceipt);
  };

  const handleDepReceipt = (dep) => {
    setDepReceipt(dep);
  };

  const handleDepositCount = async () => {
    // Get all deposit events from smart contract and assemble merkle tree from them
    console.log("Getting current state from sacred contract");
    if (!web3) return;
    const contract = new web3.eth.Contract(deployment.abi, deployment.address);
    const events = await contract.getPastEvents("Deposit", {
      fromBlock: 0,
      toBlock: "latest",
    });

    const leaves = events
      .sort((a, b) => a.returnValues.leafIndex - b.returnValues.leafIndex) // Sort events in chronological order
      .map((e) => e.returnValues.commitment);

    setDepositCount(leaves.length);
  };

  //TODO: a lot of duplicate code in here to clean up
  const handleWithdraw = async ({ claim, recipient }) => {
    let parsedNote;

    try {
      parsedNote = parseNote(claim);
    } catch (err) {
      console.log("The note has invalid format");
      setWaiting(false);
      return false;
    }

    let _deployment = handleSetDeployment(
      parsedNote.amount,
      parsedNote.currency
    );

    const sacred = new web3.eth.Contract(_deployment.abi, _deployment.address);
    const deposit = parsedNote.deposit;
    const isSpent = await sacred.methods
      .isSpent(toHex(deposit.nullifierHash))
      .call();

    if (isSpent) {
      setIsSpent(isSpent);
      setIsExist(true);
      setClaim(claim);
      setRecipient(recipient);
      setParsedNote(parsedNote);
      setWaiting(false);
      return true;
    }

    // Get all deposit events from smart contract and assemble merkle tree from them
    console.log("Getting current state from sacred contract");
    const events = await sacred.getPastEvents("Deposit", {
      fromBlock: 0,
      toBlock: "latest",
    });
    const leaves = events
      .sort((a, b) => a.returnValues.leafIndex - b.returnValues.leafIndex) // Sort events in chronological order
      .map((e) => e.returnValues.commitment);

    // Find current commitment in the tree
    const depositEvent = events.find(
      (e) => e.returnValues.commitment === toHex(deposit.commitment)
    );
    const leafIndex = depositEvent ? depositEvent.returnValues.leafIndex : -1;

    if (leafIndex >= 0) {
      setIsExist(true);
    } else {
      setIsExist(false);
    }

    setIsSpent(isSpent);
    setClaim(claim);
    setRecipient(recipient);
    setParsedNote(parsedNote);
    setTxLayers(leaves.length - leafIndex - 1);
    
    setWaiting(false);
    return true;
  };

  const handleNetworkId = (netId) => {
    setNetworkId(netId);
  };

  web3 &&
    window.ethereum.on("networkChanged", function (netId) {
      // Time to reload your interface with the new netId
      if (netId === "loading") return;
      if (netId !== networkId) {
        // handleAlert(
        //   "Current network selected on Sacred does not match the network selected in Metamask."
        // );
      }
    });

  const handleRelayer = (useRelay) => {
    setRelayer(useRelay);
  };

  const switchAppNetwork = (networkId) => {
    let chainData = chainList.filter((item) => item.chainId === networkId);
    if (chainData.length > 0) {
      let config =
        deployments.eth_deployments[`netId${networkId.toString()}`][
          chainData[0].chain.toLowerCase()
        ];
      if (
        config?.instanceAddress &&
        typeof config?.instanceAddress === "object"
      ) {
        let denomination = Object.keys(config?.instanceAddress);
        setDeployment({
          address: config.instanceAddress[`0.1`],
          abi: config.abi,
          symbol: config.symbol,
          amount: denomination[0] || "0.1",
          denominations: denomination,
        });
      }
    }
  };

  useEffect(() => {
    if (networkId) {
      switchAppNetwork(networkId);
    }
  }, [networkId]);

  return (
    <>
      <Router>
        <Web3ReactProvider getLibrary={getLibrary}>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={Theme}>
              <div className="App">
                <Header
                  handleAlert={handleAlert}
                  handleNetworkId={handleNetworkId}
                  networkId={networkId}
                />

                <div className="main-container">
                  <AlertWindow
                    openAlert={openAlert}
                    handleCloseAlert={handleCloseAlert}
                    alertText={alertText}
                  />

                  <Grid
                    container
                    spacing={5}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={12}>
                      <Route
                        exact
                        path="/yield"
                        component={() => <YieldRedemption />}
                      />
                    </Grid>
                    <Grid item md={3} xs={8}>
                      <Switch>
                        <Route
                          exact
                          path="/"
                          component={() => (
                            <Welcome
                              handleAgree={handleAgree}
                              handleAlert={handleAlert}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/deposit"
                          component={() => (
                            <Deposit
                              deployment={deployment}
                              handleGenerateClaim={handleGenerateClaim}
                              handleSetToken={handleSetToken}
                              handleSetAmount={handleSetAmount}
                              networkId={networkId}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/depositClaim"
                          component={() => (
                            <DepositClaim
                              deposit={deposit}
                              deployment={deployment}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/depositConfirm"
                          component={() => (
                            <DepositConfirm
                              deposit={deposit}
                              handleTransaction={handleTransaction}
                              deployment={deployment}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/depositWorking"
                          component={() => (
                            <DepositWorking deployment={deployment} />
                          )}
                        />
                        <Route
                          exact
                          path="/depositSuccess"
                          component={() => (
                            <DepositSuccess
                              txReceipt={txReceipt}
                              deployment={deployment}
                            />
                          )}
                        />
                        <Route
                          exact
                          path={["/withdraw", "/inspectWithdraw"]}
                          component={() => (
                            <Withdraw
                              handleWithdraw={handleWithdraw}
                              deployment={deployment}
                              handleRelayer={handleRelayer}
                              relayerOption={relayer}
                              setWaiting={setWaiting}
                              waiting={waiting}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/withdrawCheck"
                          component={() => (
                            <WithdrawCheck
                              claim={claim}
                              recipient={recipient}
                              isSpent={isSpent}
                              isExist={isExist}
                              deployment={deployment}
                              relayerOption={relayer}
                              setWaiting={setWaiting}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/withdrawConfirm"
                          component={() => (
                            <WithdrawConfirm
                              parsedNote={parsedNote}
                              recipient={recipient}
                              handleTransaction={handleTransaction}
                              deployment={deployment}
                              handleAlert={handleAlert}
                              relayerOption={relayer}
                              handleDepReceipt={handleDepReceipt}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/withdrawWorking"
                          component={() => (
                            <WithdrawWorking deployment={deployment} />
                          )}
                        />
                        <Route
                          exact
                          path={["/inspectSuccess", "/withdrawSuccess"]}
                          component={() => (
                            <WithdrawSuccess
                              recipient={recipient}
                              parsedNote={parsedNote}
                              txReceipt={txReceipt}
                              claim={claim}
                              deployment={deployment}
                              depReceipt={depReceipt}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/inspect"
                          component={() => (
                            <Withdraw
                              handleWithdraw={handleWithdraw}
                              deployment={deployment}
                            />
                          )}
                        />
                        <Route
                          exact
                          path="/yieldSetup"
                          component={() => <YieldRedemptionSetup />}
                        />
                        <Route
                          exact
                          path={[
                            "/yieldManage",
                            "/yieldWithdraw",
                            "/yieldRedeem",
                            "/yieldRedeemConfirm",
                            "/yieldWithdrawConfirm",
                          ]}
                          component={() => <YieldManage />}
                        />
                        <Route
                          exact
                          path={["/relayerSettings"]}
                          component={() => <RelayerSettings />}
                        ></Route>
                      </Switch>
                    </Grid>

                    <Grid item md={8} xs={12}>
                      <Route
                        exact
                        path={[
                          "/",
                          "/deposit",
                          "/depositClaim",
                          "/depositConfirm",
                          "/depositWorking",
                          "/withdraw",
                        ]}
                        component={Title}
                      />
                      <Route
                        exact
                        path="/depositSuccess"
                        component={() => (
                          <DepositSuccessMain
                            deposit={deposit}
                            txReceipt={txReceipt}
                            deployment={deployment}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={[
                          "/withdrawCheck",
                          "/withdrawConfirm",
                          "/withdrawWorking",
                        ]}
                        component={() => (
                          <WithdrawCheckMain
                            isSpent={isSpent}
                            claim={claim}
                            isExist={isExist}
                            parsedNote={parsedNote}
                            txLayers={txLayers}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={["/withdrawSuccess", "/inspectSuccess"]}
                        component={() => (
                          <WithdrawSuccessMain
                            recipient={recipient}
                            claim={claim}
                            parsedNote={parsedNote}
                            txReceipt={txReceipt}
                            depReceipt={depReceipt}
                          />
                        )}
                      />
                      <Route
                        exact
                        path={["/inspect", "/inspectWithdraw"]}
                        component={() => (
                          <InspectMain
                            handleSetDeployment={handleSetDeployment}
                            handleSetParsedNote={handleSetParsedNote}
                            handleSetClaim={handleSetClaim}
                            handleTransaction={handleTransaction}
                          />
                        )}
                      />
                      <Route
                        exact
                        path="/yieldRedeemConfirm"
                        component={() => <YieldRedeemConfirm />}
                      />
                      <Route
                        exact
                        path="/yieldWithdrawConfirm"
                        component={() => <YieldWithdrawConfirm />}
                      />
                    </Grid>
                  </Grid>
                </div>
                <Footer
                  deployment={deployment}
                  depositCount={depositCount}
                  networkId={networkId}
                />
              </div>
            </ThemeProvider>
          </StyledEngineProvider>
        </Web3ReactProvider>
      </Router>
      <MetaMaskDialog connectMeta={connectMeta} />
      {waiting && <WaitingModal content={t('withdraw.verify_claim')} />}
    </>
  );
}

export default App;
