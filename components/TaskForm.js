import React from 'react'
import { Modal, Text, StyleSheet } from 'react-native'

import { Item, Icon, Input, Button, View, Body } from 'native-base'

import ID from '../utils/ID'

class TaskForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            task: {
                id: '',
                description: '',
                isDone: false,
                createdOn: null
            }
        }
        this.saveTask = this.saveTask.bind(this)
    }

    saveTask() {
        const { task } = this.state

        if (!task.id) {
            this.setState({...this.state, task: { ...this.state.task, id: ID(), createdOn: new Date()}}, () => {
                this.props.save({ ...this.state.task })
                this.closeThis();
            })
        } else {
            this.props.save({ ...this.state.task })
            this.closeThis()
        }
    }

    closeThis() {
        this.setState({ ...this.state, task: {
            id: '', description: '', isDone: false
        }})
        this.props.closeForm(false)
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.props.visible}
                    >
                    <Body style={{ marginTop: 50, padding: 10 }}>
                        <Item>
                            <Icon type="FontAwesome" name='pencil' />
                            <Input placeholder='Description' onChangeText={(text) => this.setState({ ...this.state, task: { ...this.state.task, description: text }})}/>
                        </Item>
                        <View style={{flex: 1, flexDirection:'row', alignItems: 'flex-end', width: '100%'}}>
                            <Button danger style={styles.formBtn} onPress={() => this.closeThis()}>
                                <Text>Cancel</Text>
                            </Button>
                            <Button success style={styles.formBtn} onPress={() => this.saveTask()} disabled={!this.state.task.description}>
                                <Text>Save</Text>
                            </Button>
                        </View>
                    </Body>
                </Modal>
            </View>
        )
    }
}

export default TaskForm

const styles = StyleSheet.create({
    formBtn: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        margin: 2,
    }
})