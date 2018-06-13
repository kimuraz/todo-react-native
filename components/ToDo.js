import React from 'react'
import { Text, ScrollView, StyleSheet } from 'react-native'
import { Container, List, ListItem, Icon, Fab, View } from 'native-base'
import TaskListItem from './TaskListItem'


class ToDo extends React.Component {

    constructor(props) {
        super(props)
    }

    openForm() {
        this.props.openForm(true)
    }

    render() {
        const toDoList = this.props.list.filter(task => !task.isDone)
        return (
            <Container>
                <ScrollView>
                    <List>
                        {
                            toDoList && toDoList.length ?
                                toDoList.map(task => <TaskListItem task={task} key={task.id} save={this.props.save} />)
                                : <ListItem><Text>No tasks here</Text></ListItem>
                        }
                    </List>
                </ScrollView>
                <Fab
                    onPress={() => this.openForm()}
                    position="topRight"
                    containerStyle={{}}
                >
                    <Icon type="FontAwesome" name='plus-square' />
                </Fab>
            </Container>
        )
    }
}

export default ToDo

const styles = StyleSheet.create({
    addButton: {
        alignSelf: 'flex-end'
    }
})