import React from 'react'
import { Layout } from 'antd'
import './index.css'
const { Footer } = Layout
export default () => {
  return (
    <Footer className='foot'>
      <span>github地址：</span>
      <a target="_blank" href="https://github.com/xl-wolf/react-hooks-ts-webpack.git">https://github.com/xl-wolf/react-hooks-ts-webpack.git</a>
    </Footer>
  )
}