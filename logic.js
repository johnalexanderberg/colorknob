const noteName = [
    'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
]

colors = [

    '#71EFC3',
    '#D8F1F5',
    '#F5EEB0',
    '#8F84F0',
    '#FA96B4',
    '#F075DB',
    '#8B4E81',
    '#DCA8FE',
    '#88BBF4',
    '#7371AD',
    '#FFC960',
    '#EC6C64',

]

const scale = [
    {
        key: 'C',
        weight: 8 / 8,
    },
    {
        key: 'C#',
        weight: 0
    },
    {
        key: 'D',
        weight: 6 / 8
    },
    {
        key: 'D#',
        weight: 0
    },
    {
        key: 'E',
        weight: 3 / 8
    },
    {
        key: 'F',
        weight: 7 / 8
    },
    {
        key: 'F#',
        weight: 0
    },
    {
        key: 'G',
        weight: 1 / 8
    },
    {
        key: 'G#',
        weight: 0
    },
    {
        key: 'A',
        weight: 5 / 8
    },
    {
        key: 'A#',
        weight: 0
    },
    {
        key: 'B',
        weight: 2 / 8
    }
]

function getNoteWeight(i, slider) {


    const noteWeight = scale[i].weight
    
    t = mapAndClamp(slider.value / slider.max, 0, 1, 0, 2)


    if (noteWeight === 0) return 0;

    const path1 = (mapAndClamp(t - (1 - noteWeight), 0, 1, 0, noteWeight + (1 - noteWeight)));

    const path2 = (mapAndClamp(t, 1, 2, noteWeight, 1));

    if (slider.value / slider.max < 0.5) {
        return path1
    } else {
        return path2
    }

}


// Ease in out cubic
// Easings specify the rate at which an animation happens over time.
// Ease in out is a curve with a slower entrance, a faster middle and
// a slower exit, making animations *ease* into and out of their movement.
function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
}

// Clamp
// e.g. clamp(11, 0, 10) would return 10
// e.g. clamp(9, 0, 10) would return 9
function clamp(input, min, max) {
    return Math.max(min, Math.min(input, max))
}

// Map range
// Re-maps a number from one range to another. eg. https://processing.org/reference/map_.html
// (nb: numbers are not clamped by default to min and max parameters)
// e.g. map(70, 0, 100, 0, 10) would return 7
// e.g. map(70, 0, 100, 10, 20) would return 17
function map(value, low1, high1, low2, high2) {
    return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
}

// do both of the above! map and clamp together!
// e.g. mapAndClamp(70, 0, 100, 0, 10) would return 7
// e.g. mapAndClamp(70, 0, 100, 10, 20) would return 17
// e.g. mapAndClamp(110, 0, 100, 10, 20) would return 20, not 21, as it's clamped to 20 max
function mapAndClamp(value, low1, high1, low2, high2) {
    return clamp(
        map(value, low1, high1, low2, high2),
        Math.min(low2, high2),
        Math.max(low2, high2)
    )
}
