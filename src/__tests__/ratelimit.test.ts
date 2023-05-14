// Check if the environment variables are defined
describe("upstash-env-variables", () => {
  it("should have a USE_UPSTASH variable", () => {
    expect(process.env.USE_UPSTASH).toBeDefined();
  });

  it("should have a UPSTASH_URL variable", () => {
    expect(process.env.UPSTASH_URL).toBeDefined();
  });

  it("should have a UPSTASH_TOKEN variable", () => {
    expect(process.env.UPSTASH_TOKEN).toBeDefined();
  });
});
