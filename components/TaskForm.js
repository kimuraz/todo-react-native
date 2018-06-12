import React from 'react'
import { Modal, Text, StyleSheet } from 'react-native'

import { Item, Icon, Input, Button, View, Body } from 'native-base'

import ID from '../utils/ID'

class TaskForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            description: '',
            isDone: false
        }
    }

    componentDidMount() {
        if (this.props.task && this.props.task.id) {
            this.setState({ ...this.state, ...this.props.task })
        } else {
            this.setState({ ...this.state, id: ID() })
        }
    }

    saveTask() {
        console.log('saving')
        console.log(this.state)
        // this.props.save({ ...this.state })
        // this.toggleForm()
    }

    closeThis() {
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
                            <Input placeholder='Icon Textbox' onChange={(text) => this.setState({ ...this.state, description: text })}/>
                        </Item>
                        <View style={{flex: 1, flexDirection:'row', alignItems: 'flex-end', width: '100%'}}>
                            <Button danger style={styles.formBtn} onPress={() => this.closeThis()}>
                                <Text>Cancel</Text>
                            </Button>
                            <Button success style={styles.formBtn} onPress={() => this.saveTask()}>
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