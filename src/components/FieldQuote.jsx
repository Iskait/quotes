import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuotes, getNewQuote } from '../redux/slices/quotesSlice';

function FieldQuote() {
  const url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
  const dispatch = useDispatch();
  const { quote, author, status } = useSelector(state=>state.quotes);
  const quotesRef = useRef();
  const authorRef = useRef();
  const btnRef = useRef();
  
  const toggleActive = () => {
    const fields = [quotesRef.current, authorRef.current];
    fields.forEach(v=>v.classList.remove('active'));
    setTimeout(() => {
      fields.forEach(v=>v.classList.add('active'));
    })
  }

  const getQuote = () => {
    if (status === 'idle') {
      dispatch(fetchQuotes(url));
      changeColors();
      toggleActive();
    } else {
      dispatch(getNewQuote());
      changeColors();
      toggleActive();
    }
  }
  const changeColors = () => {
    const rndmColor = [
      '#16a085',
      '#27ae60',
      '#2c3e50',
      '#f39c12',
      '#e74c3c',
      '#9b59b6',
      '#FB6964',
      '#342224',
      '#472E32',
      '#BDBB99',
      '#77B1A9',
      '#73A857'
    ][~~(Math.random() * 12)];
    quotesRef.current.style.color = rndmColor;
    authorRef.current.style.color = rndmColor;
    btnRef.current.style.backgroundColor = rndmColor;
    document.body.style.backgroundColor = rndmColor;
  }

  useEffect(() => {
    dispatch(fetchQuotes(url));
    changeColors();
    toggleActive();
}, [dispatch])

  return (
    <div className="fieldquote">
        <div className="fieldquote__container">
            <div className="fieldquote__box">
                <div 
                className="fieldquote__title"
                ref={quotesRef}>
                  {quote}
                </div>
                <div className="fieldquote__author"
                ref={authorRef}>
                  {author}
                </div>
                <button 
                ref={btnRef}
                onClick={getQuote}
                className="fieldquote__button">
                New quote
                </button>
            </div>
        </div>
    </div>
  )
}

export default FieldQuote