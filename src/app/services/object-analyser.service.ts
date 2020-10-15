import { Injectable } from '@angular/core';

import { FieldModel } from '../models';

@Injectable({
    providedIn: 'root',
})
export class ObjectAnalyserService {
    constructor() {}

    analyse(nestedObject: any, fields: FieldModel[] = []): FieldModel[] {
        if (nestedObject == null) {
            return [];
        }

        if (typeof nestedObject !== 'object') {
            console.warn('object is not an object');

            return [];
        }

        const names = Object.keys(nestedObject);

        for (const name of names) {
            const value = nestedObject[name];
            const type = typeof value;

            const field: FieldModel = {
                name,
                value,
                type,
                fields: [],
            };

            fields.push(field);

            if (type === 'object') {
                this.analyse(value, field.fields);
            }
        }

        return fields;
    }
}
