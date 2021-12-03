# Fields

JSON definition of form fields

## Validation

### `validateFields`

Validates a field definition

```ts
const validateFields: (fields: any) => {
  isValid: boolean;
  messages?: string[];
};
```

### `validateValue`

Validates a value against a field definition

```ts
const validateValue: (field: Field, value: any) => {
  isValid: boolean;
  message?: string;
};
```

### `validateValues`

Validates an object against an array of field definitions

```ts
const validateValues: (fields: Field[], data: any) => {
  isValid: boolean;
  messages?: string[];
};
```

## Convert

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
