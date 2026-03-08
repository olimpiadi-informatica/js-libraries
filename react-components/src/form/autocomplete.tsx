import { AtSign, KeyRound, UserRound } from "lucide-react";

import { TextField, type TextFieldProps } from "./input";

export type TextAutocompleteFieldProps = Omit<
  TextFieldProps,
  "label" | "type" | "placeholder" | "autoComplete" | "icon"
> & { label?: string };

export function UsernameField(props: TextAutocompleteFieldProps) {
  return (
    <TextField
      {...props}
      label={props.label ?? "Username"}
      placeholder="Inserisci il tuo username"
      autoComplete="username"
      icon={UserRound}
    />
  );
}
UsernameField.displayName = "UsernameField";

export function EmailField(props: TextAutocompleteFieldProps) {
  return (
    <TextField
      {...props}
      type="email"
      label={props.label ?? "Email"}
      placeholder="Inserisci la tua email"
      autoComplete="email"
      icon={AtSign}
    />
  );
}
EmailField.displayName = "EmailField";

function PasswordField(
  props: Omit<TextFieldProps, "label" | "type" | "icon"> & { label?: string },
) {
  return <TextField {...props} label={props.label ?? "Password"} type="password" icon={KeyRound} />;
}
PasswordField.displayName = "PasswordField";

export function NewPasswordField(props: TextAutocompleteFieldProps) {
  return (
    <PasswordField
      {...props}
      placeholder="Crea una password"
      autoComplete="new-password"
      minLength={props.minLength ?? 8}
    />
  );
}
NewPasswordField.displayName = "NewPasswordField";

export function CurrentPasswordField(props: TextAutocompleteFieldProps) {
  return (
    <PasswordField
      {...props}
      placeholder="Inserisci la tua password"
      autoComplete="current-password"
    />
  );
}
CurrentPasswordField.displayName = "CurrentPasswordField";

export function FirstNameField(props: TextAutocompleteFieldProps) {
  return (
    <TextField
      {...props}
      label={props.label ?? "Nome"}
      placeholder="Inserisci il tuo nome"
      autoComplete="given-name"
    />
  );
}
FirstNameField.displayName = "FirstNameField";

export function LastNameField(props: TextAutocompleteFieldProps) {
  return (
    <TextField
      {...props}
      label={props.label ?? "Cognome"}
      placeholder="Inserisci il tuo cognome"
      autoComplete="family-name"
    />
  );
}
LastNameField.displayName = "LastNameField";
