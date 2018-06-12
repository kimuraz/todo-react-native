import React from 'react'
import { View, Text } from 'react-native'

class Error extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { msg } = this.props
        return (
            <View>
                <Text>OOOOOPS!</Text>    
                <Text>{ msg }</Text>
            </View>
        )
    }
}

export default Error