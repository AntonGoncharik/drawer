export const isNumber = (value) => (value instanceof Number || typeof value === 'number') && !isNaN(value);

export const checkCommand = (preparedCommand, arrChart) => {
    if (preparedCommand.length === 3
        && preparedCommand[0] === 'C'
        && isNumber(+preparedCommand[1])
        && isNumber(+preparedCommand[2])) {
        return true;
    }
    if (preparedCommand.length === 5
        && (preparedCommand[0] === 'L'
            || preparedCommand[0] === 'R')
        && isNumber(+preparedCommand[1])
        && isNumber(+preparedCommand[2])
        && isNumber(+preparedCommand[3])
        && isNumber(+preparedCommand[4])) {
        return true;
    }
    if (preparedCommand.length === 4
        && preparedCommand[0] === 'B'
        && isNumber(+preparedCommand[1])
        && isNumber(+preparedCommand[2])
        && typeof preparedCommand[3] === 'string') {
        return true;
    }
    return false;
};