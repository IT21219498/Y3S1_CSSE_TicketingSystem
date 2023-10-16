describe("emailRegEx", () => {
  it("should match valid email addresses", () => {
    const validEmails = [
      "test@example.com",
      "test.user@example.com",
      "test-user@example.com",
      "test_user@example.com",
      "test+user@example.com",
      "test.user+123@example.com",
      "test@example.co.uk",
      "test@example.io",
    ];

    validEmails.forEach((email) => {
      expect(emailRegEx.test(email)).toBe(true);
    });
  });

  it("should not match invalid email addresses", () => {
    const invalidEmails = [
      "test",
      "test@",
      "test@example",
      "test@example.",
      "test@example..com",
      "test@.example.com",
      "test@example_com",
      "test@example+com",
      "test@example.123",
      "test@example.12",
      "test@example.c",
    ];

    invalidEmails.forEach((email) => {
      expect(emailRegEx.test(email)).toBe(false);
    });
  });
});
