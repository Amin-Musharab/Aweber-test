import { useState } from 'react';
import CustomFieldValidator from '../CustomFieldValidator';
import './password_container.css';

interface PasswordEntryProps {
  onSubmit: () => void;
}

const PasswordContainer: React.FC<PasswordEntryProps> = ({ onSubmit }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [validationResult, setValidationResult] = useState({
    passed: false,
    message: [''],
  });

  const handleValidation = () => {
    const passwordValidator = new CustomFieldValidator(password)
      .matches(confirmPassword, 'Passwords do not match')
      .required()
      .minLength(6)
      .containsUppercase()
      .containsLowercase()
      .containsNumber()
      .containsSpecialChar()
      .getResult();

    if (!passwordValidator.passed) {
      setValidationResult({
        passed: false,
        message: passwordValidator.errors,
      });
      return;
    }

    setValidationResult({
      passed: true,
      message: ['Validation passed'],
    });
    onSubmit();
  };

  return (
    <div className='password_card'>
      <div className='password_card_container'>
        <input
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='form_field'
        />
        {validationResult.message.map((err, idx) => (
          <p
            style={{
              color: validationResult.passed ? 'green' : 'red',
            }}
            className='errors'
            key={idx}
          >
            {err}
          </p>
        ))}
        <input
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='form_field'
        />
        <button onClick={handleValidation} className='sbt_btn'>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PasswordContainer;
