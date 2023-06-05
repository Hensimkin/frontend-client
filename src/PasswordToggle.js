/* eslint-disable */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEye, faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

const PasswordToggle = () => {
  const [visible, setVisiblity] = useState(false);

  const Icon = (
    <FontAwesomeIcon
      icon={visible ? faEyeSlash : faEye}
      onClick={() => setVisiblity((visiblity) => !visiblity)}
    />
  );

  const InputType = visible ? 'text' : 'password';

  return [InputType, Icon];
};

export default PasswordToggle;
