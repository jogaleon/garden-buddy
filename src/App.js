import {CompostProvider} from './components/compost/CompostContext';
import {ModalProvider} from './components/ModalContext';
import CompostManager from './components/compost/CompostManager';
import './App.css';

function App() {
  return (
    <main>
      <CompostProvider>
        <ModalProvider>
          <CompostManager />
        </ModalProvider>
      </CompostProvider>
    </main>
  )
}

export default App;