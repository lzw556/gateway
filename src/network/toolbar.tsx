import React from 'react';
import { Button, Card } from 'antd';
import { GU_COMMANDS } from '../device/constants';
import { Format } from '../locale';

export const Toolbar = () => {
  return (
    <Card className='section' bordered={false} headStyle={{ border: 0 }} size='small' title={<Format id='maintenance'/>}>
      <Button.Group>
        {GU_COMMANDS.map(({ label, value }) => (
          <Button key={value} icon={<span className={`iconfont icon-${value}`}></span>}>
            {<Format id={label}/>}
          </Button>
        ))}
        <Button key='time' icon={<span className='iconfont icon-systime'></span>}>
          <Format id='system.time'/>
        </Button>
        <Button key='debug' icon={<span className='iconfont icon-console'></span>}>
          <Format id="debug.mode"/>
        </Button>
      </Button.Group>
    </Card>
  );
};
