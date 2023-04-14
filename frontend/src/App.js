
import './App.css';

import { useState } from "react";

function App() {
  
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])


  async function preguntarGPT () {
    let response = await fetch("http://127.0.0.1:8000/api/informations/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'question': message, 'answer':""})
    })
    let data = await response.json();
    if (response.status === 200){

      console.log(data)
      const newMessage = {
        body: message,
        from: "Me",
      }

      const newMessage2 = {
        body: data['answer'],
        from: "GPT3: ",
      }

      setMessages([...messages, newMessage, newMessage2])
      setMessage("")

    }else{
      window.alert("Somthing goes wrong")
    }
  }

  return (
    <main className='bg-zinc-800 h-screen'>
      <div className="bg-zinc-800 h-screen text-white flex items-center justify-center">
        
        <form className="bg-zinc-900 p-10">
          <h1 className="text-2xl font-bold my-2">Chat GPT-3.5-Turbo</h1>
          <input
            name="message" 
            type = "text" 
            placeholder="Write Yout Message..."
            className="border-2 border-zinc-500 p-2 w-full text-black"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
          <button onClick={(e) => (e.preventDefault(), preguntarGPT())} className='border-2 w-full bg-slate-700'>send</button>

          <ul className="h-80 overflow-y-auto">
            {messages.map((message, index) => (
              <li 
                key={index} 
                className={`my-2 p-2 table text-sm rounded-md ${
                message.from === "Me" ? "bg-sky-700 ml-auto" : "bg-black"
                }`}
              >
                <b>{message.from}</b>: {message.body}
              </li>
            ))}
          </ul>
        </form>
      </div>
    </main>
  );
}

export default App;
