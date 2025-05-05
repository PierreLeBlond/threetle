import glsl from "prettier-plugin-glsl";

const config = {
  overrides: [{ files: ["*.frag"], options: { parser: "glsl-parser" } }],
  plugins: [glsl],
};

export default config;
