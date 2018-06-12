import React from 'react'
import { ListItem } from 'native-base'


class TaskListItem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { task } = this.props
        return (
            <ListItem>
                { JSON.stringify(task.description) }
            </ListItem>
        )
    }
}

export default TaskListItem