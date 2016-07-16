
import {TestableService} from "./testableservice.service";

let service:TestableService = new TestableService();

describe('testable servicetest', () => {
    it('should calculate 2+4=6', () => {
        expect(service.plus(2,4)).toBe(6);
    });
    it('should calculate 5+4=9', () => {
        expect(service.plus(5,4)).toBe(9);
    });
});