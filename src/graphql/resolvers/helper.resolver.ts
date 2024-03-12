export abstract class HelperResolver {
  protected LogImportantError(err: Error) {
    if (err?.message.includes("UNAVAILABLE"))
      console.error(`${new Date().toISOString()} error:${err.message}`);
  }
}
