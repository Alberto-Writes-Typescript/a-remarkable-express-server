
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:4000/api/v1",
  generates: {
    "src/api/v1/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-document-nodes"]
    },
    "src/api/v1/introspection.json": {
      plugins: ["introspection"]
    }
  }
};

export default config;
