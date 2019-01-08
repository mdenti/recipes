import { weights, volumes } from './Units';

const defaultRecipes = [
    {
        id: 1,
        name: 'Sugar water',
        picture: 'http://vignette3.wikia.nocookie.net/men-in-black/images/6/69/Edgar-human_SS_01.jpg/revision/latest?cb=20120521120404',
        ingredients: [{
            name: 'sugar',
            quantity: 100,
            unit: weights.gram,
        },
        {
            name: 'water',
            quantity: 1,
            unit: volumes.deciliter,
        }],
        steps: [
            'Pour water in a glass big enough',
            'Add sugar to the glass',
            'Briefly mix with a spoon',
            'Enjoy your glass of sugar water in your Edgar suit',
        ],
    }
];

export default defaultRecipes;