import { useState } from 'react'
import Card from './components/Card'
import ModalItemCreation from './components/ModalItemCreation'
import './App.css'

const OPTIONS = [
  {value: 1, label: 'Title'},
  {value: 2, label: 'Description'}
];

const COMPLETION_OPTIONS = [
  {value: 1, label: 'All'},
  {value: 2, label: 'Completed'},
  {value: 3, label: 'Incomplete'}
];

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchCriteria, setSearchCriteria] = useState(1);
  const [searchCompleted, setSearchCompleted] = useState(1);
  const [items, setItems] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFormInfo, setModalFormInfo] = useState({
    name: '',
    description: ''
  });

  return (
    <>
      {modalOpen && <ModalItemCreation
        modalFormInfo={modalFormInfo}
        setModalFormInfo={setModalFormInfo}
        setModalOpen={setModalOpen}
      />}
      <section id="center">
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <select onChange={(e) => {
          setSearchCriteria(e);
        }}>
          {OPTIONS.map((item) => {
            return <option key={item.value} selected={searchCriteria.selected === item.value} value={item.value}>{item.label}</option>
          })}
        </select>
        <select onChange={(e) => {
          setSearchCompleted(e);
        }}>
          {COMPLETION_OPTIONS.map((item) => {
            return <option key={item.value} selected={searchCompleted.selected === item.value} value={item.value}>{item.label}</option>
          })}
        </select>
      </section>
      <section>
        <button onClick={()=> setModalOpen(true)}>Add</button>
      </section>
      <section>
        {items.map((item) => {
          return <Card key={item.id} item={item}/>
        })}
      </section>
    </>
  )
}

export default App
