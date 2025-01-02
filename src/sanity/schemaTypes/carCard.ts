export const card = {
    name: 'card',
    title: 'Card',
    type: 'document',
    fields: [
        {
            name: 'brand',
            title: 'Brand',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'brand',
                maxLength: 96,
            },
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Sport', value: 'sport' },
                    { title: 'Sedan', value: 'sedan' },
                    { title: 'SUV', value: 'suv' },
                    { title: 'Hatchback', value: 'hatchback' },
                ],
            },
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'liters',
            title: 'Liters',
            type: 'number',
        },
        {
            name: 'auto',
            title: 'Auto',
            type: 'string',
        },
        {
            name: 'seats',
            title: 'Seats',
            type: 'number',
        },
    ]
}