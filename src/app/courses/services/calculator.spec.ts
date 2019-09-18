import { CalculatorService } from '../services/calculator.service';
import { LoggerService } from './logger.service';
import { TestBed } from '@angular/core/testing';

describe('CalculatorService', () => {

  let calculator: CalculatorService,
    loggerSpy: any;

  beforeEach(() => {

    console.log('Calling before each test');

    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });

    calculator = TestBed.get(CalculatorService);

  });

  it('should add two numbers', () => {

    const result = calculator.add(2, 2);

    expect(result).toBe(4);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

  });

  it('should subtract two numbers', () => {

    const result = calculator.subtract(4, 2);

    expect(result).toBe(2, 'unexpected subtract');

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);

  });


})