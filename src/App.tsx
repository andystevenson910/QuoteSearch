import React, { useState,useEffect, KeyboardEvent} from 'react'
import './App.css'

function App() {
  const [searched, setSearched] = useState<boolean>(false);
  const [search, setSearch] = useState<string>();

  function iHitEnter(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      setSearched(true);
    }
  }
 
  return (
    <div>
        <h1>Quote Search</h1>
        <input id="input" onKeyDown={iHitEnter} type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Perry the Platypus"></input>
        {searched ? <SearchedFor/> : <Random/>}
    </div>
  )






function Random(){

  interface Quote {
    author: string;
    content: string;
    _id:string;
    results: Quote[];
}

  const [flag,setFlag] = useState<boolean>(true);
  const [quote, setQuote] = useState<Quote>(); 

  useEffect(() => {
    getQuote();
  },[])

  async function getQuote(){
    if (flag){
      const randomQuoteRequest = await fetch("https://usu-quotes-mimic.vercel.app/api/random");
      setQuote(await randomQuoteRequest.json());
    } 
  }

  return (
    <div>
    <p>{quote ? quote.content : "..."}</p>
    <p>~~{quote ? quote.author : ""}~~</p>
    </div>);
}

 function SearchedFor(){

  interface Quote {
    author: string;
    content: string;
    _id:number;
    results: Quote[];
}

    const [quotes, setQuotes] = useState<Quote[]|null>(null);   
    async function getQuotes(){
    const randomQuoteRequest = await fetch(`https://usu-quotes-mimic.vercel.app/api/search?query=${search}`);
    if (searched){
      setQuotes( await randomQuoteRequest.json());
    }}

    useEffect(() => {
        getQuotes();
    },[])

    return (
        <div> 
        {quotes ? quotes.results.map((quote: Quote) => (
            <div key={quote._id}>
            <p>{quote.content}</p>
            <p>~~{quote.author}~~</p>
            </div>
        )) : "Loading Quotes..."}
        </div>
    )
}
}

export default App
