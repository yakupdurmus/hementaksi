import React from 'react'
import { Icon } from 'native-base'

export const BasicIcon = (props) => <Icon {...props} style={[styles, props.style]} />

const styles = {
    color: '#3e3e3e'
}