import {Injectable} from '@angular/core';

@Injectable()
export class TestableService {
    plus(a, b) {
        return a+b;
    }
}