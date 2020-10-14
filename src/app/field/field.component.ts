import { Component, Input, OnInit } from '@angular/core';

import { FieldModel } from '../models';

@Component({
    selector: 'app-field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit {
    @Input()
    field: FieldModel;

    constructor() {}

    ngOnInit(): void {}
}
