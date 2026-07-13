import { useState } from 'react'
import useTodoStore from './store/useTodoStore'
import useModalStore from './store/useModalStore'
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
  const [modalFormInfo, setModalFormInfo] = useState({
    name: '',
    description: ''
  });

  const todos = useTodoStore((state) => state.todos);
  const modalIsOpen = useModalStore((state) => state.modalIsOpen);
  const modalToggle = useModalStore((state) => state.modalToggle);

  return (
    <>
      {modalIsOpen && <ModalItemCreation
        modalFormInfo={modalFormInfo}
        setModalFormInfo={setModalFormInfo}
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
        <button onClick={modalToggle}>Add</button>
      </section>
      <section>
        {todos.map((item) => {
          console.log('item---', item);
          return <Card key={item.id} item={item}/>
        })}
      </section>
    </>
  )
}

export default App
