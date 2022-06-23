import { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { useLookups } from './LookupStore';
import Swal from 'sweetalert2';

function App() {
  const displayString = useLookups((state) => state.categories["needsUpToDateData"].data);
  const freshData = useLookups((state) => state.freshData);

  useEffect(() => {
    const init = async () => {
      await freshData("needsUpToDateData");
    }
    init();
    Swal.fire(displayString);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          {displayString}
        </a>
      </header>
    </div>
  );
}

export default App;
