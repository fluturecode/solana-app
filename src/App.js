import { useEffect, useState } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

const TWITTER_HANDLE = 'fluturecode';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const TEST_GIFS = [
	'https://giphy.com/clips/justin-dancing-80s-mashup-XOmNbD0XLaAjCWZrDb',
	'https://giphy.com/gifs/janetjackson-dance-choreography-janet-jackson-SqewxuJrvblx62i82c',
	'https://giphy.com/gifs/whitneyhouston-0gm9UQR9tUDXxWAyUp',
	'https://giphy.com/clips/animation-pink-design-JMDHyBwy1b57fz0Kub',
  'https://giphy.com/gifs/80s-music-bangles-susanna-hoffs-v8xmVfox6XOq4'
]

const App = () => {
  const [walletAddress, setWalletAddress] = useState();

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

  const renderNotConnectedContainer = () => (
    <Button className="cta-button connect-wallet-button" onClick={connectWallet}>
      Connect to Wallet
    </Button>
  )

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">
      <div className={walletAddress ? 'authed-container' : 'container'}>
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
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