import React, {useState} from 'react';
import ControlPanelContainer from "../ControlPanel/ControlPanel";
import Chart from "../Chart/Chart";
import {checkCommand} from "../../helpers";

const field = (props) => {
    const {x, y} = props;
    const arrChart = [];
    for (let i = 0; i < y; i++) {
        arrChart[i] = [];
        for (let j = 0; j < x; j++) {
            arrChart[i][j] = '';
        }
    }
    return arrChart;
};

const line = (props) => {
    const {x1, y1, x2, y2, arrChart} = props;
    let changedArrChart = arrChart.map(item => Object.assign([], item));
    changedArrChart[y1 - 1][x1 - 1] = 'X';
    changedArrChart[y2 - 1][x2 - 1] = 'X';
    if (x1 === x2) {
        for (let i = y1 - 1; i < y2 - 1; i++) {
            changedArrChart[i][x1 - 1] = 'X';
        }
    } else {
        for (let i = x1 - 1; i < x2 - 1; i++) {
            changedArrChart[y1 - 1][i] = 'X';
        }
    }
    return changedArrChart;
};

const rectangle = (props) => {
    const {x1, y1, x2, y2, arrChart} = props;
    let changedArrChart = arrChart.map(item => Object.assign([], item));
    changedArrChart = line({
        x1: x1, y1: y1,
        x2: x2, y2: y1, arrChart: changedArrChart
    });
    changedArrChart = line({
        x1: x1, y1: y2,
        x2: x2, y2: y2, arrChart: changedArrChart
    });
    changedArrChart = line({
        x1: x1, y1: y1,
        x2: x1, y2: y2, arrChart: changedArrChart
    });
    changedArrChart = line({
        x1: x2, y1: y1,
        x2: x2, y2: y2, arrChart: changedArrChart
    });
    return changedArrChart;
};

const findField = (arrChart) => {
    const fields = [], visited = new Set;
    for (let i = 0; i < arrChart.length; i++) {
        for (let j = 0; j < arrChart[i].length; j++) {
            if (visited.has(i + '_' + j)) continue;
            let field = traverse(i, j, [], visited, arrChart);
            if (field) {
                fields.push(field);
            }
        }
    }
    return fields;
};

const traverse = (x, y, current = [], visited, arrChart) => {
    if (x < 0 || y < 0 || x > arrChart.length - 1 || y > arrChart[0].length - 1) return;
    if (arrChart[x][y] === 'X' || visited.has(x + '_' + y)) return;
    current.push(x + '_' + y);
    visited.add(x + '_' + y);
    traverse(x, y + 1, current, visited, arrChart);
    traverse(x, y - 1, current, visited, arrChart);
    traverse(x - 1, y, current, visited, arrChart);
    traverse(x + 1, y, current, visited, arrChart);
    return current;
};

const fill = (props) => {
    const {x, y, colour, arrChart} = props;
    const changedArrChart = arrChart.map(item => Object.assign([], item));
    const fields = findField(changedArrChart);
    for (let i = 0; i < fields.length; i++) {
        const fillField = fields[i].includes(`${y - 1}_${x - 1}`);
        if (fillField) {
            for (let j = 0; j < changedArrChart.length; j++) {
                for (let k = 0; k < changedArrChart[j].length; k++) {
                    if (fields[i].includes(`${j}_${k}`)) {
                        changedArrChart[j][k] = colour;
                    }
                }
            }
            break;
        }
    }
    return changedArrChart;
};

const Drawer = (props) => {
    const [chartReady, setChartReady] = useState(false);
    const [arrChart, setArrChart] = useState([]);

    const handelAddCommand = (command) => {
        const preparedCommand = command.split(' ');
        const isValid = checkCommand(preparedCommand, arrChart);

        if (isValid && preparedCommand[0] === 'C') {
            setChartReady(true);
            setArrChart(field({x: preparedCommand[1], y: preparedCommand[2]}));
        } else if (isValid && chartReady && preparedCommand[0] === 'L') {
            setArrChart(line({
                x1: preparedCommand[1], y1: preparedCommand[2],
                x2: preparedCommand[3], y2: preparedCommand[4], arrChart
            }));
        } else if (isValid && chartReady && preparedCommand[0] === 'R') {
            setArrChart(rectangle({
                x1: preparedCommand[1], y1: preparedCommand[2],
                x2: preparedCommand[3], y2: preparedCommand[4], arrChart
            }));
        } else if (isValid && chartReady && preparedCommand[0] === 'B') {
            setArrChart(fill({x: preparedCommand[1], y: preparedCommand[2], colour: preparedCommand[3], arrChart}));
        }
    };

    return (
        <div>
            <ControlPanelContainer handelAddCommand={handelAddCommand}/>
            {chartReady && <Chart arrChart={arrChart}/>}
        </div>
    )
};

export default Drawer;
