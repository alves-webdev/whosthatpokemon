export type pokemon = {
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    versions: {
      "generation-v": {
        "black-white": {
          front_default: string;
          back_default: string;
          animated: {
            front_default: string;
            back_default: string;
          };
        };
      };
    };
  };
};
