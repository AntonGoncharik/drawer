import React, {useState} from 'react';
import s from './ControlPanel.module.css';

const ControlPanelContainer = (props) => {
    const [command, setCommand] = useState('');
    const handleSetCommand = (e) => {
        setCommand(e.currentTarget.value);
    };

    return (
        <div>
            <ControlPanel command={command}
                          handleSetCommand={handleSetCommand}
                          handelAddCommand={props.handelAddCommand}/>
        </div>
    )
};

const ControlPanel = (props) => {
    return (
        <div className={s.controlBlock}>
            <input placeholder={'enter the command'}
                   value={props.command}
                   onChange={(e) => props.handleSetCommand(e)}/>
            <button onClick={(e) => props.handelAddCommand(props.command)}>perform command</button>
        </div>
    )
};

export default ControlPanelContainer;
