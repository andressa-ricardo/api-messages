import { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ id: number; mensagem: string }[]>(
    []
  );
  return (
    <>
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        type="text"
      />
      <button
        onClick={() => {
          axios.post("http://localhost:3000/message", { message: message });
        }}
      >
        Adicionar mensagem
      </button>
      <button
        onClick={async () => {
          const response = await axios.get("http://localhost:3000/messages");
          setMessages(response.data);
        }}
      >
        Restaurar mensagens
      </button>
      <ul>
        {messages.map((mensagem) => (
          <li>
            <p>{mensagem.mensagem}</p>
            <button
              onClick={async () => {
                await axios.delete("http://localhost:3000/message", {
                  data: {
                    id: mensagem.id,
                  },
                });
              }}
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
