import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCallback, useState, useEffect } from "react";
import "./App.css";
function App() {
  const [length, setLength] = useState(8);
  const [numAll, setNumAll] = useState(false);
  const [charAll, setCharAll] = useState(false);
  const [pass, setPass] = useState("");

  const passgen = useCallback(() => {
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAll) {
      str += "0123456789";
    }
    if (charAll) {
      str += "!@#$%^&*()_+{}|[]\\?<>,.;:";
    }
    for (let i = 0; i < length; i++) {
      password += str[Math.floor(Math.random() * str.length)];
    }
    setPass(password);
  }, [length, numAll, charAll, setPass]);

  useEffect(() => {
    passgen();
  }, [length, numAll, charAll, passgen]);

  const handleCopyClick = () => {
    // Copy the password to the clipboard (you might need to adjust this based on your requirements)
    navigator.clipboard.writeText(pass);
  };

  return (
    <>
      <div className="container mt-5 ml-auto">
        <h1>Password Generator</h1>
        <div className="input-group mb-3">
          <input type="text" value={pass} readOnly className="form-control" />
          <Button variant="primary" onClick={handleCopyClick}>
            Copy
          </Button>
        </div>
        <input
          type="range"
          name="length"
          id="len"
          min="5"
          max="30"
          value={length}
          onChange={(e) => {
            setLength(e.target.value);
          }}
        />
        <label htmlFor="len">Length: {length}</label>
        <div className="form-check">
          <input
            type="checkbox"
            defaultChecked={numAll}
            className="form-check-input"
            name="numbers"
            id="num"
            onChange={() => {
              setNumAll((prev) => !prev);
            }}
          />
          <label className="form-check-label" htmlFor="num">
            Include Numbers
          </label>
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            defaultChecked={charAll}
            className="form-check-input"
            name="character"
            id="char"
            onChange={() => {
              setCharAll((prev) => !prev);
            }}
          />
          <label className="form-check-label" htmlFor="char">
            Include Special Characters
          </label>
        </div>
      </div>
    </>
  );
}

export default App;
