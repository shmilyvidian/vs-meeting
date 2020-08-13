import { styled } from 'linaria/react'
import { View, Checkbox, CheckboxGroup, Image } from '@tarojs/components'
import { AtCheckbox } from 'taro-ui'

const center = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
}


export const NameItemImg = styled(Image)<{ind:number}>`
    ${center};
    position: absolute;
    width: 64px;
    height: 64px;
    top: ${props => props.ind * 48 + 8}px;
    left: 60px;
`
