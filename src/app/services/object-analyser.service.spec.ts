import { TestBed } from '@angular/core/testing';

import { FieldModel } from '../models';
import { ObjectAnalyserService } from './object-analyser.service';

describe('ObjectAnalyserService', () => {
    let service: ObjectAnalyserService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ObjectAnalyserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return empty list for undefined input', () => {
        const input = undefined;

        const result = service.analyse(input);

        expect(result).toEqual([]);
    });

    it('should return empty list for null input', () => {
        const input = null;

        const result = service.analyse(input);

        expect(result).toEqual([]);
    });

    it('should return empty list for string input', () => {
        const input = "I'm not an object";

        const result = service.analyse(input);

        expect(result).toEqual([]);
    });

    it('should return empty list for empty object', () => {
        const input = {};

        const result = service.analyse(input);

        expect(result).toEqual([]);
    });

    it('should return field list for array input', () => {
        const input = [1, 'b'];

        const result = service.analyse(input);

        const expectedResult: FieldModel[] = [
            {
                name: '0',
                type: 'number',
                value: 1,
                fields: [],
            },
            {
                name: '1',
                type: 'string',
                value: 'b',
                fields: [],
            },
        ];
        expect(result).toEqual(expectedResult);
    });

    it('should return field list for easy object input', () => {
        const input = { b: 'Hey', key: '5599-CA' };

        const result = service.analyse(input);

        const expectedResult: FieldModel[] = [
            {
                name: 'b',
                type: 'string',
                value: 'Hey',
                fields: [],
            },
            {
                name: 'key',
                type: 'string',
                value: '5599-CA',
                fields: [],
            },
        ];
        expect(result).toEqual(expectedResult);
    });

    it('should return field list for nested object input', () => {
        const input = {
            age: 36,
            address: {
                street: 'Feuerbachstraße 11',
                zip: '12357',
                city: 'Berlin',
            },
            subscription: {
                isActive: true,
            },
        };

        const result = service.analyse(input);

        const expectedResult: FieldModel[] = [
            {
                name: 'age',
                type: 'number',
                value: 36,
                fields: [],
            },
            {
                name: 'address',
                type: 'object',
                value: {
                    street: 'Feuerbachstraße 11',
                    zip: '12357',
                    city: 'Berlin',
                },
                fields: [
                    {
                        name: 'street',
                        type: 'string',
                        value: 'Feuerbachstraße 11',
                        fields: [],
                    },
                    {
                        name: 'zip',
                        type: 'string',
                        value: '12357',
                        fields: [],
                    },
                    {
                        name: 'city',
                        type: 'string',
                        value: 'Berlin',
                        fields: [],
                    },
                ],
            },
            {
                name: 'subscription',
                type: 'object',
                value: {
                    isActive: true,
                },
                fields: [
                    {
                        name: 'isActive',
                        type: 'boolean',
                        value: true,
                        fields: [],
                    },
                ],
            },
        ];
        expect(result).toEqual(expectedResult);
    });

    it('should add to existing field list for easy object input', () => {
        const input = { b: 'Hey', key: '5599-CA' };
        const existingFields: FieldModel[] = [
            {
                name: 'war schon',
                type: 'string',
                value: 'da',
                fields: [],
            },
        ];

        const result = service.analyse(input, existingFields);

        const expectedResult: FieldModel[] = [
            {
                name: 'war schon',
                type: 'string',
                value: 'da',
                fields: [],
            },
            {
                name: 'b',
                type: 'string',
                value: 'Hey',
                fields: [],
            },
            {
                name: 'key',
                type: 'string',
                value: '5599-CA',
                fields: [],
            },
        ];
        expect(result).toEqual(expectedResult);
    });
});
