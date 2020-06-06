
enum ThemeContentType {
    Text= 'text',
    Link= 'hyperlink',
    Multimedia= 'multimedia',
}

interface Theme {
    key: string;
    value: string|number;
    // content_type?: ThemeContentType;
    label?: string;
}

interface ThemeProviderConfig {
    [theme: string]: Array<Theme> | string;
}

const themeProviderConfig = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'array',
    items: [
        {
            type: 'object',
            properties: {
                /* content_type: {
                    type: 'string',
                    enum: ['text', 'multimedia', 'hyperlink'],
                }, */
                label: {
                    type: 'string',
                },
                key: {
                    type: 'string',
                    minLength: 2,
                },
                value: {
                    anyOf: [
                        {
                            type: 'string',
                            minLength: 1,
                        },
                        {
                            type: 'number',
                        },
                    ]
                },
            },
            additionalProperties: false,
            required: [
                'key',
                'value',
            ],
        },
    ],
};

export {
    themeProviderConfig,
    ThemeContentType,
    Theme,
    ThemeProviderConfig,
};
