import * as React from 'react'
import { Layout } from 'antd'
import './index.css'
const { Footer } = Layout
export default () => {
  return (
    <Footer className='foot'>
      <span>github地址：</span>
      <a target="_blank" href="https://github.com/penglin666/react-ts-manage-template.git">https://github.com/penglin666/react-ts-manage-template.git</a>
    </Footer>
  )
}