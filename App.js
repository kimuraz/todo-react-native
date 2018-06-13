import React from 'react'
import { Text } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Root, Title, Body, Subtitle } from 'native-base';

import * as Storage from './utils/Storage'
import Error from './components/Error'
import ToDo from './components/ToDo'
import Done from './components/Done'
import TaskForm from './components/TaskForm'

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      currentTab: 'ToDo',
      list: [],
      err: false,
      toggleForm: false
    }

    this.toggleForm = this.toggleForm.bind(this)
    this.save = this.save.bind(this)
  }

  changeTab(next) {
    this.setState({ ...this.state, currentTab: next })
  }

  toggleForm(toggle) {
    this.setState({ ...this.state, toggleForm: toggle })
  }

  loadList() {
    Storage.getTasks().then((dt) => {
      const list = dt && Object.values(dt) ? [...Object.values(dt)] : []
      this.setState({ ...this.state, list: list.sort((a,b) => {
        const dtA = new Date(a.createdOn).getTime()
        const dtB = new Date(b.createdOn).getTime()
        return dtA > dtB ? 1 : dtB > dtA ? -1 : 0
      })})
    }).catch((err) => {
      this.setState({ ...this.state, list: [], err: true})
      console.log(err)
    })
  }

  save(task) {
    Storage.saveTask(task).then(() => {
      this.loadList()
    })
  }

  componentDidMount() {
    this.loadList()
  }


  render() {
    const { currentTab, err, list, toggleForm } = this.state
    return (
      <Root>
        <Container>
          <Header>
            <Body>
              <Title>ToDo App</Title>
              <Subtitle>Made with ReactNative</Subtitle>
            </Body>
          </Header>
          <Content>
            { err ? <Error msg={'Failed to load your task list! :('}/> :
            currentTab === 'ToDo' ? <ToDo list={list} openForm={this.toggleForm} save={this.save}/> : 
            currentTab === 'Done' ? <Done list={list}/> :
            <Error msg={'Wrong menu entry! O.õ'}/>
            }
          </Content>
          <Footer>
            <FooterTab>
              <Button active={currentTab === 'ToDo'} onPress={() => this.changeTab('ToDo')}>
                <Text>To Do</Text>
              </Button>
              <Button active={currentTab === 'Done'} onPress={() => this.changeTab('Done')}>
                <Text>Done</Text>
              </Button>
            </FooterTab>
          </Footer>
          <TaskForm visible={toggleForm} closeForm={this.toggleForm} save={this.save}/>
        </Container>
      </Root>
    )
  }
}
