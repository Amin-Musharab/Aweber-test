class CustomFieldValidator {
  private value: string;
  private errors: string[];

  constructor(value: string) {
    this.value = value;
    this.errors = [];
  }

  required(message: string = 'Field is required'): this {
    if (!this.value) {
      this.errors.push(message);
    }
    return this;
  }

  minLength(
    length: number,
    message: string = `Must be at least ${length} characters long`
  ): this {
    if (this.value.length < length) {
      this.errors.push(message);
    }
    return this;
  }

  maxLength(
    length: number,
    message: string = `Must be at most ${length} characters long`
  ): this {
    if (this.value.length > length) {
      this.errors.push(message);
    }
    return this;
  }

  matches(other: string, message: string = 'Does not match'): this {
    if (this.value !== other) {
      this.errors.push(message);
    }
    return this;
  }

  containsUppercase(
    message: string = 'Must contain at least 1 uppercase letter'
  ): this {
    if (!/[A-Z]/.test(this.value)) {
      this.errors.push(message);
    }
    return this;
  }

  containsLowercase(
    message: string = 'Must contain at least 1 lowercase letter'
  ): this {
    if (!/[a-z]/.test(this.value)) {
      this.errors.push(message);
    }
    return this;
  }

  containsNumber(message: string = 'Must contain at least 1 number'): this {
    if (!/\d/.test(this.value)) {
      this.errors.push(message);
    }
    return this;
  }

  containsSpecialChar(
    message: string = 'Must contain at least 1 special character'
  ): this {
    const specialCharacters = /[!@#$%^&*()_+\-={[}\]|:;"'<,>.]/;
    if (!specialCharacters.test(this.value)) {
      this.errors.push(message);
    }
    return this;
  }

  getResult(): { passed: boolean; errors: string[] } {
    return {
      passed: this.errors.length === 0,
      errors: this.errors,
    };
  }
}

export default CustomFieldValidator;
