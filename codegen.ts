import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:8080/graphql",
  documents: "src/**/*.{graphql,ts,tsx}",
  generates: {
    "src/__generated__/graphql.tsx": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: { withHooks: true, reactApolloVersion: 3 },
    },
  },
};
export default config;
