import {useEffect, useState} from 'react';
import {View, Button, Input} from '@fower/taro';
import PropTypes from 'prop-types';
import './index.scss';

const Stepper = ({value, onChange, min, max, step = 1}) => {
  const [inputValue, setInputValue] = useState(value);
  const [minusDisabled, setMinusDisabled] = useState(false);
  const [plusDisabled, setPlusDisabled] = useState(false);

  useEffect(() => {
    setInputValue(value);
    setMinusDisabled(value <= min);
    setPlusDisabled(value >= max);
  }, [value]);

  const handleBlur = (e) => {
    const prevValue = inputValue;

    // Ref: input输入时，输入框的值不显示为js设置的值
    // https://github.com/NervJS/taro/issues/2642#issuecomment-478960654
    setInputValue(e.target.value);
    const value = handleValue(e.target.value);
    setTimeout(() => setInputValue(value));

    // Triggered when the value changes
    if (prevValue !== value) {
      onChange(value);
    }
  };

  const handleClickMinus = () => {
    onChange(handleValue(value - step));
  };

  const handleClickPlus = () => {
    onChange(handleValue(value + step));
  };

  const handleValue = (value) => {
    value = parseInt(value, 10);
    if (isNaN(value)) {
      value = 0;
    }

    if (value > max) {
      return max;
    }

    if (value < min) {
      return min;
    }

    return value;
  };

  return (
    <View className="mx-stepper">
      <Button className="mx-stepper-minus" onClick={handleClickMinus} disabled={minusDisabled}/>
      <Input className="mx-stepper-input" value={inputValue} onBlur={handleBlur}/>
      <Button className="mx-stepper-plus" onClick={handleClickPlus} disabled={plusDisabled}/>
    </View>
  );
};

Stepper.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onChange: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
};

export default Stepper;
