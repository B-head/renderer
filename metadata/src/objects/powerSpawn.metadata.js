/**
 * Created by vedi on 23/04/2017.
 */
const ellipse1 = {
    color: 0x222222,
    radius: 75,
    strokeColor: 0xcccccc,
    strokeWidth: 7,
};
const ellipse2 = {
    color: 0x222222,
    radius: 68,
    strokeColor: 0xf41f33,
    strokeWidth: 10,
};

const ellipse3 = {
    color: 0x181818,
    radius: 59,
};

const ellipse4 = {
    color: 0x555555,
    radius: 38,
};

const arc = {
    color: 0xf41f33,
    radius: 50,
    startAngle: -Math.PI / 2,
    strokeWidth: 10,
};

export default {
    calculations: [
        {
            id: 'powerAngle',
            props: ['power', 'powerCapacity'],
            func: ({ state: { power, powerCapacity } }) =>
                arc.startAngle +
                (powerCapacity ? (((2 * Math.PI) * power) / powerCapacity) : 0),
        },
    ],
    processors: [
        {
            type: 'draw',
            once: true,
            payload: {
                id: 'static',
                drawings: [
                    {
                        method: 'lineStyle',
                        params: [
                            ellipse1.strokeWidth,
                            ellipse1.strokeColor,
                            1,
                        ],
                    },
                    { method: 'beginFill', params: [ellipse1.color] },
                    {
                        method: 'drawCircle',
                        params: [
                            0,
                            0,
                            ellipse1.radius,
                        ],
                    },
                    { method: 'endFill' },
                    {
                        method: 'lineStyle',
                        params: [
                            ellipse2.strokeWidth,
                            ellipse2.strokeColor,
                            1,
                        ],
                    },
                    { method: 'beginFill', params: [ellipse2.color] },
                    {
                        method: 'drawCircle',
                        params: [
                            0,
                            0,
                            ellipse2.radius,
                        ],
                    },
                    { method: 'endFill' },
                    {
                        method: 'lineStyle',
                        params: [0, 0, 1],
                    },
                    { method: 'beginFill', params: [ellipse3.color] },
                    {
                        method: 'drawCircle',
                        params: [
                            0,
                            0,
                            ellipse3.radius,
                        ],
                    },
                    { method: 'endFill' },
                ],
            },
        },
        {
            type: 'userBadge',
            once: true,
            payload: {
                parentId: 'static',
                color: ellipse4.color,
                radius: ellipse4.radius,
            },
        },
        {
            type: 'draw',
            props: ['powerAngle'],
            payload: {
                id: 'arc',
                parentId: 'static',
                drawings: [
                    {
                        method: 'lineStyle',
                        params: [
                            arc.strokeWidth,
                            arc.color,
                            1,
                        ],
                    },
                    {
                        method: 'arc',
                        params: [
                            0,
                            0,
                            arc.radius,
                            arc.startAngle,
                            { $calc: 'powerAngle' },
                        ],
                    },
                ],
            },
        },
        {
            type: 'resourceCircle',
            props: ['energy', 'energyCapacity'],
            payload: {
                parentId: 'static',
                radius: ellipse4.radius,
            },
        },
        {
            type: 'sprite',
            layer: 'lighting',
            once: true,
            payload: {
                texture: 'glow',
                width: 150,
                height: 150,
                alpha: 1,
            },
        },
        {
            id: 'glow',
            type: 'sprite',
            once: true,
            layer: 'lighting',
            payload: {
                texture: 'glow',
                alpha: 0.5,
                scale: {
                    x: 1,
                    y: 1,
                },
            },
        },
        {
            type: 'runAction',
            props: ['power'],
            payload: {
                id: 'glow',
            },
            actions: [{
                action: 'Sequence',
                params: [[
                    {
                        action: 'Spawn',
                        params: [[
                            {
                                action: 'TintTo',
                                params: [0xFF3333, { $processorParam: 'tickDuration', koef: 0.2 }],
                            },
                            {
                                action: 'AlphaTo',
                                params: [1, { $processorParam: 'tickDuration', koef: 0.2 }],
                            },
                            {
                                action: 'ScaleTo',
                                params: [2, 2, { $processorParam: 'tickDuration', koef: 0.2 }],
                            },
                        ]],
                    },
                    {
                        action: 'Spawn',
                        params: [[
                            {
                                action: 'TintTo',
                                params: [0xFFFFFF, { $processorParam: 'tickDuration', koef: 0.8 }],
                            },
                            {
                                action: 'AlphaTo',
                                params: [0.5, { $processorParam: 'tickDuration', koef: 0.8 }],
                            },
                            {
                                action: 'ScaleTo',
                                params: [1, 1, { $processorParam: 'tickDuration', koef: 0.8 }],
                            },
                        ]],
                    },
                ]],
            }],
        },
    ],
    zIndex: 12,
};
