import React from 'react';
import s from './Chart.module.css';

const Chart = (props) => {
    return (
        <div className={s.chartBlock}>
            <table>
                {props.arrChart.map((row, idRow) => (
                    <tbody key={idRow}>
                    <tr key={idRow}>
                        {row.map((col, idCol) => <td key={`${idRow}_${idCol}`}>{col}</td>)}
                    </tr>
                    </tbody>
                ))}
            </table>
        </div>
    )
};

export default Chart;
