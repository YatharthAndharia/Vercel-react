import logo from './logo.svg';
import './App.css';
import { createClient, fetchExchange, cacheExchange } from 'urql';

function App() {
  const APIURL =
    'https://subgraph.satsuma-prod.com/sw9vuxiQey3c/lyra/arbitrum-mainnet/api';

  const posQuery = `
  query{
    positions(first:8000 orderBy:closeTimestamp orderDirection:desc where:{state:2})
    {
      id
      positionId
      owner
      isLong
      isBaseCollateral
      state
      openTimestamp
      closeTimestamp
      trades(orderBy:timestamp){
        id
        trader
        transactionHash
        isBuy
        isOpen
        closePNL
        collateralUpdate{
          collateralPNL
          collateralAmountChange
        }
      }
      collateralUpdates{
        transactionHash
        collateralAmountChange
        collateralPNL
        
      }
      closePNL
      collateralPNL
    }
}
`;

  const getSubgraphData = async () => {
    try {
      const client = createClient({
        url: APIURL,
        exchanges: [cacheExchange, fetchExchange],
      });
      const data = await client.query(posQuery).toPromise();
      console.log(data.data);
      return data.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <button onClick={getSubgraphData}>FetchSubgraph</button>
      </header>
    </div>
  );
}

export default App;
