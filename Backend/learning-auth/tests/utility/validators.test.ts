import { z, ZodError } from "zod";
import { userSchema } from "../../src/utility/validators"

describe('Validator test suite', () => {
    it('should fail if the email is not valid', () => {
        // Arrange
        const invalidUser = {
            name: 'Test User',
            email: 'test@gmail', // Invalid email
            username: 'test_user',
            password: 'test_password'
        };

        // Act & Assert
        expect(() => userSchema.parse(invalidUser)).toThrow(ZodError)
    });

    it('should fail if the password is less than 8 characters', () => {
        // Arrange
        const invalidUser = {
            name: 'Test User',
            email: 'test@gmailcom',
            username: 'test_user',
            password: 'invalid'
        };

        // Act & Assert
        expect(() => userSchema.parse(invalidUser)).toThrow(ZodError)
    });

    it('should fail if the username is not present', () => {
        // Arrange
        const invalidUser = {
            name: 'Test User',
            email: 'test@gmail.com',
            password: 'test_password'
        };

        // Act & Assert
        expect(() => userSchema.parse(invalidUser)).toThrow(ZodError)
    });

    it('should pass if the the data is valid', () => {
        // Arrange
        const validUser = {
            name: 'Test User',
            email: 'test@gmail.com',
            username: 'test_user',
            password: 'test_password'
        };

        // Act & Assert
        expect(userSchema.parse(validUser)).toStrictEqual(validUser);
    });
})