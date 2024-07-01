import Stepper from '..';
import {render} from '@testing-library/react';

describe('Stepper', () => {
  test('basic', () => {
    const result = render(<Stepper/>);
    expect(result.container).toMatchSnapshot();
  });
});
