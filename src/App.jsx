import './App.css';
import Notes from './components/Notes';

function App() {
  return (
    <div className="container mx-auto px-32 py-6 bg-gray-100 min-h-screen min-w-full">
      <h1 className="self-center text-5xl mb-6 text-center text-gray-800">Notes</h1>     
      <Notes />
    </div>
  )
}

export default App;
