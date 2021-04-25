import logo from './logo.svg';
import './App.css';
import Title from './components/Title'
import TemplateList from './containers/TemplateList';

function App() {
  const data = [{'name':'Nom 1', 'xml_id': 'som_polissa.primera'},{'name':'Nom 1', 'xml_id': 'som_polissa.primera'}]
  return (
    <div className="App">
      <header className="App-header">
        <Title/>
      </header>
        <TemplateList templateList={data} />
    </div>
  );
}

export default App;
