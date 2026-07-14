import { useState } from 'react'
import useTodoStore from './store/useTodoStore'
import useModalStore from './store/useModalStore'
import Card from './components/Card'
import ModalItemCreation from './components/modals/ModalItemCreation'
import InputText from './components/form/InputText'
import SelectField from './components/form/SelectField'
import './App.css'
import { OPTIONS, COMPLETION_OPTIONS } from './utils/filters'

function App() {
  const [searchValue, setSearchValue] = useState('');
  const [searchCriteria, setSearchCriteria] = useState({value: 1, label: 'Title'});
  const [searchCompleted, setSearchCompleted] = useState({value: 1, label: 'All'});

  const todos = useTodoStore((state) => state.todos);
  const modalIsOpen = useModalStore((state) => state.modalIsOpen);
  const modalToggle = useModalStore((state) => state.modalToggle);
  const modalReset = useModalStore((state) => state.modalReset);

  const fntSearchFilter = (item) => {
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

  const fntRenderItems = () => {
    if (todos.length < 1) {
      return 'No items added yet';
    }

    if (todos.filter(fntSearchFilter).length < 1) {
      return 'No items match the specified search criteria';
    }

    return <>
      {
        todos.filter(fntSearchFilter).map((item) => {
          return <Card key={item.id} item={item} />
        })
      }
    </>
  }

  return (
    <>
      {modalIsOpen && <ModalItemCreation />}
      <header className="header-main">
        <div className="container">
          <h1>Task Lister</h1>
        </div>
      </header>
      <section className="search-header">
        <div className="container">
          <div>
            <InputText
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
                label={"Criterion"}
                className={'input-field'}
                onChange={(e) => {
                  setSearchCriteria(OPTIONS.find(item => Number(item.value) === Number(e.target.value)));
                }}
                options={OPTIONS}
              />
              <SelectField
                label={"Status"}
                className={'input-field'}
                onChange={(e) => {
                  setSearchCompleted(COMPLETION_OPTIONS.find(item => Number(item.value) === Number(e.target.value)));
                }}
                options={COMPLETION_OPTIONS}
              />
            </div>
          </div>
          <div>
            <button className={'btn btn-large'} onClick={() => {
              modalReset();
              modalToggle();
            }}>+ New item</button>
          </div>
        </div>
      </section>
      <section>
        <div className="container cards-container">
          {fntRenderItems()}
        </div>
      </section>
    </>
  )
}

export default App
