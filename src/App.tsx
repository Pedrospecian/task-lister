import { useState } from 'react'
import useTodoStore from './store/useTodoStore'
import useTodoFormStore from './store/useTodoFormStore'
import useModalStore from './store/useModalStore'
import Card from './components/Card'
import ModalItemCreation from './components/modals/ModalItemCreation'
import ModalDeleteConfirmation from './components/modals/ModalDeleteConfirmation'
import InputText from './components/form/InputText'
import SelectField from './components/form/SelectField'
import './App.css'
import { OPTIONS, COMPLETION_OPTIONS } from './utils/options'
import type { Todo } from './interfaces/todo';

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({value: 'ALL', label: 'All'});
  const [searchCompleted, setSearchCompleted] = useState({value: 'ALL', label: 'All'});

  const todos = useTodoStore((state) => state.todos);
  const modalIsOpen = useModalStore((state) => state.modalIsOpen);
  const modalConfirmIsOpen = useModalStore((state) => state.modalConfirmIsOpen);
  const modalToggle = useModalStore((state) => state.modalToggle);
  const formReset = useTodoFormStore((state) => state.formReset);

  const handleSearchFilter = (item: Todo) => {
    if (searchValue) {
      if (searchCriteria.value === 'TITLE' && !item.title.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }
      if (searchCriteria.value === 'DESCRIPTION' && !item.description.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }

      if (searchCriteria.value === 'ALL' && !item.title.toLowerCase().includes(searchValue.toLowerCase()) && !item.description.toLowerCase().includes(searchValue.toLowerCase())) {
        return false;
      }
    }

    if (searchCompleted.value === 'COMPLETED' && !item.completed) {
      return false;
    }

    if (searchCompleted.value === 'INCOMPLETE' && item.completed) {
      return false;
    }

    return true;
  }

  const renderItems = () => {
    if (todos.length < 1) {
      return 'No items added yet';
    }

    const todosFiltered = todos.filter(handleSearchFilter);

    if (todosFiltered.length < 1) {
      return 'No items match the specified search criteria';
    }

    return <>
      {
        todosFiltered.map((item) => {
          return <Card key={item.id} item={item} />
        })
      }
    </>
  }

  return (
    <>
      {modalIsOpen && <ModalItemCreation />}
      {modalConfirmIsOpen && <ModalDeleteConfirmation />}
      <header className="header-main">
        <div className="container">
          <h1>Task Lister</h1>
        </div>
      </header>
      <section className="search-header">
        <div className="container">
          <div>
            <InputText
              id="search"
              value={searchValue}
              label={"Search"}
              type={'text'}
              className={'input-field'}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <div className="search-fields-wrapper">
              <SelectField
                id="search-criterion"
                label={"Criterion"}
                className={'input-field'}
                value={searchCriteria.value}
                onChange={(e) => {
                  setSearchCriteria(OPTIONS.find(item => item.value === e.target.value) ?? OPTIONS[0]);
                }}
                options={OPTIONS}
              />
              <SelectField
                id="search-status"
                label={"Status"}
                className={'input-field'}
                value={searchCompleted.value}
                onChange={(e) => {
                  setSearchCompleted(COMPLETION_OPTIONS.find(item => item.value === e.target.value) ?? COMPLETION_OPTIONS[0]);
                }}
                options={COMPLETION_OPTIONS}
              />
            </div>
          </div>
          <div>
            <button className={'btn btn-large'} onClick={() => {
              formReset();
              modalToggle();
            }}>+ New item</button>
          </div>
        </div>
      </section>
      <section>
        <div className="container cards-container">
          {renderItems()}
        </div>
      </section>
    </>
  )
}

export default App
