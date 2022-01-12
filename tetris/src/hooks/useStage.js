import { useState, useEffect } from 'react';
import { createStage } from '../gameHelpers';

export const useStage = (player, resetPlayer) => {
    const [stage, setStage] = useState(createStage());

    useEffect(() => {
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
            }

            return newStage;
        };

        console.log(`pos before updateStage: [${player.pos.x}, ${player.pos.y}]`);
        setStage(prev => updateStage(prev));
        console.log(`pos after move: [${player.pos.x}, ${player.pos.y}]`);


    }, [player, resetPlayer]);

    return [stage, setStage];
};