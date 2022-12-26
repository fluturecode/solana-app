import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import { render } from '@testing-library/react';

const TWITTER_HANDLE = 'fluturecode';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
	'https://giphy.com/clips/justin-dancing-80s-mashup-XOmNbD0XLaAjCWZrDb',
	'https://giphy.com/clips/episode-21-bet-soul-train-r9YHYHP6KoYZiRBQnu',
	'https://giphy.com/gifs/whitneyhouston-0gm9UQR9tUDXxWAyUp',
	'https://giphy.com/clips/animation-pink-design-JMDHyBwy1b57fz0Kub',
  'https://giphy.com/gifs/80s-music-bangles-susanna-hoffs-v8xmVfox6XOq4'
]

const App = () => {
  const [walletAddress, setWalletAddress] = useState();
  const [inputValue, setInputValue] = useState('');
  const [gifList, setGifList] = useState([]);

  const checkIfWalletIsConnected = async () => {
    if (window?.solana?.isPhantom) {
      console.log('Phantom wallet found!');
      const res = await window.solana.connect({ onlyIfTrusted: true });
      console.log(
        'Connected with Public Key:',
        res.publicKey.toString()
      );

      setWalletAddress(res.publicKey.toString());

    } else {
      alert('Solana object not found! Get a Phantom Wallet 👻');
    }

  };

  const connectWallet = async() => {
    const { solana } = window;

    if (solana) {
      const res = await solana.connect();
      console.log('Connected with Public Key:', res.publicKey.toString());
      setWalletAddress(res.publicKey.toString());
    }
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      console.log('Gif link:', inputValue);
    } else {
      console.log('Empty input. Try again.');
    }
  };

  const onInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const renderNotConnectedContainer = () => (
    <div className="connected-container">
    <form
      onSubmit={(event) => {
        event.preventDefault();
        sendGif();
      }}
    >
      <input
        type="text"
        placeholder="Enter gif link!"
        value={inputValue}
        onChange={onInputChange}
      />
      <button type="submit" className="cta-button submit-gif-button">
        Submit
      </button>
    </form>
    <div className="gif-grid">
      {TEST_GIFS.map((gif) => (
        <div className="gif-item" key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  </div>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);


useEffect(() => {
  if (walletAddress) {
    console.log('Fetching GIF list...');
    setGifList(TEST_GIFS);
  }
}, [walletAddress]);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 80s Music GIFs</p>
          <p className="sub-text">
            Find your favorite 80's music video GIF ✨
          </p>
          {!walletAddress && renderNotConnectedContainer()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;