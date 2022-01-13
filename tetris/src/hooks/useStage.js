import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());
    const [rowsCleared, setRowsCleared] = useState(0);

    useEffect(() => {
        setRowsCleared(0);

        const sweepRows = newStage =>
            // acumulator?
            newStage.reduce((ack, row) => {
                // if we don't find any cells with the value of 0
                if (row.findIndex(cell => cell[0] === 0) === -1) {
                    // sweep row
                    setRowsCleared(prev => prev + 1);
                    // add empty rows at the beginning of accumulator (top of screen)
                    ack.unshift(new Array(newStage[0].length).fill([0, 'clear']));
                    return ack;
                }
                ack.push(row);
                return ack;
            }, [])

        const updateStage = prevStage => {
            // first flush the stage
            const newStage = prevStage.map(row =>
                row.map(cell => (cell[1] === 'clear' ? [0, 'clear'] : cell)),
            );

            // then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? 'merged' : 'clear'}`,
                        ];
                    }
                });
            });
            // Check if we have collided
            if (player.collided) {
                resetPlayer();
                // clear any rows that may be completed
                return sweepRows(newStage);
            }

            return newStage;
        };

        setStage(prev => updateStage(prev));

    }, [player, resetPlayer]);

    return [stage, setStage, rowsCleared];
};