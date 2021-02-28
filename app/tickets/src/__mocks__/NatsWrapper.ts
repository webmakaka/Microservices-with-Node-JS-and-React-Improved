export const natsWrapper = {
  client: {
    publish: jest
      .fn()
      .mockImplementation(
        (_subject: string, _data: string, callback: () => void) => {
          callback();
        }
      ),
  },
};
