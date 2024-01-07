import Player from "./components/Player";

function App() {
  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="P1" symbol="O"></Player>
          <Player initialName="P2" symbol="X"></Player>
        </ol>
        GAME BOARD
      </div>
      LOG
    </main>
  );
}

export default App;
