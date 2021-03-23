import * as React from 'react'
import { Button, Form, Input } from 'antd'
import { history } from '@/utils'
import './index.less'
const { Item: FormItem } = Form
export default () => {
    const login = () => {
        sessionStorage.setItem('appAuth', 'true')
        history.push('/main/home');
    }
    return (
        <div className='form'>
            <div className='logo'>
                <h2>管理系统模板</h2>
            </div>
            <Form>
                <FormItem
                    label="账号:"
                    name="userName"
                    rules={
                        [
                            {
                                len: 11,
                                message: "请输入11位的手机号!"
                            },
                            {
                                pattern: new RegExp("^[0-9]*$"),
                                message: "手机号只能为数字!"
                            }
                        ]
                    }>
                    <Input
                        placeholder="请输入手机号"
                        allowClear
                        maxLength={11}
                    />
                </FormItem>
                <FormItem
                    label="密码"
                    name="password"
                    rules={[{
                        min: 6,
                        max: 20,
                        message: "请输入6-20位的密码!"
                    }]}>
                    <Input
                        type="password"
                        placeholder="请输入密码"
                        minLength={6}
                        maxLength={20}
                        allowClear
                    />
                </FormItem>
                <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                    onClick={login}
                >登录
                </Button>
            </Form>
        </div>)
}