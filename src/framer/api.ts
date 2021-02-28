// TODO:
// - Support storing state together with source
// - Support requesting metadata + state

export const api = {
  async updateSource(source: string): Promise<void> {
    // TODO: Make it wait for signal from parent.
    window.parent?.postMessage(
      JSON.stringify({ type: "updateSource", source }),
      "*"
    );
  },
};
