import {useEffect,useState} from 'react';
import './App.css';
import QuoteBox from './components/QuoteBox';

const App = () => {
  const API = process.env.REACT_APP_API_KEY;

  const [allQuotes, setAllQuotes] = useState([]);
  const [quotes, setQuotes] = useState({
    quoteToDisplay: '',
    prevQuote: 'Najpierw wylosuj',
    randomQuote:''
  });

  useEffect(() => {
    const getQuotes = async () => {
      await fetch(API)
        .then(response => response.json())
        .then(data => data.reduce((a,b)=> a.concat(b), []))
        .then(data=> setAllQuotes(data))
    }
    getQuotes();
  },[]);

  useEffect(() => {
    if(allQuotes.length !== 0){
      setRandomQuote();
    }
  }, [allQuotes]);

  const setRandomQuote = () => {
    const numberOfQuotes = allQuotes.length;
    const drawnQuote = Math.floor(Math.random() * (numberOfQuotes - 1)) + 1;
    setQuotes({
      randomQuote: allQuotes[drawnQuote],
      prevQuote: quotes.randomQuote,
      quoteToDisplay: allQuotes[drawnQuote]
    });
  }

  const displayPrevQuote = ()=> {
    if(quotes.prevQuote === ""){
      setQuotes(prevState => ({
        ...prevState,
        quoteToDisplay: '',
      }));
    }else {
      setQuotes(prevState => ({
        ...prevState,
        quoteToDisplay: quotes.prevQuote,
      }));
    }
  };

  return (
    <div className="wrapper">
      <header>
        <h1>Zadanie nr. 3.2</h1>
        <p>Aplikacja, która pobiera cytaty z API. Po załadowaniu strony wyświetla losowy cytat, dodatkowo zostały dodane dwa przyciski: pierwszy losuje następny cytat, drugi pozwala na powrót do poprzedniego <strong>WYLOSOWANEGO</strong> cytatu.</p>
        <br/>
        <strong>UWAGA. Druga wersja aplikacji, która wyświetla poprzedni WYŚWIETLANY cytat dostępna <a href='https://dplotek.github.io/grupa-it-zadanie-3-1/' target="_blank" rel="noreferrer">tutaj.</a></strong>
      </header>
      <div className="button__container">
        <button onClick={setRandomQuote}>Losowy cytat</button>
        <button onClick={displayPrevQuote}>Poprzedni cytat</button>
      </div>

      <QuoteBox author={quotes.quoteToDisplay.author}  quote={quotes.quoteToDisplay.quote }/>
    </div>
  );
}

export default App;