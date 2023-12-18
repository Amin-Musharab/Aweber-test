import './App.css';
import PasswordEntry from './PasswordContainer';

function App() {
  return (
    <>
      <div className='card'>Password Validator</div>
      <PasswordEntry onSubmit={() => console.log('submitted')} />
    </>
  );
}

export default App;
