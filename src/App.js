import "./App.css";

function App() {
  return (
    <div className="App">
      {/* App bar */}
      <div className="app-bar">
        <h1>Friendle</h1>
      </div>
      {/* Body */}
      <div className="app-body">
        <h2 className="create-heading">Create a new friendle game</h2>
        <input
          className="create-input"
          placeholder="Type a word to create a game"
        />
        <button className="create-btn">Create</button>
      </div>
    </div>
  );
}

export default App;
