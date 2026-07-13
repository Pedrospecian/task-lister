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
  const [searchCriteria, setSearchCriteria] = useState({value: 1, label: 'Title'});
  const [searchCompleted, setSearchCompleted] = useState({value: 1, label: 'All'});
  const [modalFormInfo, setModalFormInfo] = useState({
    name: '',
    description: ''
  });

  const todos = useTodoStore((state) => state.todos);
  const loadTodoFromLocalStorage = useTodoStore((state) => state.loadTodoFromLocalStorage);
  const modalIsOpen = useModalStore((state) => state.modalIsOpen);
  const modalToggle = useModalStore((state) => state.modalToggle);
  const modalReset = useModalStore((state) => state.modalReset);

  const searchFilter = (item) => {
    if (searchValue) {
      if (searchCriteria.value === 1 && !item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }
      if (searchCriteria.value === 2 && !item.description.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }
    }

    if (searchCompleted.value === 2 && !item.completed) {
      return false;
    }

    if (searchCompleted.value === 3 && item.completed) {
      return false;
    }

    return true;
  }

  return (
    <>
      {modalIsOpen && <ModalItemCreation
        modalFormInfo={modalFormInfo}
        setModalFormInfo={setModalFormInfo}
      />}
      <header class="header-main">
        <div class="container">
          <h1>Task Lister</h1>
        </div>
      </header>
      <section className="search-header">
        <div className="container">
          <div className="flx-space-between">
            <input
              value={searchValue}
              className={'input-field'}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <select
              className={'input-field'}
              onChange={(e) => {
              setSearchCriteria(OPTIONS.find(item => Number(item.value) === Number(e.target.value)));
            }}>
              {OPTIONS.map((item) => {
                return <option key={item.value} value={item.value}>{item.label}</option>
              })}
            </select>
            <select
              className={'input-field'}
              onChange={(e) => {
              setSearchCompleted(COMPLETION_OPTIONS.find(item => Number(item.value) === Number(e.target.value)));
            }}>
              {COMPLETION_OPTIONS.map((item) => {
                return <option key={item.value} value={item.value}>{item.label}</option>
              })}
            </select>
            <button className={'btn'} onClick={() => {
              modalReset();
              modalToggle();
            }}>Add</button>
          </div>
        </div>
      </section>
      <section>
        <div class="container cards-container">
          {todos.length < 1 && 'No items added yet'}
          {todos.length >= 1 && todos.filter(searchFilter).length < 1 && 'No results for the search criteria'}
          {todos.filter(searchFilter).map((item) => {
            return <Card key={item.id} item={item}/>
          })}
        </div>
      </section>
    </>
  )
}

export default App
