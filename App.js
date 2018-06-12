import React, { AsyncStorage } from 'react'
import { Text } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Root, Title, Body, Subtitle } from 'native-base';

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
    AsyncStorage.getAllKeys().then((arr) => {
      this.setState({ ...this.state, list: arr })
    }).catch((err) => {
      console.log(err)
      this.setState({ ...this.state, err: true })
    })
  }

  save(task) {
    AsyncStorage.setItem(`@Tasks:${task.id}`, JSON.stringify(task)).then(() => {
      console.log('here')
      const idx = this.state.list.findIndex(t => t.id === task.id)
      if (idx !== -1) {
        this.setState({ ...this.state, list: this.state.list.map(t => t.id === task.id ? task : t)})
      } else {
        this.setState({ ...this.state, list: [...this.state.list, task]})
      }
    }).catch((err) => {
      console.log(err)
    })
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
            currentTab === 'ToDo' ? <ToDo list={list} openForm={this.toggleForm}/> : 
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
