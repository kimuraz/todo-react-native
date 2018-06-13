import React from 'react'
import { ScrollView } from 'react-native'
import { List, ListItem } from 'native-base'
import TaskListItem from './TaskListItem';

class Done extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const doneList = this.props.list.filter(t => t.isDone)
        return (
            <ScrollView>
                <List>
                    {
                        doneList && doneList.length ?
                            doneList.map(task => <TaskListItem task={task} key={task.id} />)
                            : <ListItem><Text>No tasks here</Text></ListItem>
                    }
                </List>
            </ScrollView>
        )
    }
}

export default Done
