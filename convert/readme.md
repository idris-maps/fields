# Convert `fields`

### `toJsonSchema`

Convert an array of field definitions to a
[JSON schema](https://json-schema.org/)

```ts
const toJsonSchema = (fields: Field[]) => JSONSchema7;
```

### `toTypeDefinition`

Create a typescript interface from an array of field definitions

```ts
const toTypeDefinition = (fields: Field[]) => string;
```
