import React from 'react'
import moment from 'moment'
import { Text } from 'react-native'
import { ListItem, Title, Body, Subtitle, CheckBox } from 'native-base'


class TaskListItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isDone: false,
        }
    }

    setDone() {
        setTimeout(() => {
            this.props.save(Object.assign({}, { ...this.props.task }, { isDone: true }))
        }, 500)
    }

    render() {
        const { task } = this.props
        const { isDone } = this.state

        return (
            <ListItem>
                { !task.isDone ?
                    <CheckBox onPress={() => this.setState({...this.state, isDone: true}, this.setDone())} checked={isDone}/>
                    : null }
                <Body style={{ flex: 1, alignItems: 'flex-start', marginLeft: 10}}>
                    <Text>{ task.description }</Text>
                    <Subtitle style={{color: 'black'}}>Criado em: { moment(task.createdOn).format('lll') }</Subtitle>
                </Body>
            </ListItem>
        )
    }
}

export default TaskListItem