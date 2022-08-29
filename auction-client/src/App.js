import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import AuctionList from './components/AuctionList';


function App() {
  return (
    <div className="App">
        <Header />
        <AuctionList />
        <Footer />
    </div>
  );
}

export default App;
