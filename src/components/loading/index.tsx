import React from 'react';
import { Spin } from 'antd'
interface ILoadingProps {
    size?: 'small' | 'default' | 'large'
}
export default (ILoadingProps: ILoadingProps) => {
    const { size = 'default' } = ILoadingProps
    return <div className='loading-looks'><Spin size={size} /></div>
}